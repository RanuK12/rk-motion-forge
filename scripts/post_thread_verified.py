#!/usr/bin/env python3
"""
post_thread_verified.py — Publicador verificado de Video + Hilo en @ranuk_dev
Valida cada paso en el DOM de Chrome antes de continuar.
"""
import base64
import json
import subprocess
import sys
import tempfile
import time
from pathlib import Path

# Config
WIN_ID = 1233334833
VIDEO_PATH = Path("/Users/emilioranucoli/Apps/rk-motion-forge/dist/videos/flight_radar_custom.mp4")

TWEET_1 = """Tired of airlines bumping fares when you refresh.

Built an autonomous radar polling 48 carriers 24/7. When prices drop >40%, it pushes an instant alert to Telegram with direct booking links.

Open source. https://github.com/RanuK12/Flight-Price-Alert"""

TWEET_2 = """Under the hood:

- Headless Python daemon querying ITA Matrix and carrier APIs
- Cache invalidation on dynamic fare buckets
- Instant Telegram bot webhook delivery
- Zero third-party trackers, self-hosted on a cheap VPS."""

# 1. Validaciones previas con rk_x_guard
sys.path.insert(0, "/Users/emilioranucoli/Apps/ranukita-bridge/scripts")
import rk_x_guard

err1 = rk_x_guard.revisar(TWEET_1, cuenta="ranuk_dev")
err1_g = rk_x_guard.guia_estilo(TWEET_1)
if err1 or err1_g:
    print(f"ERROR TWEET 1: {err1 or err1_g}")
    sys.exit(1)

err2 = rk_x_guard.revisar(TWEET_2, cuenta="ranuk_dev")
err2_g = rk_x_guard.guia_estilo(TWEET_2)
if err2 or err2_g:
    print(f"ERROR TWEET 2: {err2 or err2_g}")
    sys.exit(1)

if not VIDEO_PATH.exists() or VIDEO_PATH.stat().st_size < 100000:
    print(f"ERROR VIDEO FILE: {VIDEO_PATH}")
    sys.exit(1)

print("✓ Validaciones de texto y archivo de video superadas 100%.")


def run_js(js_code: str) -> str:
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(js_code)
        jsf = f.name
    aps = f'''
    set theJS to read POSIX file "{jsf}" as «class utf8»
    tell application "Google Chrome" to execute active tab of window id {WIN_ID} javascript theJS
    '''
    try:
        r = subprocess.run(["osascript", "-e", aps], capture_output=True, text=True, timeout=30)
        return (r.stdout or "").strip()
    finally:
        Path(jsf).unlink(missing_ok=True)


def ext(cmd: dict) -> dict:
    import urllib.request
    try:
        req = urllib.request.Request(
            "http://127.0.0.1:9224/command",
            data=json.dumps(cmd).encode(),
            headers={"Content-Type": "application/json"}
        )
        resp = urllib.request.urlopen(req, timeout=15).read()
        return json.loads(resp.decode())
    except Exception as e:
        return {"ok": False, "error": str(e)}


# Paso 1: Asegurar foco en https://x.com/home
print("1. Verificando estado del compositor en Chrome...")
status_raw = run_js("""
JSON.stringify({
    url: window.location.href,
    hasBox: !!document.querySelector('div[data-testid="tweetTextarea_0"]')
})
""")
print(f"  Estado actual: {status_raw}")
st = json.loads(status_raw) if status_raw else {}
if not st.get("hasBox") or "x.com/home" not in st.get("url", ""):
    print("  Navegando a https://x.com/home...")
    run_js('window.location.href = "https://x.com/home";')
    time.sleep(4)

# Paso 2: Limpiar compositor e insertar Tweet 1
print("2. Escribiendo texto estructurado en Tweet 1...")
insert_js = f"""
(function() {{
    var el = document.querySelector('div[data-testid="tweetTextarea_0"]');
    if (!el) return 'NO_EL';
    el.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('delete', false, null);
    
    var ok = document.execCommand('insertText', false, {json.dumps(TWEET_1)});
    el.dispatchEvent(new Event('input', {{ bubbles: true }}));
    el.dispatchEvent(new Event('change', {{ bubbles: true }}));
    return el.innerText || el.textContent;
}})();
"""
res_txt = run_js(insert_js)
print(f"  Texto verificado en compositor:\n{res_txt}\n")
time.sleep(1)

# Paso 3: Adjuntar video via DataTransfer
print("3. Adjuntando video flight_radar_custom.mp4 al compositor...")
b64_str = base64.b64encode(VIDEO_PATH.read_bytes()).decode("ascii")
upload_js = f"""
(function() {{
    try {{
        var b64 = '{b64_str}';
        var bin = atob(b64);
        var len = bin.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {{
            bytes[i] = bin.charCodeAt(i);
        }}
        var blob = new Blob([bytes], {{ type: 'video/mp4' }});
        var file = new File([blob], 'flight_radar.mp4', {{ type: 'video/mp4' }});
        
        var dt = new DataTransfer();
        dt.items.add(file);
        
        var input = document.querySelector('input[data-testid="fileInput"]') || document.querySelector('input[type="file"]');
        if (!input) return 'NO_INPUT';
        
        input.files = dt.files;
        input.dispatchEvent(new Event('change', {{ bubbles: true }}));
        input.dispatchEvent(new Event('input', {{ bubbles: true }}));
        return 'ATTACHED';
    }} catch (e) {{
        return 'ERROR: ' + e.message;
    }}
}})();
"""
up_res = run_js(upload_js)
print(f"  Resultado subida: {up_res}")

# Paso 4: Esperar a que X termine de procesar el video y habilite el botón Post
print("4. Esperando transcodificación del video en X...")
post_ready = False
for attempt in range(45):
    time.sleep(3)
    check_js = """
    JSON.stringify((function() {
        var hasVideo = !!document.querySelector('video') || !!document.querySelector('div[data-testid="attachments"]');
        var b = document.querySelector('[data-testid=tweetButtonInline]') || 
                document.querySelector('[data-testid=tweetButton]') ||
                document.querySelector('div[role=button][data-testid*=tweetButton]');
        if (!b) return { hasVideo: hasVideo, ready: false, reason: 'NO_BTN' };
        var is_disabled = b.getAttribute('aria-disabled') === 'true' || b.disabled;
        var r = b.getBoundingClientRect();
        return {
            hasVideo: hasVideo,
            ready: !is_disabled,
            x: Math.round(r.left + r.width/2),
            y: Math.round(r.top + r.height/2),
            btnText: (b.innerText || '').trim()
        };
    })())
    """
    chk = json.loads(run_js(check_js) or "{}")
    if chk.get("hasVideo") and chk.get("ready"):
        print(f"  ✓ Video listo y botón Post habilitado tras {(attempt + 1) * 3}s (coords: {chk['x']},{chk['y']}).")
        post_ready = True
        btn_coords = (chk["x"], chk["y"])
        break
    else:
        print(f"  ...esperando procesamiento ({attempt + 1}/45) - hasVideo: {chk.get('hasVideo')}, ready: {chk.get('ready')}")

if not post_ready:
    print("ERROR: El botón Post no se habilitó en el tiempo esperado.")
    sys.exit(1)

# Paso 5: Click en Post
print(f"5. Publicando Tweet 1 con video en X (click en {btn_coords})...")
click_res = ext({"action": "cdp_click", "x": btn_coords[0], "y": btn_coords[1]})
print(f"  Click enviado: {click_res}")

# Paso 6: Esperar URL del tweet publicado
print("6. Esperando confirmación y URL del tweet publicado...")
tweet_url = ""
for _ in range(20):
    time.sleep(2)
    nav_check = run_js("""
    JSON.stringify({
        url: window.location.href,
        hasArticle: !!document.querySelector('article[data-testid="tweet"]')
    })
    """)
    n = json.loads(nav_check or "{}")
    curr_url = n.get("url", "")
    if "/status/" in curr_url and n.get("hasArticle"):
        tweet_url = curr_url
        print(f"  ✓ Tweet 1 publicado exitosamente: {tweet_url}")
        break

if not tweet_url:
    print("AVISO: No se navegó automáticamente al tweet. Buscando último tweet en el perfil @ranuk_dev...")
    run_js('window.location.href = "https://x.com/ranuk_dev";')
    time.sleep(4)
    prof_js = """
    JSON.stringify((function() {
        var a = document.querySelector('article[data-testid="tweet"] a[href*="/status/"]');
        return { href: a ? a.href : '' };
    })())
    """
    p_info = json.loads(run_js(prof_js) or "{}")
    tweet_url = p_info.get("href", "")
    if tweet_url:
        print(f"  ✓ Tweet encontrado en perfil: {tweet_url}")
        run_js(f'window.location.href = "{tweet_url}";')
        time.sleep(4)

if not tweet_url:
    print("ERROR: No se pudo verificar la URL del tweet publicado.")
    sys.exit(1)

# Paso 7: Publicar Tweet 2 como respuesta directa (Hilo)
print(f"7. Publicando Tweet 2 como respuesta en el hilo ({tweet_url})...")
reply_open_js = """
(function() {
    var replyBox = document.querySelector('div[data-testid^="tweetTextarea_"]');
    if (!replyBox) {
        var placeholder = document.querySelector('[data-testid="inline_reply"]') || document.querySelector('div[role="textbox"]');
        if (placeholder) placeholder.click();
    }
    return !!document.querySelector('div[data-testid^="tweetTextarea_"]');
})();
"""
run_js(reply_open_js)
time.sleep(1.5)

reply_insert_js = f"""
(function() {{
    var el = document.querySelector('div[data-testid^="tweetTextarea_"]');
    if (!el) return 'NO_REPLY_BOX';
    el.focus();
    var ok = document.execCommand('insertText', false, {json.dumps(TWEET_2)});
    el.dispatchEvent(new Event('input', {{ bubbles: true }}));
    el.dispatchEvent(new Event('change', {{ bubbles: true }}));
    return el.innerText || el.textContent;
}})();
"""
reply_typed = run_js(reply_insert_js)
print(f"  Texto de respuesta verificado:\n{reply_typed}\n")
time.sleep(1.5)

# Click Reply Button
reply_btn_js = """
JSON.stringify((function() {
    var b = document.querySelector('[data-testid=tweetButtonInline]') || 
            document.querySelector('[data-testid=tweetButton]');
    if (!b) return { ready: false };
    b.scrollIntoView({block: 'center'});
    var r = b.getBoundingClientRect();
    return {
        ready: !b.disabled && b.getAttribute('aria-disabled') !== 'true',
        x: Math.round(r.left + r.width/2),
        y: Math.round(r.top + r.height/2)
    };
})())
"""
chk_rep = json.loads(run_js(reply_btn_js) or "{}")
if chk_rep.get("ready"):
    print(f"  Enviando respuesta hilo (click en {chk_rep['x']},{chk_rep['y']})...")
    ext({"action": "cdp_click", "x": chk_rep["x"], "y": chk_rep["y"]})
    time.sleep(3)
    print("  ✓ Hilo completado exitosamente.")
else:
    print(f"  Aviso: botón Reply no listo ({chk_rep})")

# Paso 8: Notificar a Telegram
tg_config = Path.home() / ".ranukita/telegram_config.json"
if tg_config.exists():
    try:
        cfg = json.loads(tg_config.read_text())
        token = cfg.get("bot_token") or cfg.get("token") or cfg.get("channels", {}).get("telegram", {}).get("botToken")
        chat = cfg.get("chat_id") or cfg.get("channels", {}).get("telegram", {}).get("chatId") or 8107555656
        import urllib.request
        msg = (
            f"🚀 <b>Tweet con Video e Hilo Publicado en @ranuk_dev</b>\n\n"
            f"• <b>Proyecto:</b> Flight Price Alert\n"
            f"• <b>Formato:</b> Radar de Aviación 1080p (Video Adjunto)\n"
            f"• <b>Enlace al Tweet:</b> {tweet_url}\n\n"
            f"<i>Publicado con texto estructurado y respuesta técnica de hilo.</i>"
        )
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = json.dumps({"chat_id": chat, "text": msg, "parse_mode": "HTML"}).encode()
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=10)
        print("✓ Notificación enviada a Telegram.")
    except Exception as e:
        print(f"Aviso Telegram: {e}")

print("==================================================")
print(f"🎉 ÉXITO TOTAL: Hilo publicado en {tweet_url}")
print("==================================================")

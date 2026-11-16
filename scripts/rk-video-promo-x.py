#!/usr/bin/env python3
# (c) 2026 Ranuk IT Solutions — ranuk.dev
"""
rk-video-promo-x.py — Motor Unificado de Promoción en Video para X (@ranuk_dev)
Rotación sistemática de videos Motion Design Full HD para los proyectos de Ranuk:
1. DataCanvas BI (MCP Extension Walkthrough)
2. Ranuk Profit (Quantitative Trading Bot Teaser)
3. El Revelado (Satellite Tile Mystery Game Teaser)
4. Ranuk IT Solutions (80-Solution Studio Mosaic Wall)
5. DataCanvas BI (Kinetic Launch Teaser)
"""

import argparse
import datetime as dt
import html
import json
import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path
import urllib.request

HOME = Path.home()
FORGE_DIR = Path(__file__).resolve().parent.parent
VIDEOS_DIR = FORGE_DIR / "dist/videos"
POST_SCRIPT = HOME / "Apps/ranukita-bridge/scripts/rk-x-post.py"
GUARD_DIR = HOME / "Apps/ranukita-bridge/scripts"
STATE_FILE = HOME / ".ranukita/video_promo_x_state.json"
LOG_FILE = HOME / ".ranukita/logs/video-promo-x.log"
TG_CONFIG = HOME / ".ranukita/telegram_config.json"
CHROME_LOCK = HOME / ".ranukita/_chrome.lock"

sys.path.insert(0, str(GUARD_DIR))
try:
    import rk_x_guard
except ImportError:
    rk_x_guard = None

PROMOS = [
    {
        "id": "datacanvas_nextgen",
        "product": "DataCanvas BI",
        "format": "NextGen Obsidian Motion (15s · 1080p)",
        "video": VIDEOS_DIR / "datacanvas_nextgen_promo.mp4",
        "text": (
            "Still parsing CSVs by hand in 2026. DataCanvas BI connects DuckDB-WASM directly to ChatGPT for 0ms query latency and instant executive PDF exports. Open source. https://github.com/RanuK12/rk-mcp-datacanvas"
        ),
    },
    {
        "id": "ada_laser_audit",
        "product": "AuditBot",
        "format": "Cyber Laser DOM Inspector (15s · 1080p)",
        "video": VIDEOS_DIR / "ada-laser-audit_promo_15s.mp4",
        "text": (
            "Automated WCAG compliance stops demand letters before they land. AuditBot runs headless DOM inspection against 84 rules and outputs clean git diff fixes in 12s. Open source. https://github.com/RanuK12/AuditBot"
        ),
    },
    {
        "id": "ranuk_profit_holo",
        "product": "Ranuk Profit",
        "format": "Holographic Quant Orderbook (15s · 1080p)",
        "video": VIDEOS_DIR / "ranuk-profit-holo_promo_15s.mp4",
        "text": (
            "Discretionary crypto execution loses to emotion and latency. Ranuk Profit runs quantitative breakout strategies and dynamic trailing stops 24/7 on Binance with strict state locks. Open source. https://github.com/RanuK12/Ranuk-Profit-Bot"
        ),
    },
    {
        "id": "ranuk_profit_nextgen",
        "product": "Ranuk Profit",
        "format": "NextGen Obsidian Quantitative (15s · 1080p)",
        "video": VIDEOS_DIR / "ranuk_profit_nextgen_promo.mp4",
        "text": (
            "Emotion and latency ruin crypto execution. Ranuk Profit runs automated breakout strategies and dynamic trailing stops 24/7 on Binance with strict state locks. Open source. https://github.com/RanuK12/Ranuk-Profit-Bot"
        ),
    },
    {
        "id": "flight_alert_nextgen",
        "product": "Flight Price Alert",
        "format": "NextGen Obsidian Radar (15s · 1080p)",
        "video": VIDEOS_DIR / "flight_alert_nextgen_promo.mp4",
        "text": (
            "Tired of airlines bumping fares on refresh. Built an autonomous radar polling 48 carriers 24/7. When prices drop >40%, it pushes an instant alert to Telegram with direct carrier reservation links. Open source. https://github.com/RanuK12/Flight-Price-Alert"
        ),
    },
    {
        "id": "auditbot_nextgen",
        "product": "AuditBot",
        "format": "NextGen Obsidian DevTools (15s · 1080p)",
        "video": VIDEOS_DIR / "auditbot_nextgen_promo.mp4",
        "text": (
            "Is your web app compliant before a demand letter lands. AuditBot runs headless DOM inspection against 84 WCAG 2.1 rules and generates executive PDF remediation reports in 12s. Open source CLI. https://github.com/RanuK12/AuditBot"
        ),
    },
    {
        "id": "reveal_nextgen",
        "product": "El Revelado",
        "format": "NextGen Obsidian Satellite (15s · 1080p)",
        "video": VIDEOS_DIR / "reveal_nextgen_promo.mp4",
        "text": (
            "Tired of generic digital collectibles. The Reveal is a dynamic satellite puzzle where you claim exact geographic coordinates on an orbital grid to uncover hidden territory in real time. https://reveal.ranuk.dev"
        ),
    },
    {
        "id": "flight_alert_radar",
        "product": "Flight Price Alert",
        "format": "Autonomous Airfare Radar (15s · 1080p)",
        "video": VIDEOS_DIR / "flight_radar_custom.mp4",
        "text": (
            "Tired of airlines bumping fares on refresh. Built an autonomous radar polling 48 carriers 24/7. When prices drop >40%, it pushes an instant alert to Telegram with direct carrier reservation links. Open source. https://github.com/RanuK12/Flight-Price-Alert"
        ),
    },
    {
        "id": "auditbot_compliance",
        "product": "AuditBot",
        "format": "DevTools WCAG 2.1 Inspector (15s · 1080p)",
        "video": VIDEOS_DIR / "auditbot_inspector_custom.mp4",
        "text": (
            "Is your web app compliant before a demand letter lands. AuditBot runs headless DOM inspection against 84 WCAG 2.1 rules and generates executive PDF remediation reports in 12s. Open source CLI. https://github.com/RanuK12/AuditBot"
        )
    },
    {
        "id": "datacanvas_walkthrough",
        "product": "DataCanvas BI",
        "format": "Screen Studio MCP Walkthrough (24s · 1080p)",
        "video": VIDEOS_DIR / "datacanvas_walkthrough_custom.mp4",
        "text": (
            "Still waiting on static charts inside ChatGPT. DataCanvas BI connects via MCP to turn CSV files into interactive DuckDB dashboards with Apache ECharts and instant PDF exports. Built for developers. https://github.com/RanuK12/rk-mcp-datacanvas"
        )
    },
    {
        "id": "ranuk_profit_teaser",
        "product": "Ranuk Profit",
        "format": "Cyberpunk Trading Terminal (15s · 1080p)",
        "video": VIDEOS_DIR / "ranuk_profit_custom.mp4",
        "text": (
            "Discretionary crypto trading loses to emotion and latency. Ranuk Profit runs quantitative breakout strategies and dynamic trailing stops 24/7 on Binance with strict state locks. Open source. https://github.com/RanuK12/Ranuk-Profit-Bot"
        )
    },
    {
        "id": "reveal_teaser",
        "product": "El Revelado",
        "format": "Satellite Mystery Tile HUD (15s · 1080p)",
        "video": VIDEOS_DIR / "reveal_teaser_custom.mp4",
        "text": (
            "Tired of generic digital collectibles. The Reveal is a dynamic satellite puzzle where you claim exact geographic coordinates on an orbital grid to uncover hidden territory in real time. https://reveal.ranuk.dev"
        )
    },
    {
        "id": "terminal_hacker",
        "product": "Ranuk Motion Forge",
        "format": "Ghostty Developer CLI Session (15s · 1080p)",
        "video": VIDEOS_DIR / "terminal_hacker_custom.mp4",
        "text": (
            "Modern developer tools should feel instantaneous. Ranuk Forge compiles multi-format 60 FPS motion videos directly from code on a local Mac Mini M-series in under 5 seconds. Engineered for speed. https://github.com/RanuK12"
        )
    }
]

def tg_notify(msg: str):
    try:
        import rk_alerta
        return rk_alerta.enviar(msg)
    except Exception:
        pass
    if not TG_CONFIG.exists():
        return
    try:
        cfg = json.loads(TG_CONFIG.read_text())
        token = cfg.get("bot_token") or cfg.get("token") or cfg.get("channels", {}).get("telegram", {}).get("botToken")
        chat = cfg.get("chat_id") or cfg.get("channels", {}).get("telegram", {}).get("chatId") or 8107555656
        if not token:
            return
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = json.dumps({"chat_id": chat, "text": msg}).encode()
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        print(f"[TG Warning] {e}")

def tg_send_video(file_path: Path, caption: str):
    if not TG_CONFIG.exists():
        return
    try:
        cfg = json.loads(TG_CONFIG.read_text())
        token = cfg.get("bot_token") or cfg.get("token") or cfg.get("channels", {}).get("telegram", {}).get("botToken")
        chat = cfg.get("chat_id") or cfg.get("channels", {}).get("telegram", {}).get("chatId") or 8107555656
        if not token or not file_path.exists():
            return
        cmd = [
            "curl", "-4", "-s", "--connect-timeout", "8", "--max-time", "30", "-X", "POST",
            f"https://api.telegram.org/bot{token}/sendVideo",
            "-F", f"chat_id={chat}",
            "-F", f"video=@{str(file_path)}",
            "-F", f"caption={caption}",
            "-F", "supports_streaming=true",
            "-F", "parse_mode=HTML"
        ]
        subprocess.run(cmd, capture_output=True, timeout=35)
    except Exception as e:
        print(f"[TG Video Warning] {e}")

def _pid_alive(pid_str: str) -> bool:
    try:
        os.kill(int(pid_str), 0)
        return True
    except PermissionError:
        return True
    except Exception:
        return False


def wait_for_chrome_lock(max_wait: int = 240, stale_after: int = 3600) -> bool:
    """Espera a que se libere ~/.ranukita/_chrome.lock; limpia si el dueño murió o venció."""
    deadline = time.time() + max_wait
    waited = False
    while time.time() < deadline:
        if not CHROME_LOCK.exists():
            return True
        try:
            holder = CHROME_LOCK.read_text().strip()
            age = time.time() - CHROME_LOCK.stat().st_mtime
        except Exception:
            return True
        if not holder or not _pid_alive(holder) or age >= stale_after:
            try:
                CHROME_LOCK.unlink(missing_ok=True)
                print(f"[Video Promo] Lock huérfano/vencido limpiado (PID={holder or '?'}).")
            except Exception:
                pass
            return True
        if not waited:
            print(f"[Video Promo] Chrome ocupado por PID {holder}, esperando turno antes de iniciar...")
            waited = True
        time.sleep(5)
    return not CHROME_LOCK.exists()


def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {"last_index": -1, "last_posted_ts": 0, "history": []}

def save_state(state):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def validate_all_promos():
    errors = []
    for idx, p in enumerate(PROMOS):
        # 1. Video file check
        if not p["video"].exists():
            errors.append(f"Promo {idx} ({p['id']}): Video file missing: {p['video']}")
        elif p["video"].stat().st_size < 100000:
            errors.append(f"Promo {idx} ({p['id']}): Video file too small: {p['video']}")

        # 2. Guard validation
        if rk_x_guard:
            err = rk_x_guard.revisar(p["text"], tipo="tweet", cuenta="ranuk_dev")
            if err:
                errors.append(f"Promo {idx} ({p['id']}): Guard rejected text: {err}")
            err_guia = rk_x_guard.guia_estilo(p["text"])
            if err_guia:
                errors.append(f"Promo {idx} ({p['id']}): Guia estilo rejected text: {err_guia}")
            if p.get("thread"):
                for t_idx, t_text in enumerate(p["thread"]):
                    err_t = rk_x_guard.revisar(t_text, tipo="tweet", cuenta="ranuk_dev")
                    if err_t:
                        errors.append(f"Promo {idx} ({p['id']}) thread #{t_idx+1}: Guard rejected: {err_t}")
                    err_gt = rk_x_guard.guia_estilo(t_text)
                    if err_gt:
                        errors.append(f"Promo {idx} ({p['id']}) thread #{t_idx+1}: Guia rejected: {err_gt}")
    return errors

def main():
    parser = argparse.ArgumentParser(description="Ranuk Video Promo Engine for X (@ranuk_dev)")
    parser.add_argument("--dry-run", action="store_true", help="Validates everything without posting to X")
    parser.add_argument("--force", action="store_true", help="Bypasses cadence interval check")
    parser.add_argument("--index", type=int, default=None, help=f"Force specific promo by index (0-{len(PROMOS)-1})")
    parser.add_argument("--product", type=str, default=None, help="Force specific promo by product name")
    parser.add_argument("--status", action="store_true", help="Print current rotation status and exit")
    parser.add_argument("--cadence-hours", type=float, default=40.0, help="Minimum interval in hours between video promos (default: 40h = al menos 1 cada 2 días en cron diario)")
    args = parser.parse_args()

    # Pre-flight check
    validation_errors = validate_all_promos()
    if validation_errors:
        print("CRITICAL: Promo validation errors detected:")
        for e in validation_errors:
            print(f"  ❌ {e}")
        if not args.status:
            sys.exit(1)

    state = load_state()
    now = time.time()
    min_interval_seconds = args.cadence_hours * 3600  # Default 40 hours -> 1 video cada 2 días en corrida diaria
    elapsed = now - state.get("last_posted_ts", 0)

    if args.status:
        last_ts = state.get("last_posted_ts", 0)
        last_str = dt.datetime.fromtimestamp(last_ts).strftime("%Y-%m-%d %H:%M:%S") if last_ts else "Never"
        next_idx = (state.get("last_index", -1) + 1) % len(PROMOS)
        can_post = elapsed >= min_interval_seconds or last_ts == 0
        print("=== RANUK VIDEO PROMO ENGINE STATUS ===")
        print(f"Total promos configured: {len(PROMOS)}")
        print(f"Cadencia configurada: 1 video cada 2 días (umbral: {args.cadence_hours:.1f}h)")
        print(f"Last posted: {last_str} ({elapsed / 3600:.1f} hours ago)")
        print(f"Current rotation index: {state.get('last_index', -1)}")
        print(f"Next promo in queue [{next_idx}]: {PROMOS[next_idx]['product']} - {PROMOS[next_idx]['format']}")
        print(f"Can post now: {can_post}")
        if not can_post:
            hours_left = (min_interval_seconds - elapsed) / 3600
            print(f"Hours until next eligible posting: {hours_left:.1f}h")
        return

    # Cadence check (Al menos 1 vez cada 2 días)
    if not args.force and not args.dry_run and elapsed < min_interval_seconds:
        hours_left = (min_interval_seconds - elapsed) / 3600
        print(f"[Video Promo] Cadencia activa: 1 video cada 2 días (último publicado hace {elapsed / 3600:.1f}h). Faltan {hours_left:.1f} horas para el próximo video. Salto limpio.")
        return

    # Choose promo
    if args.index is not None:
        if not (0 <= args.index < len(PROMOS)):
            print(f"Error: index must be between 0 and {len(PROMOS)-1}")
            sys.exit(1)
        target_idx = args.index
    elif args.product is not None:
        matches = [i for i, p in enumerate(PROMOS) if args.product.lower() in p["product"].lower() or args.product.lower() in p["id"].lower()]
        if not matches:
            print(f"Error: No promo matches product '{args.product}'")
            sys.exit(1)
        target_idx = matches[0]
    else:
        target_idx = (state.get("last_index", -1) + 1) % len(PROMOS)

    promo = PROMOS[target_idx]
    video_path = promo["video"]
    size_mb = video_path.stat().st_size / (1024 * 1024)

    print("==================================================")
    print(f"🚀 PUBLICANDO VIDEO PROMO [{target_idx + 1}/{len(PROMOS)}]: {promo['product']}")
    print(f"Formato: {promo['format']}")
    print(f"Archivo: {video_path.name} ({size_mb:.1f} MB)")
    print("--------------------------------------------------")
    print(promo["text"])
    print("==================================================")

    # Esperar que Chrome esté libre ANTES de mandar preview o invocar rk-x-post.py (salvo --dry-run)
    if not args.dry_run and not wait_for_chrome_lock(max_wait=240):
        print("⏸ Video promo diferido por Chrome ocupado antes de iniciar (sin alerta falsa de error).")
        sys.exit(75)

    # Enviar prueba del video a Telegram siempre antes de postear o en dry-run
    caption_preview = (
        f"🎬 <b>Prueba de Video Promocional para X (@ranuk_dev)</b>\n\n"
        f"• <b>Producto:</b> {promo['product']}\n"
        f"• <b>Formato:</b> {promo['format']}\n"
        f"• <b>Texto a publicar:</b>\n<i>{promo['text']}</i>"
    )
    print(f"Enviando prueba del video a Telegram ({video_path.name})...")
    tg_send_video(video_path, caption_preview)

    if args.dry_run:
        print("✓ [DRY-RUN EXITOSO] El video existe, el texto cumple con rk_x_guard y se envió la prueba a Telegram.")
        return

    if not POST_SCRIPT.exists():
        err_msg = f"ERROR: Script publicador no existe: {POST_SCRIPT}"
        print(err_msg)
        tg_notify(f"❌ <b>Error Video Promo X</b>: {err_msg}")
        sys.exit(1)

    thread_file_path = None
    if promo.get("thread") and len(promo["thread"]) > 1:
        thread_content = "\n---\n".join(promo["thread"])
        tf = tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False)
        tf.write(thread_content)
        tf.close()
        thread_file_path = tf.name
        cmd = [
            sys.executable,
            str(POST_SCRIPT),
            "--account", "ranuk_dev",
            "--thread-file", thread_file_path,
            "--video", str(video_path),
            "--lock-wait", "180",
        ]
    else:
        cmd = [
            sys.executable,
            str(POST_SCRIPT),
            "--account", "ranuk_dev",
            "--text", promo["text"],
            "--video", str(video_path),
            "--lock-wait", "180",
        ]

    start_t = time.time()
    max_attempts = 3
    res = None
    try:
        for attempt in range(1, max_attempts + 1):
            print(f"Ejecutando {POST_SCRIPT.name} con cuenta @ranuk_dev (intento {attempt}/{max_attempts})...")
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
            out_blob = f"{res.stdout or ''}\n{res.stderr or ''}".lower()
            is_busy = res.returncode == 75 or "chrome ocupado" in out_blob
            if res.returncode == 0 and "POSTEADO ✓" in (res.stdout or ""):
                break
            if is_busy and attempt < max_attempts:
                print(f"⏸ Chrome ocupado en intento {attempt}/{max_attempts}; espero 45s y reintento...")
                time.sleep(45)
                continue
            break
    finally:
        if thread_file_path:
            Path(thread_file_path).unlink(missing_ok=True)
    dur = time.time() - start_t
    print(res.stdout)
    if res.stderr:
        print(res.stderr)

    out_blob = f"{res.stdout or ''}\n{res.stderr or ''}".lower()
    if res.returncode == 0 and "POSTEADO ✓" in (res.stdout or ""):
        print(f"✓ Video promo publicado exitosamente en @ranuk_dev tras {dur:.1f}s.")
        state["last_index"] = target_idx
        state["last_posted_ts"] = now
        history_entry = {
            "ts": now,
            "date": dt.datetime.fromtimestamp(now).strftime("%Y-%m-%d %H:%M:%S"),
            "id": promo["id"],
            "product": promo["product"],
            "video": video_path.name
        }
        state["history"].append(history_entry)
        # Keep last 50 history entries
        state["history"] = state["history"][-50:]
        save_state(state)

        tg_notify(
            f"🎬 <b>Video Promocional Publicado en @ranuk_dev</b>\n\n"
            f"• <b>Producto:</b> {promo['product']}\n"
            f"• <b>Formato:</b> {promo['format']}\n"
            f"• <b>Video:</b> {video_path.name} ({size_mb:.1f} MB)\n"
            f"• <b>Estado:</b> Transcodificado y posteado en X exitosamente tras {dur:.1f}s."
        )
    elif res.returncode == 75 or "chrome ocupado" in out_blob:
        print("⏸ Video promo diferido por Chrome ocupado tras reintentos (exit 75, sin alerta falsa de error).")
        sys.exit(75)
    else:
        err_msg = f"Fallo al publicar promo de {promo['product']}: code {res.returncode}"
        print(f"❌ {err_msg}")
        snippet = html.escape((res.stdout or res.stderr or "")[-250:])
        tg_notify(
            f"❌ <b>Fallo al Publicar Video Promo en X</b>\n\n"
            f"{html.escape(err_msg)}\n<pre>{snippet}</pre>"
        )
        sys.exit(1)

if __name__ == "__main__":
    main()

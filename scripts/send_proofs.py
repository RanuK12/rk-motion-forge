#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path

tg_config = Path.home() / ".ranukita/telegram_config.json"
cfg = json.loads(tg_config.read_text())
token = cfg.get("bot_token") or cfg.get("token") or cfg.get("channels", {}).get("telegram", {}).get("botToken")
chat = cfg.get("chat_id") or cfg.get("channels", {}).get("telegram", {}).get("chatId") or 8107555656

videos = [
    {
        "file": Path("/Users/emilioranucoli/Apps/rk-motion-forge/dist/videos/flight_radar_custom.mp4"),
        "caption": "✈️ <b>FORMATO 1: FLIGHT PRICE ALERT (Radar de Aviación & Price Mistake)</b>\n\n• Radar HUD de aviación giratorio 360° en tiempo real\n• Trayectoria de vuelo animada con curva Bézier (EZE ➔ MAD)\n• Medidor de caída de tarifa: de $1,280 a $419 (-67% OFF)\n• Notificación push iOS/Telegram que desliza desde arriba\n• Scraper daemon 24/7 en segundo plano\n\n<i>100% distinto al formato de diapositivas anterior.</i>"
    },
    {
        "file": Path("/Users/emilioranucoli/Apps/rk-motion-forge/dist/videos/auditbot_inspector_custom.mp4"),
        "caption": "🛡️ <b>FORMATO 2: AUDITBOT (DevTools Cyber-Inspector & WCAG 2.1)</b>\n\n• Interfaz Chrome DevTools / IDE oscura\n• Alerta de riesgo legal por demandas de accesibilidad web\n• Checklist interactivo en vivo de 84 reglas WCAG\n• Detección y parche de código en tiempo real (&lt;div&gt; ➔ &lt;button&gt;)\n• Dial de salud que salta de 38% (Crítico) a 98% (Certificado)\n\n<i>Estilo técnico para ingenieros y fundadores en X.</i>"
    },
    {
        "file": Path("/Users/emilioranucoli/Apps/rk-motion-forge/dist/videos/datacanvas_walkthrough_custom.mp4"),
        "caption": "📊 <b>FORMATO 3: DATACANVAS BI (Screen Studio Walkthrough)</b>\n\n• Escritorio macOS photorrealista con zoom dinámico\n• Escritura en vivo del prompt en ChatGPT\n• Docking animado del panel MCP de DataCanvas\n• Cursor de ratón virtual navegando, haciendo hover y clic\n• Exportación de PDF con toast de éxito"
    },
    {
        "file": Path("/Users/emilioranucoli/Apps/rk-motion-forge/dist/videos/ranuk_profit_custom.mp4"),
        "caption": "📈 <b>FORMATO 4: RANUK PROFIT (Trading Terminal Cyberpunk)</b>\n\n• Terminal de trading oscuro con velas japonesas en vivo\n• Gráfico de profundidad de libro de órdenes\n• Ticker dinámico de P&L acumulando ganancias (+$8,940)\n• Triggers de ejecución automática de órdenes y trailing stop"
    },
    {
        "file": Path("/Users/emilioranucoli/Apps/rk-motion-forge/dist/videos/reveal_teaser_custom.mp4"),
        "caption": "🛰️ <b>FORMATO 5: EL REVELADO (Mystery Satellite Grid)</b>\n\n• HUD satelital orbital con scanlines Sci-Fi\n• Cuadrícula 4x4 de coordenadas GPS desbloqueándose\n• Radar de barrido circular y temporizador de enigma\n• Diseñado para generar intriga y especulación viral"
    },
    {
        "file": Path("/Users/emilioranucoli/Apps/rk-motion-forge/dist/videos/terminal_hacker_custom.mp4"),
        "caption": "💻 <b>FORMATO 6: TERMINAL HACKER (Ghostty CLI Live Session)</b>\n\n• Terminal Ghostty para desarrolladores con JetBrains Mono\n• Escritura de comando rápida y banner ASCII Ranuk\n• Logs concurrentes de compilación a 60 FPS\n• Benchmark de latencia animado (12ms vs 340ms - 28x más rápido)\n• Ideal para comunidades dev en X y Reddit (r/programming)"
    }
]

for v in videos:
    file_p = v["file"]
    fn = file_p.name
    print(f"Enviando {fn}...")
    res = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"https://api.telegram.org/bot{token}/sendVideo",
        "-F", f"chat_id={chat}",
        "-F", f"video=@{str(file_p)}",
        "-F", f"caption={v['caption']}",
        "-F", "parse_mode=HTML"
    ], capture_output=True, text=True)
    resp = json.loads(res.stdout) if res.stdout else {}
    if resp.get("ok"):
        print(f" -> OK: {fn}")
    else:
        print(f" -> Error: {resp}")

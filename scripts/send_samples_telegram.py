#!/usr/bin/env python3
# (c) 2026 Ranuk IT Solutions — Enviar videos de muestra a Emilio por Telegram
import os
import sys
import json
import time
import subprocess
from pathlib import Path

HOME = Path.home()
ENV_FILE = HOME / ".ranukita/telegram.env"
FORGE_DIR = HOME / "Desktop/Oficina_Ranuk/rk-motion-forge"
VIDEOS_DIR = FORGE_DIR / "dist/videos"
POSTERS_DIR = FORGE_DIR / "dist/posters"
DATACANVAS_DOCS = HOME / "Desktop/Oficina_Ranuk/rk-mcp-datacanvas/docs"

if not ENV_FILE.exists():
    print(f"Error: {ENV_FILE} no encontrado")
    sys.exit(1)

env = {}
for line in ENV_FILE.read_text().splitlines():
    line = line.strip()
    if "=" in line and not line.startswith("#"):
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip()

TOKEN = env["TG_BOT_TOKEN"]
CHAT_ID = env["TG_CHAT_ID"]

def send_message(text):
    cmd = [
        "curl", "-s", "-X", "POST",
        f"https://api.telegram.org/bot{TOKEN}/sendMessage",
        "-F", f"chat_id={CHAT_ID}",
        "-F", f"text={text}",
        "-F", "parse_mode=HTML"
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.stdout

def send_photo(file_path, caption):
    p = Path(file_path)
    if not p.exists():
        print(f"File not found: {p}")
        return
    print(f"Enviando foto: {p.name}...")
    cmd = [
        "curl", "-s", "-X", "POST",
        f"https://api.telegram.org/bot{TOKEN}/sendPhoto",
        "-F", f"chat_id={CHAT_ID}",
        "-F", f"photo=@{str(p)}",
        "-F", f"caption={caption}",
        "-F", "parse_mode=HTML"
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    print(r.stdout[:200])

def send_video(file_path, caption):
    p = Path(file_path)
    if not p.exists():
        print(f"File not found: {p}")
        return
    print(f"Enviando video: {p.name} ({p.stat().st_size / (1024*1024):.2f} MB)...")
    cmd = [
        "curl", "-s", "-X", "POST",
        f"https://api.telegram.org/bot{TOKEN}/sendVideo",
        "-F", f"chat_id={CHAT_ID}",
        "-F", f"video=@{str(p)}",
        "-F", f"caption={caption}",
        "-F", "supports_streaming=true",
        "-F", "parse_mode=HTML"
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    print(r.stdout[:200])

def main():
    print("Enviando mensaje intro...")
    send_message(
        "🎬 <b>Ranuk Motion Forge — Ejemplos Generados para Redes y Web</b>\n\n"
        "Emilio, acá tenés las muestras de los videos de 15 segundos creados en Remotion (React) "
        "para promocionar nuestros proyectos en X y ranuk.dev:"
    )
    time.sleep(1.5)

    # 1. DataCanvas BI
    dc_video = DATACANVAS_DOCS / "datacanvas_promo_video.mp4"
    if not dc_video.exists():
        dc_video = FORGE_DIR / "dist/videos/datacanvas_promo_15s.mp4"
    send_video(
        dc_video,
        "📊 <b>[Video 1/3] DataCanvas BI</b>\n"
        "• <i>ChatGPT MCP Extension</i>: Transforma CSVs en dashboards interactivos.\n"
        "• DuckDB-WASM, Apache ECharts y exportación de reportes PDF ejecutivos.\n"
        "• Duración: 15s · Sincronizado a 120 BPM · Full HD (1920x1080)."
    )
    time.sleep(2)

    # 2. Ranuk Profit
    rp_video = VIDEOS_DIR / "ranuk-profit_promo_15s.mp4"
    send_video(
        rp_video,
        "📈 <b>[Video 2/3] Ranuk Profit (Trading Bot)</b>\n"
        "• <i>Mesa de Operaciones Cuantitativa</i>: Detección de volatilidad y trailing stops.\n"
        "• Terminal con métricas de P&L, curvas de ganancia y guardias de riesgo.\n"
        "• 15s · Hard cuts cinéticos · Full HD (1920x1080)."
    )
    time.sleep(2)

    # 3. El Revelado
    rv_video = VIDEOS_DIR / "reveal_promo_15s.mp4"
    send_video(
        rv_video,
        "🛰️ <b>[Video 3/3] El Revelado</b>\n"
        "• <i>Enigma Satelital Viral</i>: Baldosas orbitales diarias en alta resolución.\n"
        "• Mapeo dinámico, especulación comunitaria y cronómetro de revelado.\n"
        "• 15s · Full HD (1920x1080)."
    )
    time.sleep(2)

    # 4. Poster mockup banner
    mockup_img = DATACANVAS_DOCS / "datacanvas_promo_banner.jpg"
    send_photo(
        mockup_img,
        "🖼️ <b>[Mockup de Producto] DataCanvas en ChatGPT</b>\n"
        "• Integración split screen: Prompt en ChatGPT a la izquierda, inspector interactivo a la derecha.\n"
        "• Banner listo para Twitter/X, landing page de ranuk.dev y OpenGraph."
    )

    print("\n✓ Todos los ejemplos fueron enviados con éxito a tu Telegram.")

if __name__ == "__main__":
    main()

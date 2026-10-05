#!/usr/bin/env python3
# (c) 2026 Ranuk IT Solutions — Enviar video Mosaic HD a Emilio por Telegram
import os
import sys
import subprocess
from pathlib import Path

HOME = Path.home()
ENV_FILE = HOME / ".ranukita/telegram.env"
FORGE_DIR = HOME / "Desktop/Oficina_Ranuk/rk-motion-forge"
MOSAIC_VIDEO = FORGE_DIR / "out/mosaic.mp4"

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

def send_video(file_path, caption):
    p = Path(file_path)
    if not p.exists():
        print(f"File not found: {p}")
        return False
    size_mb = p.stat().st_size / (1024 * 1024)
    print(f"Enviando video: {p.name} ({size_mb:.2f} MB)...")
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
    print(r.stdout[:250])
    return '"ok":true' in r.stdout

def main():
    caption = (
        "🖼️ <b>Muro de Capturas con Zoom Out (Versión Ultra HD Corregida)</b>\n\n"
        "Emilio, acá tenés el video corregido al 100% siguiendo todas tus especificaciones:\n\n"
        "• <b>80 Capturas Nativas 16:10 (1920x1200)</b>: Tomadas con Chrome headless real. Cero logos de 64px estirados, cero pixelación, nitidez absoluta.\n"
        "• <b>0–3s</b>: Pantalla completa en ranuk.dev, badge con dominio y cursor quieto.\n"
        "• <b>3–8s</b>: Zoom out continuo ease-in-out a 4 columnas sobre fondo #f4f4f2 y gap de 8px.\n"
        "• <b>8–16s</b>: Zoom out cinemático hasta revelar el muro completo de 80 productos en proporción 16:9 widescreen.\n"
        "• <b>16–20s</b>: Freeze en plano general con tipografía negra '366 products. one grid.' y 'ranuk.dev'."
    )
    ok = send_video(MOSAIC_VIDEO, caption)
    if ok:
        print("✓ Video enviado a Telegram correctamente.")
    else:
        print("✗ Error al enviar video a Telegram.")

if __name__ == "__main__":
    main()

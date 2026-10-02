#!/usr/bin/env python3
# (c) 2026 Ranuk IT Solutions — Enviar los 3 nuevos tipos de video a Emilio por Telegram
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
    print("Enviando intro de los 3 nuevos tipos...")
    send_message(
        "🔥 <b>Nuevos Tipos de Video en Remotion (Variedad y Estilo Mockup)</b>\n\n"
        "Emilio, creamos 3 arquetipos totalmente distintos según las categorías de Grok. "
        "El primero recrea en movimiento el <b>mockup split-screen fotorrealista</b> que te gustó, "
        "con cursor interactivo, tipeo en vivo y zoom:"
    )
    time.sleep(1.5)

    # 1. Feature Walkthrough (Archetype 3)
    v1 = VIDEOS_DIR / "datacanvas_walkthrough_24s.mp4"
    send_video(
        v1,
        "🖥️ <b>[Tipo 3: Feature Walkthrough · 24s · 1080p]</b>\n"
        "• <b>Estilo Mockup Fotorrealista</b>: Split-screen de macOS con ChatGPT a la izquierda.\n"
        "• Tipeo del prompt en tiempo real, panel MCP que se acopla con ECharts.\n"
        "• <b>Cursor interactivo</b>: Se mueve, hace hover en las barras con tooltip, hace clic y activa el botón 'Export PDF'."
    )
    time.sleep(2)

    # 2. Launch Teaser (Archetype 2)
    v2 = VIDEOS_DIR / "datacanvas_teaser_12s.mp4"
    send_video(
        v2,
        "⚡ <b>[Tipo 2: Launch Teaser Cinético · 12s · 1080p]</b>\n"
        "• <b>Sin interfaz / Pura tipografía masiva</b>: Cortes agresivos al beat de 130 BPM.\n"
        "• Bloques de color plano (amarillo, negro, azul eléctrico), cero caricatura, estilo tech-indie dev.\n"
        "• Ideal para lanzamientos rápidos o anuncios de intriga en X."
    )
    time.sleep(2)

    # 3. Vertical Reels (Archetype 7)
    v3 = VIDEOS_DIR / "datacanvas_reels_9x16_15s.mp4"
    send_video(
        v3,
        "📱 <b>[Tipo 7: Anuncio Vertical 9:16 · 15s · 1080x1920]</b>\n"
        "• <b>Formato Móvil para TikTok, Reels y Shorts</b>.\n"
        "• Márgenes de seguridad superior e inferior para que la UI de la red social no tape nada.\n"
        "• Hook gigante, simulación de app central y botón de sticker de acción pulsante."
    )

    print("\n✓ Los 3 nuevos tipos fueron enviados con éxito a tu Telegram.")

if __name__ == "__main__":
    main()

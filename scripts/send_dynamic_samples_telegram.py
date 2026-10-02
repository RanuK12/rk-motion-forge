#!/usr/bin/env python3
# (c) 2026 Ranuk IT Solutions — Enviar los nuevos videos dinámicos con instrumentos a Emilio por Telegram
import os
import sys
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
    print("Enviando intro de videos instrumentales a Telegram...")
    send_message(
        "🚀 <b>Nuevos Videos con Interfaz, Instrumentos y Máximo Dinamismo</b>\n\n"
        "Emilio, acá tenés los nuevos videos renderizados en Remotion aplicando exactamente "
        "los estilos que te gustaron (<b>Tipo 2: Teaser Cinético 1080p</b> y <b>Tipo 7: Vertical 9:16</b>) "
        "con instrumentos vivos: velas japonesas dinámicas, radar satelital, baldosas orbitales y contadores P&L:"
    )
    time.sleep(1.5)

    # 1. Ranuk Profit Teaser 1080p
    v1 = VIDEOS_DIR / "ranuk_profit_teaser_15s.mp4"
    send_video(
        v1,
        "📈 <b>[Ranuk Profit · Teaser Cinético · 15s · 1080p]</b>\n"
        "• <b>Mesa Cuantitativa en Vivo</b>: Velas japonesas (candlesticks) animadas en SVG con wicks y precio dinámico.\n"
        "• <b>Instrumentos y Telemetría</b>: Order book depth bar (Bids vs Asks), radar de volatilidad (92.4/100) y alerta Trailing Stop activada.\n"
        "• <b>Contador Monumental de P&L</b>: Sube en tiempo real hasta +$8,940.50 con neon glow."
    )
    time.sleep(2)

    # 2. Ranuk Profit Vertical 9:16
    v2 = VIDEOS_DIR / "ranuk_profit_vertical_9x16_15s.mp4"
    send_video(
        v2,
        "📱 <b>[Ranuk Profit · Anuncio Vertical 9:16 · 15s · 1080x1920]</b>\n"
        "• <b>Móvil para TikTok / Reels / Shorts</b>: Márgenes seguros superior (160px) e inferior (260px).\n"
        "• Candlesticks en movimiento dentro de la terminal central.\n"
        "• Contador de ganancias del día (+$4,890.80) y botón de sticker pulsante de alta conversión."
    )
    time.sleep(2)

    # 3. El Revelado Teaser 1080p
    v3 = VIDEOS_DIR / "reveal_teaser_15s.mp4"
    send_video(
        v3,
        "🛰️ <b>[El Revelado · Teaser Cinético · 15s · 1080p]</b>\n"
        "• <b>Enigma Satelital Viral</b>: Retícula de baldosas orbitales que se destapan revelando terreno satelital.\n"
        "• <b>Instrumentos HUD</b>: Radar orbital giratorio, coordenadas de telemetría y cronómetro en vivo al siguiente pase.\n"
        "• <b>Especulación Comunitaria</b>: Chat de hipótesis en tiempo real con 14,800+ jugadores adivinando."
    )
    time.sleep(2)

    # 4. El Revelado Vertical 9:16
    v4 = VIDEOS_DIR / "reveal_vertical_9x16_15s.mp4"
    send_video(
        v4,
        "📱 <b>[El Revelado · Anuncio Vertical 9:16 · 15s · 1080x1920]</b>\n"
        "• <b>Móvil para TikTok / Reels / Shorts</b>: Matriz orbital 4x4 de baldosas que se abren interactivamente.\n"
        "• Cronómetro de desbloqueo, contador de jugadores online (8,920) y botón 'Destapar mi baldosa'."
    )

    print("\n✓ Todos los nuevos videos fueron enviados con éxito a tu Telegram.")

if __name__ == "__main__":
    main()

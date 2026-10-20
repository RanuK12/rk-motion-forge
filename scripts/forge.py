#!/usr/bin/env python3
# (c) 2026 Ranuk IT Solutions - ranuk.dev
"""
Ranuk Motion Forge — Video Generator CLI
Genera videos de motion design de 15s profesionales para todos los productos de Ranuk.
"""
import os
import sys
import json
import argparse
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
PRODUCTS_DIR = ROOT_DIR / "products"
DIST_VIDEOS = ROOT_DIR / "dist" / "videos"
DIST_POSTERS = ROOT_DIR / "dist" / "posters"

COMPOSITIONS = {
    # Arquetipo 1: Motion Promo Canónico (15s, 1920x1080)
    "datacanvas": {"comp": "DataCanvasVideo", "base_json": "datacanvas", "name": "DataCanvas BI (Standard Promo)"},
    "ranuk-profit": {"comp": "RanukProfitVideo", "base_json": "ranuk-profit", "name": "Ranuk Profit (Standard Promo)"},
    "reveal": {"comp": "RevealVideo", "base_json": "reveal", "name": "El Revelado (Standard Promo)"},

    # Arquetipo 2: Photorealistic Feature Walkthrough (24s, 1920x1080, split-screen + live typing + cursor click)
    "datacanvas-walkthrough": {"comp": "DataCanvasWalkthrough", "base_json": "datacanvas", "name": "DataCanvas Feature Walkthrough (ChatGPT Split-Screen)"},

    # Arquetipo 3: Kinetic Typography Launch Teaser (12s, 1920x1080)
    "datacanvas-teaser": {"comp": "DataCanvasLaunchTeaser", "base_json": "datacanvas", "name": "DataCanvas Launch Teaser (Fast Kinetic)"},
    "ranuk-profit-teaser": {"comp": "RanukProfitTeaser", "base_json": "ranuk-profit", "name": "Ranuk Profit Trading Terminal Teaser"},
    "reveal-teaser": {"comp": "RevealTeaser", "base_json": "reveal", "name": "El Revelado Mystery Satellite Teaser"},

    # Arquetipo 4: Vertical Mobile 9:16 (15s, 1080x1920 para X Mobile, TikTok, Reels, Reddit)
    "datacanvas-vertical": {"comp": "DataCanvasVerticalReels", "base_json": "datacanvas", "name": "DataCanvas Vertical Mobile (9:16)"},
    "ranuk-profit-vertical": {"comp": "RanukProfitVertical", "base_json": "ranuk-profit", "name": "Ranuk Profit Vertical Mobile (9:16)"},
    "reveal-vertical": {"comp": "RevealVertical", "base_json": "reveal", "name": "El Revelado Vertical Mobile (9:16)"},

    # Arquetipo 5: Studio Mosaic Wall (20s, 1920x1080 zoom-out de 366 soluciones)
    "mosaic": {"comp": "Mosaic", "base_json": None, "name": "Ranuk IT Solutions Mosaic Wall (80-Solution Grid)"},
}

def tg_send_video(file_path: Path, caption: str):
    tg_config = ROOT_DIR.parent / ".ranukita/telegram_config.json"
    if not tg_config.exists():
        tg_config = Path.home() / ".ranukita/telegram_config.json"
    if not tg_config.exists():
        return
    try:
        cfg = json.loads(tg_config.read_text())
        token = cfg.get("bot_token") or cfg.get("token") or cfg.get("channels", {}).get("telegram", {}).get("botToken")
        chat = cfg.get("chat_id") or cfg.get("channels", {}).get("telegram", {}).get("chatId") or 8107555656
        if not token or not file_path.exists():
            return
        cmd = [
            "curl", "-s", "-X", "POST",
            f"https://api.telegram.org/bot{token}/sendVideo",
            "-F", f"chat_id={chat}",
            "-F", f"video=@{str(file_path)}",
            "-F", f"caption={caption}",
            "-F", "supports_streaming=true",
            "-F", "parse_mode=HTML"
        ]
        subprocess.run(cmd, capture_output=True, timeout=120)
    except Exception as e:
        print(f"[TG Video Warning] {e}")

def list_products():
    print("==================================================")
    print("  Ranuk Motion Forge — Catálogo de Videos y Arquetipos")
    print("==================================================")
    for p_id, info in COMPOSITIONS.items():
        print(f"• {p_id:<24} | {info['name']:<45} | Comp: {info['comp']}")
    print("\nUso: python3 scripts/forge.py --product <id> [--telegram]")

def build_video(product_id: str, concurrency: int = 5, send_tg: bool = True):
    if product_id not in COMPOSITIONS:
        print(f"ERROR: Arquetipo/Producto '{product_id}' no encontrado en COMPOSITIONS.")
        print(f"Opciones: {', '.join(COMPOSITIONS.keys())}")
        sys.exit(1)

    info = COMPOSITIONS[product_id]
    comp_name = info["comp"]
    name = info["name"]
    output_mp4 = DIST_VIDEOS / f"{product_id}_promo_15s.mp4"
    output_poster = DIST_POSTERS / f"{product_id}_poster.jpg"

    DIST_VIDEOS.mkdir(parents=True, exist_ok=True)
    DIST_POSTERS.mkdir(parents=True, exist_ok=True)

    print("==================================================")
    print(f"  FORGING VIDEO: {name} ({product_id})")
    print(f"  Composition: {comp_name}")
    print(f"  Output: {output_mp4}")
    print("==================================================")

    cmd = [
        "npx",
        "remotion",
        "render",
        "src/index.ts",
        comp_name,
        str(output_mp4),
        f"--concurrency={concurrency}",
    ]

    print(f"Ejecutando: {' '.join(cmd)}")
    res = subprocess.run(cmd, cwd=str(ROOT_DIR))
    if res.returncode != 0:
        print("ERROR al renderizar video con Remotion.")
        sys.exit(res.returncode)

    file_size_mb = os.path.getsize(output_mp4) / (1024 * 1024)
    print(f"\n✓ Video MP4 generado con éxito: {output_mp4} ({file_size_mb:.2f} MB)")

    print(f"\nGenerando poster publicitario en alta definición...")
    poster_cmd = [
        "ffmpeg",
        "-ss", "00:00:05.000",
        "-i", str(output_mp4),
        "-vframes", "1",
        "-q:v", "2",
        str(output_poster),
        "-y"
    ]
    subprocess.run(poster_cmd, capture_output=True)
    if output_poster.exists():
        print(f"✓ Poster de portada generado: {output_poster}")

    if send_tg:
        print(f"Enviando prueba del video a Telegram...")
        caption = f"🎬 <b>Nuevo Video Renderizado: {name}</b>\nArquetipo: <code>{product_id}</code>\nListo para promoción en X / Reddit."
        tg_send_video(output_mp4, caption)
        print(f"✓ Prueba enviada exitosamente a Telegram.")

    print("\n==================================================")
    print(f"  FORGE COMPLETO: {name} LISTO")
    print("==================================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ranuk Motion Forge CLI")
    parser.add_argument("--product", type=str, help="ID del producto/arquetipo")
    parser.add_argument("--list", action="store_true", help="Listar productos y arquetipos disponibles")
    parser.add_argument("--no-telegram", action="store_true", help="No enviar a Telegram tras renderizar")
    args = parser.parse_args()

    if args.list or not args.product:
        list_products()
        if not args.product:
            sys.exit(0)

    build_video(args.product, send_tg=not args.no_telegram)

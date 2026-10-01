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
    "datacanvas": "DataCanvasVideo",
    "ranuk-profit": "RanukProfitVideo",
    "reveal": "RevealVideo",
}

def list_products():
    print("==================================================")
    print("  Ranuk Motion Forge — Catálogo de Productos")
    print("==================================================")
    for p in sorted(PRODUCTS_DIR.glob("*.json")):
        try:
            with open(p, "r", encoding="utf-8") as f:
                data = json.load(f)
                comp = COMPOSITIONS.get(data.get("id"), "ForgeCustomVideo")
                print(f"• {data.get('id'):<16} | {data.get('name'):<18} | Comp: {comp}")
                print(f"  {data.get('tagline')} ({data.get('audience')})")
                print()
        except Exception as e:
            print(f"• {p.stem} (Error parsing JSON: {e})")

def build_video(product_id: str, concurrency: int = 5):
    config_file = PRODUCTS_DIR / f"{product_id}.json"
    if not config_file.exists():
        print(f"ERROR: Producto '{product_id}' no encontrado en {PRODUCTS_DIR}")
        sys.exit(1)

    with open(config_file, "r", encoding="utf-8") as f:
        config = json.load(f)

    comp_name = COMPOSITIONS.get(product_id, "ForgeCustomVideo")
    output_mp4 = DIST_VIDEOS / f"{product_id}_promo_15s.mp4"
    output_poster = DIST_POSTERS / f"{product_id}_poster.jpg"

    DIST_VIDEOS.mkdir(parents=True, exist_ok=True)
    DIST_POSTERS.mkdir(parents=True, exist_ok=True)

    print("==================================================")
    print(f"  FORGING VIDEO: {config.get('name')} ({product_id})")
    print(f"  Composition: {comp_name} (1920x1080 @ 30fps · 15s)")
    print(f"  Output: {output_mp4}")
    print("==================================================")

    # 1. Remotion Render
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
        print(f"ERROR al renderizar video con Remotion.")
        sys.exit(res.returncode)

    print(f"\n✓ Video MP4 generado con éxito: {output_mp4}")
    file_size_mb = os.path.getsize(output_mp4) / (1024 * 1024)
    print(f"  Tamaño: {file_size_mb:.2f} MB")

    # 2. Extraer frame clave (frame 190 / segundo 6.3) como Poster de portada
    print(f"\nGenerando poster publicitario en alta definición...")
    poster_cmd = [
        "ffmpeg",
        "-ss", "00:00:06.500",
        "-i", str(output_mp4),
        "-vframes", "1",
        "-q:v", "2",
        str(output_poster),
        "-y"
    ]
    subprocess.run(poster_cmd, capture_output=True)
    if output_poster.exists():
        print(f"✓ Poster de portada generado: {output_poster}")

    print("\n==================================================")
    print(f"  FORGE COMPLETO: {config.get('name')} LISTO PARA REDES")
    print("==================================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ranuk Motion Forge CLI")
    parser.add_argument("--product", type=str, help="ID del producto (ej: datacanvas, ranuk-profit, reveal)")
    parser.add_argument("--list", action="store_true", help="Listar productos disponibles")
    args = parser.parse_args()

    if args.list or not args.product:
        list_products()
        if not args.product:
            print("\nUso: python3 scripts/forge.py --product <id>")
            sys.exit(0)

    build_video(args.product)

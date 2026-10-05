#!/usr/bin/env python3
"""
Captura 80 capturas de pantalla de alta resolución (1920x1200 · 16:10 exacto)
usando Google Chrome headless.

Garantiza:
- Cero pixelación (resolución nativa 1920x1200)
- Cero estiramiento (ratio 16:10 exacto)
- Webs y productos reales
"""
import os
import sys
import time
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DEST_DIR = Path(__file__).resolve().parent.parent / "public" / "shots"
DATA_DIR = Path(__file__).resolve().parent.parent / "src" / "data"

DEST_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

# 80 URLs de productos, dashboards, repositorios y herramientas
SITES = [
    # 1. Propios de Ranuk (Hero y proyectos)
    ("01_ranuk_dev", "https://ranuk.dev"),
    ("02_ranuk_it_hub", "https://ranuk.dev/ranuk-it/"),
    ("03_ranuk_trading_bots", "https://ranuk.dev/ranuk-it/trading-bots.html"),
    ("04_github_datacanvas", "https://github.com/RanuK12/rk-mcp-datacanvas"),
    ("05_github_motion_forge", "https://github.com/RanuK12/rk-motion-forge"),
    ("06_github_ranuk_dev", "https://github.com/RanuK12/Ranuk.dev"),
    ("07_github_binance_scalper", "https://github.com/RanuK12/binance-scalper"),
    ("08_github_el_revelado", "https://github.com/RanuK12/el-revelado"),
    ("09_github_jobfinder", "https://github.com/RanuK12/JobFinder"),
    ("10_ranuk_en", "https://ranuk.dev/en/"),
    
    # 2. IA, MCP y Analítica
    ("11_modelcontextprotocol", "https://modelcontextprotocol.io"),
    ("12_duckdb", "https://duckdb.org"),
    ("13_apache_echarts", "https://echarts.apache.org"),
    ("14_remotion", "https://remotion.dev"),
    ("15_fastapi", "https://fastapi.tiangolo.com"),
    ("16_openai_platform", "https://platform.openai.com/docs"),
    ("17_anthropic", "https://anthropic.com"),
    ("18_huggingface", "https://huggingface.co"),
    ("19_ollama", "https://ollama.com"),
    ("20_groq", "https://groq.com"),
    ("21_langchain", "https://langchain.com"),
    ("22_llamaindex", "https://llamaindex.ai"),
    ("23_replicate", "https://replicate.com"),
    ("24_together_ai", "https://together.ai"),
    ("25_openrouter", "https://openrouter.ai"),
    
    # 3. Plataformas SaaS, Dev & Cloud
    ("26_stripe", "https://stripe.com"),
    ("27_vercel", "https://vercel.com"),
    ("28_cloudflare", "https://cloudflare.com"),
    ("29_supabase", "https://supabase.com"),
    ("30_github_home", "https://github.com"),
    ("31_tailwindcss", "https://tailwindcss.com"),
    ("32_nextjs", "https://nextjs.org"),
    ("33_react_dev", "https://react.dev"),
    ("34_typescript", "https://typescriptlang.org"),
    ("35_python_org", "https://python.org"),
    ("36_vite", "https://vite.dev"),
    ("37_astro", "https://astro.build"),
    ("38_bun", "https://bun.sh"),
    ("39_deno", "https://deno.com"),
    ("40_rust_lang", "https://rust-lang.org"),
    ("41_golang", "https://golang.org"),
    ("42_linear_app", "https://linear.app"),
    ("43_raycast", "https://raycast.com"),
    ("44_cursor_editor", "https://cursor.com"),
    ("45_v0_dev", "https://v0.dev"),
    ("46_excalidraw", "https://excalidraw.com"),
    ("47_postman", "https://postman.com"),
    ("48_sentry", "https://sentry.io"),
    ("49_redis", "https://redis.io"),
    ("50_postgresql", "https://postgresql.org"),
    ("51_sqlite", "https://sqlite.org"),
    ("52_mongodb", "https://mongodb.com"),
    ("53_docker", "https://docker.com"),
    ("54_kubernetes", "https://kubernetes.io"),
    ("55_grafana", "https://grafana.com"),
    ("56_prometheus", "https://prometheus.io"),
    ("57_prisma", "https://prisma.io"),
    ("58_drizzle_orm", "https://drizzle.team"),
    ("59_trpc", "https://trpc.io"),
    ("60_tanstack", "https://tanstack.com"),
    ("61_shadcn_ui", "https://ui.shadcn.com"),
    ("62_radix_ui", "https://radix-ui.com"),
    ("63_lucide_icons", "https://lucide.dev"),
    ("64_threejs", "https://threejs.org"),
    ("65_playwright", "https://playwright.dev"),
    ("66_vitest", "https://vitest.dev"),
    ("67_biomejs", "https://biomejs.dev"),
    ("68_turborepo", "https://turborepo.org"),
    ("69_clerk_auth", "https://clerk.com"),
    ("70_resend", "https://resend.com"),
    ("71_upstash", "https://upstash.com"),
    ("72_railway", "https://railway.app"),
    ("73_fly_io", "https://fly.io"),
    ("74_render_cloud", "https://render.com"),
    ("75_modal_labs", "https://modal.com"),
    ("76_pypi", "https://pypi.org"),
    ("77_npm", "https://npmjs.com"),
    ("78_framer_motion", "https://framer.com/motion"),
    ("79_ranuk_it_it", "https://ranuk.dev/it/"),
    ("80_ranuk_terms", "https://ranuk.dev/terms/"),
]

def capture_one(entry):
    name, url = entry
    out_file = DEST_DIR / f"{name}.png"
    if out_file.exists() and out_file.stat().st_size > 30000:
        return name, str(out_file.name), True

    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--window-size=1920,1200",
        "--hide-scrollbars",
        f"--screenshot={out_file}",
        url
    ]
    try:
        subprocess.run(cmd, capture_output=True, timeout=20)
        if out_file.exists() and out_file.stat().st_size > 10000:
            return name, str(out_file.name), True
    except Exception as e:
        pass
    return name, None, False

def main():
    print(f"Iniciando captura de {len(SITES)} sitios en alta definición (1920x1200)...")
    success_files = []
    
    with ThreadPoolExecutor(max_workers=6) as executor:
        results = list(executor.map(capture_one, SITES))

    for name, filename, ok in results:
        if ok and filename:
            success_files.append(filename)
            print(f"✓ {name:<26} -> {filename}")
        else:
            print(f"✗ Falló: {name}")

    # Guardar la lista de shots para Remotion
    shots_json = DATA_DIR / "shots.json"
    with open(shots_json, "w", encoding="utf-8") as f:
        json.dump(success_files[:80], f, indent=2)

    print(f"\n==================================================")
    print(f"  Capturas exitosas: {len(success_files)} / {len(SITES)}")
    print(f"  Archivo generado: {shots_json}")
    print(f"==================================================")

if __name__ == "__main__":
    main()

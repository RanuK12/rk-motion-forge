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
import json
import os
import subprocess
import sys
import time
from pathlib import Path
import urllib.request

HOME = Path.home()
FORGE_DIR = HOME / "Desktop/Oficina_Ranuk/rk-motion-forge"
VIDEOS_DIR = FORGE_DIR / "dist/videos"
POST_SCRIPT = HOME / "Apps/ranukita-bridge/scripts/rk-x-post.py"
GUARD_DIR = HOME / "Apps/ranukita-bridge/scripts"
STATE_FILE = HOME / ".ranukita/video_promo_x_state.json"
LOG_FILE = HOME / ".ranukita/logs/video-promo-x.log"
TG_CONFIG = HOME / ".ranukita/telegram_config.json"

sys.path.insert(0, str(GUARD_DIR))
try:
    import rk_x_guard
except ImportError:
    rk_x_guard = None

PROMOS = [
    {
        "id": "datacanvas_walkthrough",
        "product": "DataCanvas BI",
        "format": "Feature Walkthrough (24s · 1080p)",
        "video": VIDEOS_DIR / "datacanvas_walkthrough_24s.mp4",
        "text": (
            "Still waiting on static matplotlib PNGs inside ChatGPT?\n\n"
            "We built DataCanvas BI: a native Model Context Protocol extension that transforms tabular data into reactive in-browser dashboards with DuckDB-WASM and Apache ECharts.\n\n"
            "Explore metrics live and export executive PDF reports in seconds.\n\n"
            "Try the Pro pass at https://buy.stripe.com/4gMfZaaQf3A2e6vdjf4Ja01 today."
        )
    },
    {
        "id": "ranuk_profit_teaser",
        "product": "Ranuk Profit",
        "format": "Trading Terminal Teaser (15s · 1080p)",
        "video": VIDEOS_DIR / "ranuk_profit_teaser_15s.mp4",
        "text": (
            "Discretionary crypto trading loses to discipline and latency.\n\n"
            "We built Ranuk Profit: an algorithmic trading daemon executing quantitative volatility breakout strategies and dynamic trailing stops 24/7 on Binance.\n\n"
            "Automated risk limits, zero emotional tilt, and sub-second execution.\n\n"
            "Explore the open source repo at https://github.com/RanuK12/binance-scalper-bot now."
        )
    },
    {
        "id": "reveal_teaser",
        "product": "El Revelado",
        "format": "Mystery Satellite Teaser (15s · 1080p)",
        "video": VIDEOS_DIR / "reveal_teaser_15s.mp4",
        "text": (
            "You are not buying the picture.\n\n"
            "Everyone gets to see that for free the moment it is finished. What nobody else can have is the tile with your name on it.\n\n"
            "A dynamic satellite puzzle where every uncovered square reveals the hidden territory.\n\n"
            "Claim your coordinates at https://reveal.ranuk.dev today."
        )
    },
    {
        "id": "mosaic_studio_wall",
        "product": "Ranuk IT Solutions",
        "format": "80-Solution Mosaic Wall (20s · 1080p)",
        "video": VIDEOS_DIR / "mosaic_wall_20s.mp4",
        "text": (
            "From trading daemons to native MCP extensions, we do not build prototypes. We ship production software.\n\n"
            "Here is the wall of solutions, internal tooling, and client pipelines deployed by Ranuk IT Solutions this season.\n\n"
            "Evolving from single scripts to autonomous systems.\n\n"
            "Explore our full engineering portfolio at https://ranuk.dev now."
        )
    },
    {
        "id": "datacanvas_kinetic_teaser",
        "product": "DataCanvas BI",
        "format": "Kinetic Launch Teaser (12s · 1080p)",
        "video": VIDEOS_DIR / "datacanvas_teaser_12s.mp4",
        "text": (
            "For engineers, consultants, and founders analyzing data in ChatGPT:\n\n"
            "DataCanvas BI turns raw CSV tables into interactive client-ready dashboards in under ten seconds.\n"
            "• Local DuckDB-WASM engine with zero backend data transmission\n"
            "• Reactive Apache ECharts filters\n"
            "• One-click executive PDF report export\n\n"
            "Connect your workflow at https://buy.stripe.com/4gMfZaaQf3A2e6vdjf4Ja01 directly."
        )
    }
]

def tg_notify(msg: str):
    if not TG_CONFIG.exists():
        return
    try:
        cfg = json.loads(TG_CONFIG.read_text())
        token = cfg.get("bot_token") or cfg.get("token") or cfg.get("channels", {}).get("telegram", {}).get("botToken")
        chat = cfg.get("chat_id", 8107555656)
        if not token:
            return
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = json.dumps({"chat_id": chat, "text": msg, "parse_mode": "HTML"}).encode()
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        print(f"[TG Warning] {e}")

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
            err = rk_x_guard.revisar(p["text"], tipo="tweet")
            if err:
                errors.append(f"Promo {idx} ({p['id']}): Guard rejected text: {err}")
    return errors

def main():
    parser = argparse.ArgumentParser(description="Ranuk Video Promo Engine for X (@ranuk_dev)")
    parser.add_argument("--dry-run", action="store_true", help="Validates everything without posting to X")
    parser.add_argument("--force", action="store_true", help="Bypasses cadence interval check")
    parser.add_argument("--index", type=int, default=None, help="Force specific promo by index (0-4)")
    parser.add_argument("--product", type=str, default=None, help="Force specific promo by product name")
    parser.add_argument("--status", action="store_true", help="Print current rotation status and exit")
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
    min_interval_seconds = 20 * 3600  # At least 20 hours between video promos (~1 per day)
    elapsed = now - state.get("last_posted_ts", 0)

    if args.status:
        last_ts = state.get("last_posted_ts", 0)
        last_str = dt.datetime.fromtimestamp(last_ts).strftime("%Y-%m-%d %H:%M:%S") if last_ts else "Never"
        next_idx = (state.get("last_index", -1) + 1) % len(PROMOS)
        print("=== RANUK VIDEO PROMO ENGINE STATUS ===")
        print(f"Total promos configured: {len(PROMOS)}")
        print(f"Last posted: {last_str} ({elapsed / 3600:.1f} hours ago)")
        print(f"Current rotation index: {state.get('last_index', -1)}")
        print(f"Next promo in queue [{next_idx}]: {PROMOS[next_idx]['product']} - {PROMOS[next_idx]['format']}")
        print(f"Can post now: {elapsed >= min_interval_seconds or last_ts == 0}")
        return

    # Cadence check
    if not args.force and not args.dry_run and elapsed < min_interval_seconds:
        hours_left = (min_interval_seconds - elapsed) / 3600
        print(f"[Video Promo] Cadencia activa: faltan {hours_left:.1f} horas para el próximo video. Salto.")
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

    if args.dry_run:
        print("✓ [DRY-RUN EXITOSO] El video existe, el texto cumple con rk_x_guard y el post está listo.")
        return

    if not POST_SCRIPT.exists():
        err_msg = f"ERROR: Script publicador no existe: {POST_SCRIPT}"
        print(err_msg)
        tg_notify(f"❌ <b>Error Video Promo X</b>: {err_msg}")
        sys.exit(1)

    cmd = [
        sys.executable,
        str(POST_SCRIPT),
        "--account", "ranuk_dev",
        "--text", promo["text"],
        "--video", str(video_path)
    ]

    print(f"Ejecutando {POST_SCRIPT.name} con cuenta @ranuk_dev...")
    start_t = time.time()
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
    dur = time.time() - start_t
    print(res.stdout)
    if res.stderr:
        print(res.stderr)

    if res.returncode == 0 and "POSTEADO ✓" in res.stdout:
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
    else:
        err_msg = f"Fallo al publicar promo de {promo['product']}: code {res.returncode}"
        print(f"❌ {err_msg}")
        tg_notify(f"❌ <b>Fallo al Publicar Video Promo en X</b>\n\n{err_msg}\nConsola: {res.stdout[-250:]}")
        sys.exit(1)

if __name__ == "__main__":
    main()

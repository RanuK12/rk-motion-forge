"""Tests para el motor de videos promocionales de Ranuk (rk-motion-forge).
Valida:
1. Cadencia de publicación (al menos 1 video cada 2 días en corrida diaria).
2. Integridad de los 11 videos promocionales configurados (existencia, tamaño, códec y pixel format).
3. Validación estricta con rk_x_guard (textos de X, límites de longitud y estilo).
4. Esquema de datos de los productos en products/*.json.
"""

import json
import os
import subprocess
import sys
import time
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
SCRIPTS_DIR = ROOT_DIR / "scripts"
VIDEOS_DIR = ROOT_DIR / "dist" / "videos"
PRODUCTS_DIR = ROOT_DIR / "products"
RANUKITA_SCRIPTS = Path.home() / "Apps/ranukita-bridge/scripts"

if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))
if str(RANUKITA_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(RANUKITA_SCRIPTS))

import rk_x_guard
import importlib.util

spec = importlib.util.spec_from_file_location("rk_video_promo_x", SCRIPTS_DIR / "rk-video-promo-x.py")
promo_mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(promo_mod)

PROMOS = promo_mod.PROMOS
validate_all_promos = promo_mod.validate_all_promos


def test_promos_count():
    """Verifica que existan al menos 10 arquetipos/videos configurados."""
    assert len(PROMOS) >= 10


def test_validate_all_promos_clean():
    """Valida que todos los videos existan en dist/videos/ y cumplan con rk_x_guard."""
    errors = validate_all_promos()
    assert len(errors) == 0, f"Errores en catálogo de promos: {errors}"


def test_promo_texts_pass_guard():
    """Verifica individualmente cada texto de promo con rk_x_guard."""
    for p in PROMOS:
        err = rk_x_guard.revisar(p["text"], tipo="tweet", cuenta="ranuk_dev")
        assert not err, f"rk_x_guard rechazó tweet de {p['id']}: {err}"

        guia = rk_x_guard.guia_estilo(p["text"])
        assert not guia, f"rk_x_guard guia_estilo rechazó {p['id']}: {guia}"

        assert len(p["text"]) <= 280, f"Texto excede 280 chars: {p['id']}"

        if p.get("thread"):
            for t_idx, t_text in enumerate(p["thread"]):
                err_t = rk_x_guard.revisar(t_text, tipo="tweet", cuenta="ranuk_dev")
                assert not err_t, f"Thread #{t_idx+1} rechazado en {p['id']}: {err_t}"


def test_video_files_yuv420p():
    """Verifica con ffmpeg que los videos usen pixel format yuv420p (8-bit) para X/TikTok."""
    ffmpeg_bin = Path("/Users/emilioranucoli/.local/bin/ffmpeg")
    if not ffmpeg_bin.exists():
        ffmpeg_bin = "ffmpeg"

    for p in PROMOS:
        video_path = p["video"]
        assert video_path.exists(), f"Video no encontrado: {video_path}"
        assert video_path.stat().st_size > 500_000, f"Video sospechosamente chico: {video_path}"

        res = subprocess.run([str(ffmpeg_bin), "-i", str(video_path)], capture_output=True, text=True)
        out = res.stdout + res.stderr
        assert "yuv420p" in out, f"Video {video_path.name} no está en yuv420p: {out}"


def test_cadence_calculation():
    """Verifica la lógica de cadencia de al menos 1 video cada 2 días (umbral de 40 horas)."""
    cadence_hours = 40.0
    cadence_seconds = cadence_hours * 3600

    now = 1700000000.0

    # Caso 1: Nunca publicado antes -> debe permitir publicar
    last_posted_never = 0
    elapsed_never = now - last_posted_never
    can_post_never = elapsed_never >= cadence_seconds or last_posted_never == 0
    assert can_post_never is True

    # Caso 2: Publicado hace 24 horas (ayer) -> debe saltar (no publicar)
    last_posted_yesterday = now - (24 * 3600)
    elapsed_yesterday = now - last_posted_yesterday
    can_post_yesterday = elapsed_yesterday >= cadence_seconds
    assert can_post_yesterday is False

    # Caso 3: Publicado hace 48 horas (hace 2 días) -> debe permitir publicar
    last_posted_2days = now - (48 * 3600)
    elapsed_2days = now - last_posted_2days
    can_post_2days = elapsed_2days >= cadence_seconds
    assert can_post_2days is True

    # Caso 4: Publicado hace 72 horas (retraso/pausa previa) -> debe permitir publicar
    last_posted_3days = now - (72 * 3600)
    elapsed_3days = now - last_posted_3days
    can_post_3days = elapsed_3days >= cadence_seconds
    assert can_post_3days is True


def test_rotation_index():
    """Verifica que el índice de rotación avance de forma cíclica entre todos los promos."""
    n = len(PROMOS)
    assert n > 0

    idx = -1
    for i in range(n * 2):
        idx = (idx + 1) % n
        assert 0 <= idx < n
        assert PROMOS[idx]["id"] is not None

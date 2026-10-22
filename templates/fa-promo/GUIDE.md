# Guía: promo vertical estilo Flight Alert (Remotion 4)

## Pasos
1. `npm ci`
2. Editar `public/script.json`: una entrada por escena `{"say": texto hablado, "caption": texto en pantalla}`. En `caption`, `|` es salto de línea.
3. `python3 make_vo.py [voz]` → genera `public/vo*.mp3` y `public/timing.json`. La clave sale de `DEEPGRAM_API_KEY` (env) o del Keychain `ranukita/DEEPGRAM_API_KEY`. Nunca hardcodearla ni commitearla.
4. `npx remotion render src/index.ts Promo out/video.mp4 --codec h264`

## Escenas
Definidas en `scenes` de `src/Promo.tsx` (hook, problem, shot, alert, cta, outro). Las capturas van en `public/`. La duración de cada escena sigue al audio automáticamente.

## Voz y subtítulos
- Deepgram Aura-2, voz por defecto `aura-2-diana-es`, acelerada con `TEMPO=1.156` (env; `TEMPO=1` la desactiva).
- Subtítulos karaoke: los tiempos de palabra salen de la API (transcripción nova-3 del propio audio), no a ojo.
- Respellings de pronunciación en `say` (no en `caption`): p. ej. `Ránuk ai tí solushons` para "Ranuk AI Tech Solutions". Escribir como suena.

## Safe areas 9:16 (1080x1920, TikTok/Reels/X)
Nada importante en: arriba 160 px, abajo 420 px, derecha 150 px.

## Reglas
- Música SOLO con licencia libre (CC0/CC BY o similar). Crédito obligatorio en el post y en `credits.txt`, p. ej.: `Music: "Inspired" by Kevin MacLeod (incompetech.com), CC BY 4.0.`  Volumen ~0.09.
- PROHIBIDO inventar precios, descuentos o cifras: solo datos reales del producto.
- No usar MoneyPrinterTurbo para este formato.

# rk-motion-forge

Motor unificado de generación y motion design para videos promocionales de software, productos indie y dApps utilizando **Remotion** (React 19 + TypeScript) y un orquestador CLI en Python con integración directa a Telegram y post-procesamiento con ffmpeg.

---

## 🎬 Catálogo Completo de Arquetipos de Video

El motor cuenta con **7 arquetipos de video** optimizados para diferentes objetivos (TikTok/Reels, Reddit/X, Product Hunt, YouTube):

| # | Arquetipo | Duración / Ratio | Target / Plataforma | Descripción Visual |
|---|-----------|------------------|---------------------|--------------------|
| **1** | **Motion Promo Canónico** | 15s (16:9) | Web / Twitter / General | Estilo canónico Ranuk con split screens, métricas y badges. |
| **2** | **Feature Walkthrough** | 24s (16:9) | Product Hunt / Demos | Split-screen fotorrealista con tipeo en vivo y clics de cursor. |
| **3** | **Kinetic Launch Teaser** | 12s (16:9) | X / Anuncios rápidos | Tipografía cinética de alta velocidad con transiciones rápidas. |
| **4** | **Vertical Mobile** | 15s (9:16) | TikTok / Reels / X Mobile | Layout 1080x1920 con safe areas protegidas (160px top / 420px bottom). |
| **5** | **Studio Mosaic Wall** | 20s (16:9) | Institucional / Portafolio | Zoom-out cinematográfico mostrando grid de decenas de soluciones de software. |
| **6** | **NextGen Obsidian Glass** | 15s (16:9 & 9:16) | Devs / Tech / Reddit | Glassmorphism oscuro, tarjetas flotantes con bordes brillantes y animación spring. |
| **7** | **Indie Showcase (Model 8840FE3E)** | 27s (16:9 & 9:16) | Reddit / X / Tech Demos | **Showcase cinematográfico indie con 4 fases estructuradas: Hook interactivo, UI nativa, panel de settings y prueba social de Reddit.** |

---

## 💎 Arquetipo 7: Indie Showcase (Model 8840FE3E) en Detalle

Inspirado en los videos virales de lanzamiento de utilidades de escritorio/móviles para desarrolladores (referencia `8840FE3E-E292-47F4-A274-8AD8D139A1A9.MP4`):

### Estructura de 4 Fases (810 frames / 27 segundos @ 30fps):
1. **Fase 1: Hook y Notch Interactivo (0s - 3s / frames 0-90)**
   - Header flotante con branding sutil y switchers interactivos.
   - Notch/Dynamic Island en expansión con micro-animaciones fluidas.
2. **Fase 2: Mockup Interactivo en Vivo (3s - 11s / frames 90-330)**
   - Tarjetas dinámicas en tiempo real: Pomodoro timer, reproductor musical con visualizador de barras, notificaciones del sistema.
   - Indicadores de rendimiento nativos (ej. `< 18MB RAM`, `0% CPU`).
3. **Fase 3: Panel de Configuración Nativo (11s - 18s / frames 330-540)**
   - Ventana estilo macOS / Windows 11 Fluent con sliders de opacidad, tamaño, toggles y temas.
   - Demostración de adaptabilidad y control total por parte del usuario.
4. **Fase 4: Prueba Social "Heard on Reddit" y Outro (18s - 27s / frames 540-810)**
   - Tarjetas de comentarios reales de la comunidad ("Works seamlessly with Spotify", "Finally something lightweight").
   - Outro final con badge Open Source, enlace de descarga limpia y llamada a la acción clara.

---

## 🚀 Uso Rápido y CLI

```bash
# Listar todos los arquetipos y productos soportados
python3 scripts/forge.py --list

# Generar Video Indie Showcase 16:9 (Horizontal para X / Reddit Desktop)
python3 scripts/forge.py --product dynamic-island-showcase

# Generar Video Indie Showcase 9:16 (Vertical para TikTok / Reels / X Mobile)
python3 scripts/forge.py --product dynamic-island-showcase-vertical

# Generar otros arquetipos
python3 scripts/forge.py --product datacanvas-nextgen
python3 scripts/forge.py --product ranuk-profit-vertical
```

Los videos renderizados se guardan en `dist/videos/` y opcionalmente se envían a Telegram para revisión inmediata antes de publicar.

---

## 🛠️ Cómo Agregar un Nuevo Producto al Arquetipo

1. Crear `products/<tu-producto>.json` siguiendo el schema estándar.
2. Registrar la composición en `src/Root.tsx`:
   ```tsx
   <Composition
     id="MiProductoShowcase"
     component={IndieProductShowcase as any}
     durationInFrames={810}
     fps={30}
     width={1920}
     height={1080}
     defaultProps={{ config: miProductoConfig }}
   />
   ```
3. Agregar la entrada en el diccionario `COMPOSITIONS` de `scripts/forge.py`.
4. Renderizar con `python3 scripts/forge.py --product <tu-id>`.

---

## 🧪 Tests

```bash
python3 -m pytest tests/ -v
```

## 📝 Licencia
Ranuk IT Solutions — Propiedad de Emilio Ranucoli.
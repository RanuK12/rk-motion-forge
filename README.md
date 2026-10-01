# Ranuk Motion Forge ⚡🎬

> Motor autónomo de motion design programático en **Remotion (React)** para generar videos promocionales profesionales de alto impacto (15s, 1920x1080 @ 30fps) para todos los productos de **Ranuk IT Solutions**.

---

## 🚀 ¿Qué es Ranuk Motion Forge?

Es una factoría de contenido audiovisual en código. En lugar de usar editores manuales pesados o prompts de modelos generativos que inventan interfaces falsas, **Ranuk Motion Forge** renderiza código React real sincronizado al compás musical (120 BPM):

- **100% Código React + Remotion:** Sin plantillas genéricas. Tipografía cinética, springs físicos con overshoot calibrado y dither/halftone procedural en SVG.
- **Catálogo Basado en Datos (`products/*.json`):** Crear un video para un nuevo producto solo requiere redactar un JSON con sus métricas y features.
- **Renderizado Automatizado:** CLI en Python que genera el archivo `.mp4` Full HD y el póster HD de portada para redes sociales.
- **Multiproducto Integrado:** Viene preconfigurado con presets para DataCanvas BI, Ranuk Profit, El Revelado, Name A Day y Ranukita Hub.

---

## 📁 Estructura del Proyecto

```text
rk-motion-forge/
├── products/                  # Fichas JSON declarativas de cada producto
│   ├── datacanvas.json        # DataCanvas BI (ChatGPT MCP extension)
│   ├── ranuk-profit.json      # Ranuk Profit (Trading bot)
│   └── reveal.json            # El Revelado (Juego satelital viral)
├── src/
│   ├── components/            # Micro-componentes de diseño
│   │   ├── Mascot.tsx         # Mascota procedural dither/halftone SVG
│   │   └── DitherIcon.tsx     # Iconos retro-tech (database, chart, terminal)
│   ├── compositions/
│   │   └── MotionPromoVideo.tsx # Composición universal parametrizada (6 escenas)
│   ├── types/
│   │   └── product.ts         # TypeScript schema para products
│   ├── Root.tsx               # Registro de composiciones Remotion
│   └── index.ts               # Entrypoint oficial de Remotion
├── scripts/
│   └── forge.py               # CLI oficial para listar y renderizar videos + posters
├── public/
│   └── music.mp3              # Track de audio calibrado a 120 BPM
└── dist/
    ├── videos/                # Archivos finales .mp4 Full HD
    └── posters/               # Posters de portada en alta definición
```

---

## ⏱️ Anatomía de los 15 Segundos (Hard Cuts @ 120 BPM)

| Escena | Segundos | Frames | Beats | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **01 – Hook** | `0–2s` | `0–60` | 4 | Fondo blanco, entrada de la mascota desde la derecha, timecode falso `REC [TC]` y pregunta provocadora palabra por palabra. |
| **02 – Features** | `2–5s` | `60–150` | 6 | Fondo del color de acento (`#2563EB`, `#10B981`, etc.). Dos cards blancas con borde negro se apilan con springs y badges técnicos. |
| **03 – Product** | `5–8s` | `150–240` | 6 | Titular cinético con palabra clave en serif itálica + mockup de ventana macOS con la UI real y gráficos interactivos animados. |
| **04 – System** | `8–11s` | `240–330` | 6 | Grid 2x2 de arquitectura en tiempo real: contadores reactivos, latencias sub-segundo y badges de estado que se marcan al compás. |
| **05 – Phrase** | `11–13s` | `330–390` | 4 | Fondo negro absoluto (`#0A0A0A`). Tipografía monumental (*"You prompt. / We handle the rest."*) con guiño de la mascota. |
| **06 – Outro** | `13–15s` | `390–450` | 4 | Fondo blanco, mascota coronando el wordmark, botón CTA con pulso, URL limpia y línea de prueba social. |

---

## 🛠️ Comandos de Uso

### 1. Previsualizar e iterar en Remotion Studio
Abre la interfaz visual interactiva en el navegador para ajustar tiempos o animaciones en vivo:
```bash
npm run studio
```

### 2. Listar productos disponibles en el catálogo
```bash
python3 scripts/forge.py --list
```

### 3. Forjar un video y póster automáticamente
```bash
# Renderizar para DataCanvas BI
python3 scripts/forge.py --product datacanvas

# Renderizar para Ranuk Profit
python3 scripts/forge.py --product ranuk-profit

# Renderizar para El Revelado
python3 scripts/forge.py --product reveal
```

### 4. Cómo agregar un producto nuevo
Crea un archivo en `products/<mi-producto>.json` siguiendo el schema de [src/types/product.ts](src/types/product.ts). No hace falta tocar código React; el motor adaptará paletas, textos, métricas e iconos automáticamente.

# rk-motion-forge

Motor para generar videos promocionales con motion design usando **Remotion** (React + TypeScript) y un CLI en Python para orquestación.

## 🎬 Productos disponibles

| Producto | ID | Descripción |
|----------|-----|-------------|
| **DataCanvas** | `datacanvas` | MCP extension para ChatGPT - análisis de datos en lenguaje natural |
| **Ranuk Profit Bot** | `ranuk-profit` | Bot de paper-trading crypto con señales técnicas y gestión de riesgo |
| **The Reveal** | `reveal` | Landing de suscripción para revelaciones de nombres de dominio |

## 🚀 Uso rápido

```bash
# Instalar dependencias Python
pip3 install -r requirements.txt

# Listar productos
python3 scripts/forge.py --list

# Generar video + poster para un producto
python3 scripts/forge.py --product datacanvas
python3 scripts/forge.py --product ranuk-profit
python3 scripts/forge.py --product reveal
```

Los videos y posters se generan en `dist/videos/` y `dist/posters/`.

## 🛠️ Desarrollo

### Remotion (React/TypeScript)

```bash
# Ver composiciones disponibles
npx remotion compositions src/index.ts

# Render directo con Remotion
npx remotion render src/index.ts DataCanvasVideo out/datacanvas.mp4 --concurrency=2
```

### Estructura del proyecto

```
rk-motion-forge/
├── products/           # Definiciones JSON de cada producto
│   ├── datacanvas.json
│   ├── ranuk-profit.json
│   └── reveal.json
├── scripts/
│   └── forge.py        # CLI principal (orquesta Remotion + ffmpeg)
├── src/
│   ├── index.ts        # Registro de composiciones Remotion
│   ├── Root.tsx        # Componente raíz con todas las variantes
│   ├── compositions/
│   │   └── MotionPromoVideo.tsx  # Composición principal parametrizable
│   ├── components/
│   │   ├── Mascot.tsx           # Mascota animada (zorro/lobo)
│   │   └── DitherIcon.tsx       # Iconos con dithering estilo retro
│   └── types/
│       └── product.ts           # Tipos TypeScript para productos
├── dist/
│   ├── videos/        # Videos generados (MP4)
│   └── posters/       # Posters generados (JPG)
└── tests/
    └── test_forge.py  # Tests unitarios e integración
```

## 🧪 Tests

```bash
python3 -m pytest tests/ -v
```

## 📦 Requisitos

- **Node.js** 18+ (para Remotion)
- **Python** 3.10+
- **ffmpeg** (para post-procesamiento de video)
- Dependencias Python: `moviepy`, `pydub`, `pytesseract`

## 🎨 Personalización

Cada producto se define en `products/<id>.json` con:
- `hook` - Gancho inicial (3s)
- `features` - Lista de features con icono, métrica, beneficio
- `productShowcase` - Demo del producto (5s)
- `systemPipeline` - Pipeline técnico (4 pasos)
- `mission` - Misión/visión (3s)
- `outro` - CTA final (3s)
- `colors` - Paleta de colores (primary, accent, bg, text)
- `mascot` - Configuración de la mascota (emoji, color, animation)

## 📝 Licencia

Ranuk IT Solutions — Propiedad de Emilio Ranucoli.
# 🔮 Madame Web - Frontend

> *"El destino te espera... y esta vez está literalmente en tu navegador."*

Aplicación web interactiva de tarot desarrollada en React que genera predicciones sarcásticas en el cliente. Combina los 22 Arcanos Mayores representados por personajes icónicos de la cultura pop con un sistema de lecturas personalizadas que son más honestas que tu historial de búsqueda.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://madame-web.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**🌐 App en vivo:** [https://madame-web.vercel.app](https://madame-web.vercel.app)

---

## ✨ Características

- 🃏 **22 Arcanos Mayores** representados por personajes de la cultura pop
- 🎨 **Diseño místico-moderno** con animaciones fluidas y efectos de partículas
- 🔮 **Lectura de 3 cartas** (Pasado, Presente, Futuro) con predicciones dinámicas
- ⚡ **100% cliente-side** - Sin dependencias de backend, todo funciona offline después de cargar
- ✍️ **Efecto typewriter** para las predicciones (porque el drama es importante)
- 🎭 **Interpretaciones duales**: significado tradicional + versión realista-sarcástica
- 📱 **Responsive design** adaptado a móvil, tablet y desktop
- 🌈 **Paleta de colores cósmica** con temas de nebulosas y estrellas
- 🚀 **Instantáneo** - Sin cold starts ni tiempos de espera
- 🎪 **Animaciones Lottie** para estados de carga

---

## 🛠️ Tech Stack

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **React** | 19.2.3 | Librería UI |
| **Vite** | 7.1.0 | Build tool y dev server |
| **React Router DOM** | 7.8.0 | Enrutamiento SPA |
| **Tailwind CSS** | 4.1.12 | Estilos utility-first |
| **Lottie React** | 2.4.1 | Animaciones JSON |
| **ESLint** | 9.32.0 | Linting |
| **SWC** | - | Compilador ultra-rápido |

---

## 📦 Instalación

### Prerequisitos

- Node.js ≥18.0.0
- npm o yarn

### Pasos
```bash
# 1. Clonar el repositorio
git clone https://github.com/olgararo/madame-web.git
cd madame-web

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run dev

# 4. ¡Listo! La app estará en http://localhost:5173
```

---

## 🚀 Scripts Disponibles
```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 📂 Estructura del Proyecto
```
madame-web/
│
├── public/                       # Assets estáticos
│
├── src/
│   ├── assets/
│   │   └── img/
│   │       ├── ani_crystalBall.json    # Animación Lottie
│   │       ├── img_cardback.webp       # Dorso de cartas
│   │       ├── img_madameWeb.webp      # Imagen principal
│   │       └── readme_img/             # Capturas para docs
│   │
│   ├── components/
│   │   ├── Card.jsx                    # Carta individual con flip
│   │   ├── CardList.jsx                # Grid de cartas
│   │   └── Reading.jsx                 # (Placeholder)
│   │
│   ├── pages/
│   │   ├── Home.jsx                    # Landing page mística
│   │   ├── ArcanaGrid.jsx              # Galería de 22 arcanos
│   │   ├── ArcanaDetail.jsx            # Detalle individual
│   │   ├── ArcanaReading.jsx           # Lectura de 3 cartas
│   │   └── About.jsx                   # Info del proyecto
│   │
│   ├── data/                           # ← NUEVO: Datos locales
│   │   ├── arcana.json                 # 22 Arcanos Mayores
│   │   └── predictions.json            # Fragmentos de predicciones
│   │
│   ├── services/                       # ← MODIFICADO
│   │   └── predictionService.js        # Lógica de generación de predicciones
│   │
│   ├── router/
│   │   └── Router.jsx                  # Configuración de rutas
│   │
│   ├── App.jsx                         # Layout principal + navbar
│   ├── App.css                         # Animaciones globales
│   ├── index.css                       # Theme de Tailwind
│   └── main.jsx                        # Punto de entrada
│
├── index.html                          # HTML base
├── vite.config.js                      # Configuración Vite
├── vercel.json                         # Config de deploy
└── package.json                        # Dependencias
```

---

## 🎨 Paleta de Colores

La app usa un tema cósmico-místico con colores definidos en `src/index.css`:

| Color | Hex | Uso |
|-------|-----|-----|
| **Nebula Black** | `#0F0B1D` | Fondo principal |
| **Sunflare Orange** | `#FF6F3C` | Acentos primarios |
| **Supernova Coral** | `#FF886C` | Hovers y gradientes |
| **Cosmic Plum** | `#B580D1` | Títulos místicos |
| **Madame Mystic** | `#7547A5` | Acentos secundarios |
| **Radiant Apricot** | `#FFD6BF` | Texto suave |
| **Moonlight Linen** | `#FFF2EA` | Texto principal |
| **Galactic Purple** | `#2E1A47` | Cards y modales |
| **Wink Pink** | `#FF9BAE` | Detalles decorativos |

![Paleta de colores](src/assets/img/readme_img/color_palette_madameWeb.png)

---

## 📱 Capturas de Pantalla

### Desktop
![Vista Desktop](src/assets/img/readme_img/desktop.png)

### Mobile
![Vista Mobile](src/assets/img/readme_img/mobile.png)

### Prototipo Original (Figma)
![Prototipo Figma](src/assets/img/readme_img/prototipo_figma.png)

---

## 🔮 Sistema de Predicciones

### Arquitectura Cliente-Side

La aplicación genera predicciones completamente en el navegador sin necesidad de backend:
```javascript
// src/services/predictionService.js

class PredictionService {
  // 1. Obtener todos los arcanos (desde JSON local)
  getAllCards() {
    return arcanaData; // Datos embebidos en el bundle
  }

  // 2. Obtener arcano específico
  getCardById(id) {
    return arcanaData.find(card => card.id === id);
  }

  // 3. Generar predicción (100% en cliente)
  getPrediction(card1Id, card2Id, card3Id) {
    // Algoritmo de ensamblaje dinámico:
    // - Calcula energía dominante
    // - Selecciona fragmentos de texto según condiciones
    // - Ensambla predicción única con puntuación natural
    return { prediction, cards_used, dominant_energy };
  }
}
```

### Datos Locales

**`src/data/arcana.json`** (3.5KB)
- 22 Arcanos Mayores
- Cada carta incluye: nombre, número, energía, temas, descripción, interpretación irónica, imagen

**`src/data/predictions.json`** (12KB)
- 90+ fragmentos de texto categorizados
- Tipos: introducción, desarrollo (x3), transición (x2), cierre
- Condiciones dinámicas: energía dominante, temas, posición de carta

### Algoritmo de Generación
```
1. Usuario selecciona 3 cartas → [Pasado, Presente, Futuro]
2. Sistema calcula energía dominante (positiva/negativa/neutra)
3. Selecciona fragmentos matching:
   - Introducción (según energía)
   - Desarrollo carta 1 (según temas + posición)
   - Transición 1 (opcional: según combinación de energías)
   - Desarrollo carta 2
   - Transición 2
   - Desarrollo carta 3
   - Cierre (aleatorio)
4. Ensambla texto con puntuación natural
5. Renderiza con efecto typewriter (20ms/carácter)
```

---

## 🎭 Flujo de la Aplicación
```
Home (Landing)
    ↓
ArcanaGrid (Galería)
    ↓
ArcanaDetail (Click en carta)
    
O

ArcanaReading (Lectura 3 cartas)
    ↓
    1. Selecciona 3 cartas del mazo
    2. Revelar → Genera predicción instantánea
    3. Efecto typewriter muestra resultado
    4. Click en carta revelada → Modal con detalles
```

---

## 🎬 Animaciones y UX

### Efectos implementados

- ✨ **Flip cards**: Las cartas se voltean con animación 3D
- 📜 **Typewriter effect**: Las predicciones se escriben letra por letra
- 💫 **Partículas flotantes**: Elementos decorativos con `animate-pulse`
- 🌊 **Gradientes dinámicos**: Transiciones suaves de color
- 🔄 **Loading states**: Animación Lottie de bola de cristal (solo cosmético)
- 🎪 **Hover effects**: Escalado, sombras y brillos
- 📖 **Smooth scroll**: Navegación fluida entre secciones

### Componentes interactivos
```javascript
// Carta con flip
<Card arcana={...} /> 
// → Click 1: Voltea carta
// → Click 2: Navega a detalle

// Mazo en escalera (fan effect)
<div className="deck-spread">
  // → Cartas distribuidas en arco
  // → Hover: Carta sube y se ilumina
```

---

## 🚀 Deploy en Vercel

### Configuración automática

El proyecto incluye `vercel.json` para SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Pasos para deploy
```bash
# 1. Instalar Vercel CLI (opcional)
npm i -g vercel

# 2. Conectar con GitHub
# → Vercel hace auto-deploy en cada push a main

# 3. Build automático
# → Vite bundlea todo (código + JSON)
# → Sin variables de entorno necesarias
```

**URL de producción:** [https://madame-web.vercel.app](https://madame-web.vercel.app)

---

## ⚡ Optimizaciones

### Performance

- ✅ **Bundle único** - Todos los datos embebidos (~16KB JSON total)
- ✅ **Zero latencia** - Sin llamadas HTTP, todo instantáneo
- ✅ **Lazy loading** de imágenes con formato WebP
- ✅ **Code splitting** automático con Vite
- ✅ **Compresión Brotli** en Vercel
- ✅ **Minificación** CSS y JS en producción
- ✅ **Funciona offline** - PWA-ready

### SEO y Accesibilidad

- ✅ Meta tags Open Graph
- ✅ Imágenes con `alt` descriptivo
- ✅ Navegación por teclado
- ✅ Contraste de colores WCAG AA
- ✅ HTML semántico

---

## 🎯 Funcionalidades Destacadas

### 1. Sistema de Cartas Flip
```jsx
const [isFlipped, setIsFlipped] = useState(false);

// Primera interacción: voltea
// Segunda interacción: navega
```

### 2. Predicciones con Typewriter
```javascript
useEffect(() => {
  let timer = setInterval(() => {
    setDisplayedText(fullText.substring(0, currentIndex + 1));
  }, 20); // 20ms por carácter
}, [prediction]);
```

### 3. Mazo en Escalera (CSS Puro)
```css
.deck-card {
  transform: rotate(calc(-15deg + var(--index) * (30deg / var(--total))));
  margin-left: -70px;
}
```

---

## 📝 Roadmap

- [ ] Guardar lecturas favoritas (LocalStorage) ← ¡Ahora posible sin backend!
- [ ] Compartir predicción en redes sociales
- [ ] Audio místico de fondo (opcional)
- [ ] PWA con service worker ← Funciona offline nativo
- [ ] Escribir un About Me explicando la historia detrás del proyecto
- [ ] Animación vectorial con GSAP de una telaraña creciendo por toda la web

---

## 🐛 Problemas Conocidos

- En Safari móvil, las animaciones CSS pueden tener menos frames
- Las imágenes de Cloudinary pueden tardar en la primera carga

---

## 🤝 Contribuir

¿Quieres añadir más arcanos, mejorar animaciones o corregir bugs?

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/digievolucion`)
3. Commit tus cambios (`git commit -m 'Añade mejora'`)
4. Push a la rama (`git push origin feature/digievolucion`)
5. Abre un Pull Request

---

## 🙏 Créditos

- **Diseño UI/UX:** OlgaRaRo (Figma)
- **Iconos:** Google Material Icons
- **Animaciones:** Lottie Files
- **Imágenes de arcanos:** Generadas con Google AI Studio (Nano Banana)
- **Hosting:** Vercel
- **CDN de imágenes:** Cloudinary

---

## 📜 Historia del Proyecto

Este proyecto comenzó como una aplicación full-stack con backend en Node.js/Express desplegado en Render. Sin embargo, dado que:

- No requería base de datos
- Solo ensamblaba texto de datos estáticos
- Render free tier tenía cold starts de 60 segundos

**Decidí migrar toda la lógica al frontend**, eliminando dependencias externas y ganando:
- ⚡ **Velocidad**: De 60s a 0s de espera
- 💰 **Costos**: $0 en infraestructura
- 🔒 **Confiabilidad**: Sin puntos de fallo externos
- 🌐 **Offline-first**: Funciona sin conexión

Lección aprendida: **No siempre necesitas un backend.** A veces, la mejor arquitectura es la más simple.

---

## 👩‍💻 Autora

**Olga Ramos Rodríguez**  
Pitonisa junior y desarrolladora Full Stack

- GitHub: [@olgararo](https://github.com/olgararo)
- LinkedIn: [Olga Ramírez](https://www.linkedin.com/in/olga-ramirez-rodriguez/)

---

## 🔗 Enlaces Relacionados

- 🗂️ **Repo del backend original (deprecado):** [madame-web-api](https://github.com/olgararo/madame-web-api)  
  *Nota: Este backend ya no es necesario. Se mantiene por razones educativas.*

---

<div align="center">

**✨ Que el cosmos te acompañe ✨**

*Hecho con sudor, lágrimas y un poco de refactoring inteligente aconsejado por unos seniors muy majos 
(gracias Astrojuanlu y Humitos)*

[![Star en GitHub](https://img.shields.io/github/stars/olgararo/madame-web?style=social)](https://github.com/olgararo/madame-web)

</div>

---
title: Enacero Landing Page — Design Spec
date: 2026-05-27
status: approved
type: design
---

# Enacero Landing Page — Design Spec

## Contexto

Enacero (Encuentro Acerero MX) es el rebrand de Aceros SIDIVA, una distribuidora de acero con sede en Ciudad de México. Los sitios actuales (`encuentroacerero.com.mx`, `encuentroacererocommx.com.mx`, `acerossidiva.com`) son builds básicos de WordPress que no comunican la profesionalidad ni la escala que la marca realmente representa.

Este spec define una landing estática en Next.js 16 que establece a Enacero como un distribuidor B2B de acero top-tier en México mediante diseño visual cinematográfico y arquitectura de información rigurosa.

## Objetivos

1. Reemplazar los sitios actuales con una landing única que proyecte autoridad y modernidad
2. Dirigir a la audiencia primaria (construcción + industrial) a los canales de contacto (WhatsApp / email / formulario de cotización)
3. Establecer el rebrand visualmente — aprovechar producción de diseño clase Rivian adaptada a industria pesada
4. Entregar como sitio estático (sin auth, sin backend, sin CMS)

## No-objetivos

- Sin experiencia multi-página (es una landing)
- Sin catálogo de productos navegable (fase separada)
- Sin backend, auth, CMS, ni cuentas de cliente
- Sin blog ni noticias
- Sin testimoniales (no hay contenido real disponible)
- Sin soporte multi-idioma (solo español)

## Audiencia

**Primaria:** Construcción (constructoras, desarrolladores, contratistas de obra) + Industrial (fabricantes, plantas, talleres de estructuras metálicas)

**Secundaria:** Techadores, distribuidores, ferreteros — incluidos en la sección de sectores pero sin protagonismo.

## Identidad de marca

**Personalidad:** Industrial moderno / tech-forward. Serio, masivo, con peso físico, elegancia cinematográfica.

**Referencia visual ancla:** [rivian.com](https://rivian.com)

**Logo:** existente. Wordmark "ENACERO" en azul marino + símbolo metálico cobre (A estilizada) sobre disco de acero cepillado. Se usa tal cual sobre un contexto flat estilo Rivian, con momentos calculados de textura metálica como acentos.

## Sistema visual

### Paleta de colores
- **Fondo dominante (oscuro):** `#0A0A0A` a `#101216` (alterna entre negro absoluto y casi-negro con leve tono azulado)
- **Fondo claro:** `#F4F2EE` (blanco hueso para secciones alternadas)
- **Acento primario:** `#C26F3A` (cobre del logo — solo en CTAs, números clave, hover states, momentos signature)
- **Institucional:** `#1F2D7A` (azul marino del logo — secundario, badges técnicos, data viz)
- **Neutrales:** `#8A8F94` (gris medio), `#D4D6D9` (gris claro), `#2A2D32` (gris profundo de superficie)

### Tipografía
- **Display:** sans-serif geométrica, pesos desde Light (300) para body hasta Black (900) para hero
- **Body:** misma familia, Regular (400) y Medium (500)
- **Candidatos:** Söhne (premium), Inter (free), General Sans (free), Geist (free) — decisión final en fase Claude Design

### Tratamiento
Base Rivian-flat (sin skeuomorfismo, sin falso-3D). Texturas metálicas aparecen en 2-3 momentos calculados:
- Divisor o acento en hero
- Background de un bloque CTA
- Un section divider con textura de acero cepillado

## Arquitectura de información

Diez secciones, en orden de scroll:

1. **Hero cinematográfico** — Video loop full-bleed (secuencia de 4 clips Pexels) + tagline + CTA primario + CTA secundario + nav minimalista flotante con logo
2. **Statement de marca** — Texto editorial grande, fondo oscuro, reveal palabra-por-palabra al scroll
3. **Cifras / autoridad** — 4-5 números grandes animados (años, proyectos, estados, certificaciones) — placeholders en este build
4. **Líneas de producto** — Pinned horizontal scroll mostrando 4 categorías: Perfiles Estructurales, Perfiles Comerciales, Aceros Planos, Aceros de Refuerzo
5. **Sectores que atendemos** — 6 tiles con hover reveal, énfasis visual en Construcción + Industrial (más grandes / primero)
6. **Proceso / capacidades** — Stepper o diagrama animado describiendo entrega, logística, asesoría técnica, certificaciones — incluye fondo con textura metálica
7. **Cobertura geográfica** — Mapa estilizado de México animado
8. **Aliados / certificaciones** — Scroll horizontal infinito de logos de proveedores y certificaciones
9. **CTA final + contacto** — Oscuro, tipografía masiva, formulario corto / WhatsApp / email
10. **Footer** — Logo, quick links, dirección, copyright

## Imagery

### Hero video
Secuencia de 4 clips (Pexels, 4K, uso comercial libre), loop de 10 segundos:
- Steel Mill Hyperlapse (planta aérea)
- Furnace Sparks (interior de horno)
- A Man Welding (soldador con chispas)
- Slow Motion of Welding (close-up chispas)

URLs:
- https://www.pexels.com/video/steel-mill-hyperlapse-19587106/
- https://www.pexels.com/video/furnace-sparks-6997856/
- https://www.pexels.com/video/a-man-welding-6046365/
- https://www.pexels.com/video/slow-motion-of-welding-in-factory-11887094/

### Resto del sitio
Fotografía cinematográfica de acero: close-ups de textura, obras de construcción, plantas industriales, pisos de fábrica. Color grading oscuro, iluminación dramática.

## Sistema de animación

Nivel 2 — Cinematográfico ambicioso. Específicamente:

- Scroll-driven reveals (fade + translate Y al entrar en viewport)
- Pin sections (sticky scroll donde el contenido avanza)
- Parallax (sutil, 20-30% de desplazamiento máximo)
- Text reveals (mask, palabra-por-palabra, typewriter donde aplique)
- Números con counter animado
- Mapa animado (path-drawing)
- Cursor custom en CTAs y product tiles
- Scroll horizontal infinito para aliados/certificaciones
- Smooth scroll con inercia controlada
- Sutil movimiento de gradientes en backgrounds oscuros

## Stack técnico (para fase de implementación)

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Framer Motion (motion a nivel componente)
- GSAP + ScrollTrigger (scroll storytelling, pin sections)
- Lenis (smooth scroll)
- react-intersection-observer (triggers eficientes)
- shadcn/ui (componentes primitivos)
- next/image + next/video (optimización media)

## Alcance de contenido

Todo el copy y datos numéricos son **placeholders** en este build. Marcados como `[PLACEHOLDER]` en el brief de Claude Design y en cualquier copy generado. El cliente (Enacero) los reemplaza con datos verificados antes del lanzamiento.

**Datos reales confirmados:**
- Contacto: WhatsApp `+52 554 889 6854`, email `contacto@acerossidiva.com`
- Dirección: Calle Ote. 182 #362, Col. Moctezuma 2da Secc, Venustiano Carranza, CDMX 15530
- Categorías de producto (4)
- Sectores (6)

## Workflow de ejecución

1. **Fase 1 — Prototipo en Claude Design (claude.ai/design):** Usuario pega el brief de Claude Design (documento separado: `2026-05-27-enacero-claude-design-brief.md`) en claude.ai/design e itera sobre el prototipo visual.
2. **Fase 2 — Handoff a Claude Code:** Usuario exporta el handoff bundle desde Claude Design y lo comparte con esta sesión de Claude Code.
3. **Fase 3 — Implementación:** Esta sesión convierte el handoff en código Next.js de producción siguiendo el stack técnico arriba.

## Preguntas abiertas / decisiones diferidas

- Tagline final ("Acero que sostiene México" es working placeholder)
- Elección final de tipografía (Söhne vs Inter vs General Sans vs Geist) — se decide en fase Claude Design según qué se vea correcto
- Si usar la secuencia de 4 clips en hero o un solo clip dominante (G - Soldador) — se decide en prototipo
- Sound design (diferido — Nivel 2 no lo requiere pero podría sumarse)

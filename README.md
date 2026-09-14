# RAÍZ

Brief de contexto para retomar este proyecto en Claude Code. Leelo antes de tocar código.

## Qué es

Raíz es una app móvil dirigida a familias con niños de 3 a 5 años que busca facilitar la detección temprana de señales de alerta vinculadas al desarrollo del lenguaje y las habilidades matemáticas. A través de actividades prácticas para hacer en el hogar, busca promover la estimulación oportuna y funcionar como puente accesible entre las familias y una eventual consulta profesional.

**Raíz no diagnostica ni reemplaza a un profesional de la salud.** Este mensaje tiene que mantenerse en toda comunicación (landing, copy, redes, etc.).

- **Categoría:** Educación / Tecnología
- **Etapa actual:** Idea inicial / Validación

## Contexto y oportunidad

En Uruguay, 1 de cada 5 niños menores de 5 años presenta dificultades en lenguaje y matemáticas (INEEd y Udelar, 2025). Estas dificultades, no detectadas a tiempo, anticipan bajo rendimiento escolar. Hoy las familias dependen de consultas médicas o especialistas para darse cuenta, y muchas veces esa consulta llega tarde o no llega.

El proyecto busca democratizar el acceso a herramientas de estimulación temprana y, antes que nada, **validar que existe la necesidad**.

## Objetivo de esta etapa

Validar dos hipótesis críticas antes de construir la app:

1. Las familias realmente desean una herramienta de este tipo.
2. Existe disposición a pagar por un acompañamiento preventivo.

Para eso: encuestas a familias + landing page de validación (lo que hay en este repo).

## Qué hay en este repo

```
RAIZ/
├── index.html             → estructura y copy de la landing (solo HTML)
├── css/styles.css         → todos los estilos (tokens de color arriba de todo)
├── js/formulario.js       → formulario en 2 pasos + armado del mailto
├── js/interacciones.js    → aparición al hacer scroll + CTA fijo en móvil
├── img/icons/*.svg        → íconos e ilustración de raíces
└── README.md              → este documento
```

- `index.html` queda en la raíz porque GitHub Pages lo necesita ahí, con ese nombre exacto.
- Los íconos se cargan desde CSS como máscara (`mask-image`) y toman el color del texto, así se adaptan al modo oscuro.

### Cómo previsualizar

Abrirla con un servidor local, **no con doble clic**: con `file://` el navegador bloquea las máscaras SVG y los íconos no aparecen. En GitHub Pages se ven bien.

- VS Code: clic derecho en `index.html` → **Open with Live Server**.
- O desde la carpeta del repo: `python -m http.server` y abrir `http://localhost:8000`.

## Cómo está armada la landing

Rehecha con la skill `landing-page-mastery` (estructura de formato corto, orientada a conversión). Una sola página, mobile-first, en español rioplatense:

1. **Hero** — titular de resultado concreto, CTA con micro-copy ("Gratis · 1 minuto · Sin compromiso"), dato de INEEd/Udelar como credibilidad, aviso de que no diagnostica y un **boceto ilustrativo de la app** hecho en HTML/CSS.
2. **Problema (PAS)** — 3 dudas típicas de las familias → consecuencia (bajo rendimiento escolar, consulta tardía) → Raíz como solución.
3. **Cómo funciona** — 3 pasos: jugás en casa → anotás lo que observaste → salís de la duda.
4. **Para quién es / qué no es** — incluye el disclaimer: no es un diagnóstico ni reemplaza a profesionales.
5. **Preguntas frecuentes** — acordeón con `<details>` (diagnóstico, precio, disponibilidad, por qué 3 a 5 años, datos).
6. **Formulario (CTA final)** — en 2 pasos: (1) ¿tiene hijos de 3 a 5? + ¿pagaría?; (2) email + comentario opcional.

Conversión: botón terracota usado **solo** para acciones, header fijo con CTA en escritorio y barra CTA fija abajo en móvil (aparece al pasar el hero y se oculta al llegar al formulario).

**Decisiones de honestidad:** no hay testimonios, logos ni contadores de usuarios porque todavía no existen; no inventarlos. El boceto de la app está rotulado como ilustrativo.

### Formulario: estado actual (importante)

El formulario hoy **no tiene backend**. Al enviarlo, arma un `mailto:` con las respuestas y le abre al usuario su cliente de mail. Es un placeholder funcional para no bloquear la publicación.

1. **Email de destino.** Está en `index.html`, en tres lugares (buscar `franpuchala8@gmail.com`):
   - `data-destino` del `<form id="raiz-form">` → a donde llegan las respuestas.
   - El link del mensaje de gracias y el del footer.

   Para el boceto usa el email de Francisco. Si el proyecto pasa a tener un mail propio, cambiarlo en los tres.

2. **(Recomendado) Centralizar las respuestas.** Un `mailto` depende de que el visitante tenga cliente de mail configurado en el celular, y no queda una tabla prolija de respuestas. Alternativas simples para conectar acá:
   - Google Sheets vía un webhook de Apps Script (gratis, rápido de armar).
   - Firebase Firestore (Francisco ya lo usa en otros proyectos — es la opción más directa si van a seguir con Firebase para la app completa).
   - Un servicio de formularios tipo Formspree/Tally si prefieren no tocar backend.

## Próximos pasos sugeridos

1. Revisar el copy con la persona a cargo del proyecto (el email de destino ya está cargado para el boceto).
   - Validar con un/a profesional (fonoaudiología / psicopedagogía) los ejemplos del boceto de la app y la respuesta de "¿Por qué de 3 a 5 años?".
   - Si hay una historia real detrás del proyecto, sumar una sección "Por qué hacemos Raíz" con nombre y foto (la skill la recomienda).
   - Cuando haya respuestas reales, sumar prueba social verdadera (ej. "X familias ya se sumaron").
2. (Opcional pero recomendado) conectar el formulario a Sheets/Firebase para no depender del mailto.
3. Deploy: GitHub Pages es lo más directo dado que el repo se llama `RAIZ` (Settings → Pages → deploy desde `main`).
4. Compartir el link con familias + lanzar la encuesta en paralelo.
5. Con los resultados, decidir si se avanza a construir el MVP de la app (o se pivota).

## Convenciones de trabajo

- Idioma de todo el copy: español rioplatense.
- **Un lenguaje por archivo, cada uno en su carpeta** (`css/`, `js/`, `img/`…). Nada de `<style>`, `<script>`, `style="..."` ni SVG inline en el HTML.
- Flujo habitual del proyecto: clarificar el brief → README para Claude Code → build → commit → push a GitHub (repo `RAIZ`), un commit por cambio relevante.

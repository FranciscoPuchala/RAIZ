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

- `index.html` — landing page de validación, lista para publicar (sin backend, un solo archivo).
- `README.md` — este documento.

## Cómo está armada la landing

Una sola página, mobile-first, en español rioplatense:

1. **Hero** — propuesta de valor + CTA al formulario.
2. **Contexto** — el dato de INEEd/Udelar como prueba de la oportunidad.
3. **Cómo funciona** — 3 pasos (observar en casa → señales claras → siguiente paso con un profesional).
4. **Disclaimer** — Raíz no diagnostica ni reemplaza a un profesional.
5. **Formulario de validación** — nombre, email, si tiene hijos de 3 a 5 años, disposición a pagar (sí / tal vez / no), comentario opcional.

### Formulario: estado actual (importante)

El formulario hoy **no tiene backend**. Al enviarlo, arma un `mailto:` con las respuestas y le abre al usuario su cliente de mail. Es un placeholder funcional para no bloquear la publicación, pero tiene dos pendientes antes de compartir la landing con familias reales:

1. **Reemplazar el email de destino.** En `index.html`, buscar:
   ```js
   var CONTACT_EMAIL = "TU-EMAIL-AQUI@ejemplo.com";
   ```
   y poner el mail real donde quieren recibir las respuestas.

2. **(Recomendado) Centralizar las respuestas.** Un `mailto` depende de que el visitante tenga cliente de mail configurado en el celular, y no queda una tabla prolija de respuestas. Alternativas simples para conectar acá:
   - Google Sheets vía un webhook de Apps Script (gratis, rápido de armar).
   - Firebase Firestore (Francisco ya lo usa en otros proyectos — es la opción más directa si van a seguir con Firebase para la app completa).
   - Un servicio de formularios tipo Formspree/Tally si prefieren no tocar backend.

## Próximos pasos sugeridos

1. Reemplazar `CONTACT_EMAIL` y revisar el copy con la persona a cargo del proyecto.
2. (Opcional pero recomendado) conectar el formulario a Sheets/Firebase para no depender del mailto.
3. Deploy: GitHub Pages es lo más directo dado que el repo se llama `RAIZ` (Settings → Pages → deploy desde `main`).
4. Compartir el link con familias + lanzar la encuesta en paralelo.
5. Con los resultados, decidir si se avanza a construir el MVP de la app (o se pivota).

## Convenciones de trabajo

- Idioma de todo el copy: español rioplatense.
- Flujo habitual del proyecto: clarificar el brief → README para Claude Code → build → commit → push a GitHub (repo `RAIZ`), un commit por cambio relevante.

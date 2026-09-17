# RAÍZ

Brief de contexto para retomar este proyecto en Claude Code. Leelo antes de tocar código.

## Qué es

Raíz es una app móvil dirigida a familias con niños de 3 a 5 años que busca facilitar la detección temprana de señales de alerta vinculadas al desarrollo del lenguaje y las habilidades matemáticas. A través de actividades prácticas para hacer en el hogar, busca promover la estimulación oportuna y funcionar como puente accesible entre las familias y una eventual consulta profesional.

**Raíz no diagnostica ni reemplaza a un profesional de la salud.** Este mensaje tiene que mantenerse en toda comunicación (landing, copy, redes, etc.).

- **Categoría:** Educación / Tecnología
- **Etapa actual:** Idea inicial / Validación

## Contexto y oportunidad

En Uruguay, 1 de cada 5 niños menores de 5 años presenta dificultades en lenguaje y matemáticas (INEEd y Udelar, 2025). Estas dificultades, no detectadas a tiempo, anticipan bajo rendimiento escolar. Hoy las familias dependen de consultas médicas o especialistas para darse cuenta, y muchas veces esa consulta llega tarde o no llega.

## Objetivo de esta etapa

Validar interés antes de construir la app. Para eso:

- **Landing de lista de espera** (este repo): las familias dejan su email para recibir novedades.
- **Encuesta**: va por fuera de la web. **No poner preguntas de encuesta en la landing.**

## Brief de la landing (vigente)

- Una sola pantalla, estilo lista de espera de preventa.
- Encabezado claro.
- Párrafo breve con el problema y el dato: *"En Uruguay, 1 de cada 5 niños menores de 5 años presenta dificultades en lenguaje y matemáticas (INEEd y Udelar, 2025)"*.
- Sección con la propuesta de la web/app.
- Botón destacado ("Quiero sumarme a la lista de espera") para dejar el email y recibir actualizaciones.
- Solo registro de correo, sin encuesta.
- Diseño cálido, profesional y sencillo, pensado para familias con niños pequeños.
- Aclarar que no reemplaza profesionales ni diagnostica.

> La versión anterior (página larga con encuesta de validación) quedó guardada en la rama `version-larga-validacion`.

## Qué hay en este repo

```
RAIZ/
├── index.html              → estructura y copy de la landing (solo HTML)
├── css/styles.css          → todos los estilos (tokens de color arriba de todo)
├── js/lista-espera.js      → envío del email a Google Sheets + botón fijo en móvil
├── apps-script/Codigo.gs   → código del Apps Script que guarda los emails en la planilla
├── img/marca/logo.svg      → logo (brote con raíces), también usado como favicon
├── img/icons/*.svg         → íconos e ilustración de raíces
└── README.md               → este documento
```

- `index.html` queda en la raíz porque GitHub Pages lo necesita ahí, con ese nombre exacto.
- Los íconos se cargan desde CSS como máscara (`mask-image`) y toman el color del texto, así se adaptan al modo oscuro.

## Cómo está armada la landing

Hecha con la skill `landing-page-mastery`, estructura "ultra-corta" (tipo newsletter / lista de espera):

- **Header:** logo + indicador "Lista de espera abierta". Sin menú (la skill desaconseja enlaces de navegación).
- **Izquierda:** titular de resultado concreto, párrafo del problema con el dato y la fuente, formulario de **un solo campo** (email) con el botón "Quiero sumarme a la lista de espera", micro-copy que responde objeciones ("Gratis · Solo te escribimos con novedades · Te das de baja cuando quieras") y el aviso de que no diagnostica ni reemplaza profesionales.
- **Derecha:** tarjeta "Qué va a ser Raíz" con la propuesta en 3 puntos (actividades en casa, señales claras, puente con profesionales).
- **Pie:** una línea con el estado del proyecto y el contacto.
- **Escritorio:** entra entera en la pantalla sin scroll (probado de 1024×768 a 1920×1080).
- **Móvil:** apilada, con el registro visible sin scrollear y un botón fijo abajo que aparece cuando el registro sale de pantalla.
- **Anti-spam:** campo trampa oculto (`empresa`) que los humanos no ven.

## Conectar la lista de espera a Google Sheets

Mientras no se configure, el formulario muestra "La lista todavía no está conectada" y no envía nada.

1. Crear una planilla nueva en Google Sheets (por ejemplo, "Raíz – Lista de espera").
2. En la planilla: **Extensiones → Apps Script**. Borrar el código que aparece y pegar el contenido de `apps-script/Codigo.gs`. Guardar.
3. **Implementar → Nueva implementación** → tipo **Aplicación web**:
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
4. **Implementar** y autorizar los permisos. Si aparece "Google no verificó esta app": **Configuración avanzada → Ir a (nombre del proyecto)**. Es tu propio script.
5. Copiar la **URL de la aplicación web** (termina en `/exec`).
6. En `index.html`, pegarla en el atributo `data-endpoint` del formulario:
   ```html
   <form class="signup-form" id="lista-espera" data-endpoint="https://script.google.com/macros/s/.../exec" novalidate>
   ```
7. Commit + push. Los emails van a aparecer en la hoja **"Lista de espera"** (se crea sola) con fecha y email.

Notas:
- Si se modifica `Codigo.gs`, hay que ir a **Implementar → Gestionar implementaciones → Editar → Nueva versión** para que el cambio se publique (la URL no cambia).
- Abrir la URL `/exec` en el navegador debe responder `{"ok":true,...}`: sirve para comprobar que está activa.
- Los emails se guardan en minúsculas y no se duplican.
- La URL del script queda visible en el código de la página (es normal en este tipo de integración).

## Cómo previsualizar

Abrirla con un servidor local, **no con doble clic**: con `file://` el navegador bloquea las máscaras SVG y los íconos no aparecen. En GitHub Pages se ven bien.

- VS Code: clic derecho en `index.html` → **Open with Live Server**.
- O desde la carpeta del repo: `python -m http.server` y abrir `http://localhost:8000`.

## Próximos pasos sugeridos

1. Conectar la planilla (sección de arriba) y probar con un email real.
2. Revisar el copy con la persona a cargo del proyecto.
3. Si se promete "te das de baja cuando quieras", definir cómo se gestiona (por ahora: responder el mail y borrar la fila).
4. Cuando haya inscriptos reales, sumar prueba social verdadera (ej. "Ya se sumaron X familias"); la skill la recomienda cerca del botón. No inventarla.
5. Compartir el link junto con la encuesta (que va por fuera).
6. Con los resultados, decidir si se avanza al MVP de la app.

## Convenciones de trabajo

- Idioma de todo el copy: español rioplatense.
- **Un lenguaje por archivo, cada uno en su carpeta** (`css/`, `js/`, `img/`, `apps-script/`…). Nada de `<style>`, `<script>`, `style="..."` ni SVG inline en el HTML.
- Para cambios en la landing, usar la skill `landing-page-mastery`.
- Flujo habitual del proyecto: clarificar el brief → README para Claude Code → build → commit → push a GitHub (repo `RAIZ`), un commit por cambio relevante.

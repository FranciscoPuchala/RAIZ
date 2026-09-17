// Lista de espera de Raíz.
// Envía el email a Google Sheets a través de un Apps Script (ver apps-script/Codigo.gs).
// La URL del script va en el atributo data-endpoint del <form id="lista-espera"> en index.html.
(function(){
  var form = document.getElementById('lista-espera');
  if(!form) return;

  var endpoint = (form.getAttribute('data-endpoint') || '').trim();
  var input = document.getElementById('email');
  var boton = form.querySelector('button[type="submit"]');
  var trampa = document.getElementById('empresa');
  var error = document.getElementById('lista-mensaje');
  var exito = document.getElementById('lista-exito');
  var sticky = document.getElementById('sticky-cta');
  var enviando = false;
  var registroVisible;

  var mensajes = {
    vacio: 'Escribí tu email para sumarte.',
    invalido: 'Revisá el email: parece que falta algo.',
    sinConexion: 'La lista todavía no está conectada. Probá de nuevo en unos días.',
    fallo: 'No pudimos anotarte. Revisá tu conexión y probá de nuevo.'
  };

  function mostrarError(texto){
    error.textContent = texto;
    form.classList.toggle('has-error', Boolean(texto));
  }

  input.addEventListener('input', function(){
    if(form.classList.contains('has-error') && input.validity.valid) mostrarError('');
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(enviando) return;

    var email = input.value.trim();
    if(!email){ mostrarError(mensajes.vacio); input.focus(); return; }
    if(!input.validity.valid){ mostrarError(mensajes.invalido); input.focus(); return; }
    if(endpoint.indexOf('https://script.google.com/') !== 0){ mostrarError(mensajes.sinConexion); return; }

    mostrarError('');
    enviando = true;
    form.classList.add('is-sending');
    boton.setAttribute('aria-disabled', 'true');

    // Formato x-www-form-urlencoded: no dispara preflight CORS y Apps Script lo lee en e.parameter
    var datos = new URLSearchParams({ email: email, empresa: trampa.value });

    fetch(endpoint, { method: 'POST', body: datos })
      .then(function(res){ return res.json(); })
      .then(function(res){
        if(res && res.ok){
          form.hidden = true;
          exito.hidden = false;
          exito.focus();
          actualizarSticky();
        } else if(res && res.error === 'email_invalido'){
          mostrarError(mensajes.invalido);
          input.focus();
        } else {
          mostrarError(mensajes.fallo);
        }
      })
      .catch(function(){
        mostrarError(mensajes.fallo);
      })
      .then(function(){
        enviando = false;
        form.classList.remove('is-sending');
        boton.removeAttribute('aria-disabled');
      });
  });

  // --- Botón fijo en móvil: aparece cuando el registro no se ve ---
  if(!sticky || !('IntersectionObserver' in window)) return;

  function actualizarSticky(){
    if(!sticky || registroVisible === undefined) return;
    var mostrar = !registroVisible && !form.hidden;
    sticky.classList.toggle('is-visible', mostrar);
    if(mostrar){
      sticky.removeAttribute('inert');
    } else {
      sticky.setAttribute('inert', '');
    }
  }

  new IntersectionObserver(function(entries){
    registroVisible = entries[entries.length - 1].isIntersecting;
    actualizarSticky();
  }).observe(document.getElementById('registro'));

  // Lleva al registro y deja el cursor en el email (el salto por ancla le quitaría el foco)
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  sticky.querySelector('a').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('registro').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    input.focus({ preventScroll: true });
  });
})();

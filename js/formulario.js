// Formulario de validación en 2 pasos.
// Sin backend: al enviar arma un mailto con las respuestas.
// El email de destino está en el atributo data-destino del <form> (index.html).
(function(){
  var form = document.getElementById('raiz-form');
  if(!form) return;

  var destino = form.getAttribute('data-destino');
  var stepCount = document.getElementById('form-step-count');
  var steps = form.querySelectorAll('.form-step');
  var thanks = form.querySelector('.thanks');
  var btnSiguiente = form.querySelector('[data-action="siguiente"]');
  var btnVolver = form.querySelector('[data-action="volver"]');
  var emailInput = form.querySelector('#f-email');

  var etiquetas = {
    hijos: {si:'Sí', no:'No, pero le interesa el tema', embarazo:'Están esperando o planeando'},
    pago: {si:'Sí, con gusto', talvez:'Tal vez, depende del precio', no:'No'}
  };

  function valorDe(name){
    var checked = form.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : '';
  }

  function mostrarError(name, mensaje){
    var contenedor = form.querySelector('[data-question="' + name + '"]');
    var error = form.querySelector('[data-error-for="' + name + '"]');
    if(error) error.textContent = mensaje;
    if(contenedor) contenedor.classList.toggle('has-error', Boolean(mensaje));
  }

  function irAlPaso(n){
    steps.forEach(function(step){
      step.hidden = step.getAttribute('data-step') !== String(n);
    });
    form.setAttribute('data-paso', String(n));
    stepCount.textContent = 'Paso ' + n + ' de 2';
  }

  function validarPaso1(){
    var primerInvalido = null;
    ['hijos', 'pago'].forEach(function(name){
      if(valorDe(name)){
        mostrarError(name, '');
      } else {
        mostrarError(name, 'Elegí una opción para seguir.');
        if(!primerInvalido) primerInvalido = form.querySelector('input[name="' + name + '"]');
      }
    });
    if(primerInvalido) primerInvalido.focus();
    return !primerInvalido;
  }

  function validarEmail(){
    var valor = emailInput.value.trim();
    if(!valor){
      mostrarError('email', 'Dejanos tu email para avisarte novedades.');
    } else if(!emailInput.validity.valid){
      mostrarError('email', 'Revisá el email: parece que falta algo.');
    } else {
      mostrarError('email', '');
      return true;
    }
    emailInput.focus();
    return false;
  }

  // Al elegir una opción se borra el error de esa pregunta
  form.addEventListener('change', function(e){
    if(e.target.name === 'hijos' || e.target.name === 'pago'){
      mostrarError(e.target.name, '');
    }
  });

  emailInput.addEventListener('input', function(){
    if(form.querySelector('[data-question="email"]').classList.contains('has-error') && emailInput.validity.valid){
      mostrarError('email', '');
    }
  });

  btnSiguiente.addEventListener('click', function(){
    if(!validarPaso1()) return;
    irAlPaso(2);
    emailInput.focus();
  });

  btnVolver.addEventListener('click', function(){
    irAlPaso(1);
    var elegido = form.querySelector('input[name="hijos"]:checked');
    if(elegido) elegido.focus();
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Enter en el paso 1 funciona como "Seguir"
    if(form.getAttribute('data-paso') === '1'){
      btnSiguiente.click();
      return;
    }
    if(!validarPaso1()){
      irAlPaso(1);
      return;
    }
    if(!validarEmail()) return;

    var comentario = form.querySelector('#f-comentario').value.trim();
    var asunto = 'Raíz — nueva respuesta de validación';
    var cuerpo = [
      'Email: ' + emailInput.value.trim(),
      '¿Tiene hijos/as de 3 a 5 años?: ' + etiquetas.hijos[valorDe('hijos')],
      '¿Pagaría por la herramienta?: ' + etiquetas.pago[valorDe('pago')],
      'Comentario: ' + (comentario || '—')
    ].join('\n');

    window.location.href = 'mailto:' + destino +
      '?subject=' + encodeURIComponent(asunto) +
      '&body=' + encodeURIComponent(cuerpo);

    steps.forEach(function(step){ step.hidden = true; });
    form.classList.add('is-submitted');
    thanks.hidden = false;
    thanks.focus();
  });
})();

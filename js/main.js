(function(){
  // Email donde llegan las respuestas de la encuesta (boceto: email de Francisco).
  var CONTACT_EMAIL = "franpuchala8@gmail.com";

  var form = document.getElementById('raiz-form');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = new FormData(form);
    var nombre = (data.get('nombre') || '').toString().trim();
    var email = (data.get('email') || '').toString().trim();
    var hijos = (data.get('hijos') || '').toString();
    var pago = (data.get('pago') || '').toString();
    var comentario = (data.get('comentario') || '').toString().trim();

    var hijosLabel = {si:'Sí', no:'No, pero le interesa', embarazo:'Está embarazada / planeando'}[hijos] || hijos;
    var pagoLabel = {si:'Sí, con gusto', talvez:'Tal vez, depende del precio', no:'No'}[pago] || pago;

    var subject = 'Raíz — nueva respuesta de validación';
    var body = [
      'Nombre: ' + nombre,
      'Email: ' + email,
      '¿Tiene hijos/as de 3 a 5 años?: ' + hijosLabel,
      '¿Pagaría por la herramienta?: ' + pagoLabel,
      'Comentario: ' + (comentario || '—')
    ].join('\n');

    var mailto = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailto;
    form.classList.add('is-submitted');
  });
})();

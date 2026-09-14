// Header: aviso superior, estado al hacer scroll, CTA que aparece al pasar el hero,
// menú móvil y sección activa en la navegación.
(function(){
  var header = document.getElementById('site-header');
  if(!header) return;
  document.documentElement.classList.add('js-header');

  // --- Aviso superior (se puede cerrar; se recuerda durante la sesión) ---
  var aviso = document.getElementById('aviso');
  if(aviso){
    try {
      if(sessionStorage.getItem('raiz-aviso-cerrado') === '1') aviso.hidden = true;
    } catch(e){}

    aviso.querySelector('.aviso-cerrar').addEventListener('click', function(){
      aviso.hidden = true;
      try { sessionStorage.setItem('raiz-aviso-cerrado', '1'); } catch(e){}
      header.querySelector('.brand').focus();
    });
  }

  // --- Fondo con blur y sombra cuando el header queda pegado arriba ---
  var pendiente = false;
  function actualizarScroll(){
    var pegado = header.getBoundingClientRect().top <= 0 && window.scrollY > 4;
    header.classList.toggle('is-scrolled', pegado);
    pendiente = false;
  }
  window.addEventListener('scroll', function(){
    if(!pendiente){
      pendiente = true;
      window.requestAnimationFrame(actualizarScroll);
    }
  }, {passive:true});
  actualizarScroll();

  // --- CTA del header: solo cuando el botón del hero ya no se ve ---
  var heroCta = document.getElementById('hero-cta');
  if(heroCta && 'IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      header.classList.toggle('cta-visible', !entries[entries.length - 1].isIntersecting);
    }).observe(heroCta);
  } else {
    header.classList.add('cta-visible');
  }

  // --- Menú móvil ---
  var toggle = header.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');

  function abrirMenu(abrir){
    header.classList.toggle('menu-open', abrir);
    toggle.setAttribute('aria-expanded', String(abrir));
    toggle.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  }

  toggle.addEventListener('click', function(){
    abrirMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function(e){
    if(e.target.closest('a')) abrirMenu(false);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && header.classList.contains('menu-open')){
      abrirMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function(e){
    if(header.classList.contains('menu-open') && !header.contains(e.target)) abrirMenu(false);
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function(e){
    if(e.matches) abrirMenu(false);
  });

  // --- Sección activa en la navegación ---
  if(!('IntersectionObserver' in window)) return;
  var links = nav.querySelectorAll('.nav-link');
  var linkPorSeccion = {};
  links.forEach(function(link){
    linkPorSeccion[link.getAttribute('href').slice(1)] = link;
  });

  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      links.forEach(function(link){ link.removeAttribute('aria-current'); });
      var activo = linkPorSeccion[entry.target.id];
      if(activo) activo.setAttribute('aria-current', 'location');
    });
  }, {rootMargin:'-45% 0px -50% 0px'});

  ['top', 'problema', 'como-funciona', 'para-quien', 'preguntas', 'form'].forEach(function(id){
    var seccion = document.getElementById(id);
    if(seccion) spy.observe(seccion);
  });
})();

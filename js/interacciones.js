// Micro-interacciones de la landing: aparición al hacer scroll y CTA fijo en móvil.
(function(){
  if(!('IntersectionObserver' in window)) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Aparición de bloques al entrar en pantalla ---
  var revealEls = document.querySelectorAll('.reveal');
  if(!reduceMotion && revealEls.length){
    document.documentElement.classList.add('js-reveal');
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  }

  // --- CTA fijo abajo en móvil ---
  // Aparece cuando el botón del hero sale de pantalla y se oculta al llegar al formulario.
  var sticky = document.getElementById('sticky-cta');
  var heroCta = document.getElementById('hero-cta');
  var formSection = document.getElementById('form');
  if(!sticky || !heroCta || !formSection) return;

  var heroVisible = true;
  var formVisible = false;

  function actualizarSticky(){
    var mostrar = !heroVisible && !formVisible;
    sticky.classList.toggle('is-visible', mostrar);
    if(mostrar){
      sticky.removeAttribute('inert');
    } else {
      sticky.setAttribute('inert', '');
    }
  }

  new IntersectionObserver(function(entries){
    heroVisible = entries[entries.length - 1].isIntersecting;
    actualizarSticky();
  }).observe(heroCta);

  new IntersectionObserver(function(entries){
    formVisible = entries[entries.length - 1].isIntersecting;
    actualizarSticky();
  }).observe(formSection);
})();

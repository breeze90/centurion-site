(function () {
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  var nav = document.querySelector('.nav');
  var cta = document.querySelector('.header .btn-brass');

  [].forEach.call(nav.children, function (a) {
    panel.appendChild(a.cloneNode(true));
  });
  if (cta) panel.appendChild(cta.cloneNode(true));

  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  panel.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

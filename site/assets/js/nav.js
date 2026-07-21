(function () {
  if (sessionStorage.getItem('entrySource') !== null) return;
  var pageParams = new URLSearchParams(location.search);
  var hasRealTracking = pageParams.has('utm_source') || pageParams.has('yclid') || pageParams.has('gclid');
  var engine = '';
  if (!hasRealTracking) {
    try {
      var refHost = new URL(document.referrer).hostname;
      if (/(^|\.)yandex\./i.test(refHost)) engine = 'yandex';
      else if (/(^|\.)google\./i.test(refHost)) engine = 'google';
    } catch (e) {}
  }
  sessionStorage.setItem('entrySource', engine);
  sessionStorage.setItem('entryPage', location.hostname + location.pathname);
})();

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

(function () {
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  var nav = document.querySelector('.nav');
  var cta = document.querySelector('.header .btn-brass');
  if (!nav) return;

  panel.innerHTML = '';
  [].forEach.call(nav.children, function (item) {
    if (item.classList.contains('nav-item')) {
      var menuLink = item.querySelector('.nav-dropdown a').cloneNode(true);
      menuLink.textContent = item.querySelector('.nav-trigger').textContent.trim();
      panel.appendChild(menuLink);
      return;
    }
    if (item.tagName === 'A') {
      panel.appendChild(item.cloneNode(true));
    }
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

  function closeDropdowns(except) {
    [].forEach.call(nav.querySelectorAll('.nav-item'), function (item) {
      if (item === except) return;
      item.classList.remove('is-open');
      item.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
    });
  }

  [].forEach.call(nav.querySelectorAll('.nav-trigger'), function (trigger) {
    trigger.addEventListener('click', function () {
      var item = trigger.closest('.nav-item');
      var open = !item.classList.contains('is-open');
      closeDropdowns(item);
      item.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) closeDropdowns();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeDropdowns();
  });
})();

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
      var trigger = item.querySelector('.nav-trigger');
      var menuLink = document.createElement('a');
      menuLink.href = trigger.dataset.href;
      menuLink.textContent = trigger.textContent.trim();
      if (trigger.getAttribute('aria-current') === 'page') {
        menuLink.setAttribute('aria-current', 'page');
      }
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
      if (item.classList.contains('is-open')) {
        window.location.href = trigger.dataset.href;
        return;
      }
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

(function () {
  var modal = document.getElementById('lead-modal');
  if (!modal) return;
  var frame = modal.querySelector('.matomba-frame');
  var openers = document.querySelectorAll('[data-open-modal="lead-modal"]');
  var lastFocused = null;

  function buildTaggedUrl(baseUrl) {
    var url = new URL(baseUrl);
    var engine = sessionStorage.getItem('entrySource');
    if (engine) {
      var entryPage = sessionStorage.getItem('entryPage') || (location.hostname + location.pathname);
      url.searchParams.set('utm_source', engine);
      url.searchParams.set('utm_medium', 'organic');
      url.searchParams.set('utm_campaign', engine + '_seo');
      url.searchParams.set('utm_content', 'source:' + entryPage);
      url.searchParams.set('utm_term', 'seo');
    }
    return url.toString();
  }

  function openModal(event) {
    if (event) event.preventDefault();
    if (!frame.src) frame.src = buildTaggedUrl(frame.dataset.src);
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  [].forEach.call(openers, function (btn) {
    btn.addEventListener('click', openModal);
  });

  [].forEach.call(modal.querySelectorAll('[data-modal-close]'), function (el) {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
})();

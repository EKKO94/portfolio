/* AI Trainer only: image links remain usable without this enhancement. */
(function () {
  "use strict";

  var links = document.querySelectorAll("a[data-trainer-image]");
  var dialog = document.createElement("dialog");
  if (!links.length || typeof dialog.showModal !== "function") return;

  dialog.className = "trainer-viewer";
  dialog.setAttribute("aria-labelledby", "trainer-viewer-title");
  dialog.setAttribute("aria-describedby", "trainer-viewer-caption");
  dialog.innerHTML =
    '<header class="trainer-viewer__header">' +
      '<h2 class="trainer-viewer__title" id="trainer-viewer-title">AI Trainer image detail</h2>' +
      '<button class="trainer-viewer__close" type="button" autofocus>Close</button>' +
    '</header>' +
    '<figure class="trainer-viewer__figure">' +
      '<div class="trainer-viewer__stage" tabindex="0" role="region" aria-label="Image detail; scroll to explore when zoomed">' +
        '<img class="trainer-viewer__image" alt="" hidden>' +
      '</div>' +
      '<figcaption class="trainer-viewer__caption" id="trainer-viewer-caption"></figcaption>' +
    '</figure>' +
    '<footer class="trainer-viewer__bar">' +
      '<button class="trainer-viewer__fit" type="button" aria-pressed="true">Fit to window</button>' +
      '<button class="trainer-viewer__zoom" type="button" aria-pressed="false">Actual size</button>' +
      '<a class="trainer-viewer__original" target="_blank" rel="noopener">Open original image</a>' +
    '</footer>' +
    '<p class="trainer-viewer__status" role="status" aria-live="polite"></p>';
  document.body.appendChild(dialog);

  var image = dialog.querySelector("img");
  var stage = dialog.querySelector(".trainer-viewer__stage");
  var caption = dialog.querySelector("figcaption");
  var status = dialog.querySelector(".trainer-viewer__status");
  var close = dialog.querySelector(".trainer-viewer__close");
  var fit = dialog.querySelector(".trainer-viewer__fit");
  var zoom = dialog.querySelector(".trainer-viewer__zoom");
  var original = dialog.querySelector(".trainer-viewer__original");
  var opener = null;
  var scrollLock = null;
  var ready = false;
  var properties = ["position", "top", "left", "width", "overflow", "padding-right"];

  function lockPage() {
    var body = document.body;
    var gap = window.innerWidth - document.documentElement.clientWidth;
    var padding = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    scrollLock = { x: window.scrollX, y: window.scrollY, styles: {} };
    properties.forEach(function (property) {
      scrollLock.styles[property] = [body.style.getPropertyValue(property), body.style.getPropertyPriority(property)];
    });
    body.style.position = "fixed";
    body.style.top = -scrollLock.y + "px";
    body.style.left = -scrollLock.x + "px";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.paddingRight = padding + gap + "px";
  }

  function unlockPage() {
    if (!scrollLock) return;
    var root = document.documentElement;
    var behavior = [root.style.getPropertyValue("scroll-behavior"), root.style.getPropertyPriority("scroll-behavior")];
    properties.forEach(function (property) {
      var saved = scrollLock.styles[property];
      document.body.style.setProperty(property, saved[0], saved[1]);
    });
    root.style.setProperty("scroll-behavior", "auto", "important");
    window.scrollTo(scrollLock.x, scrollLock.y);
    root.style.setProperty("scroll-behavior", behavior[0], behavior[1]);
    scrollLock = null;
  }

  function setZoom(zoomed) {
    dialog.classList.toggle("is-zoomed", zoomed);
    fit.setAttribute("aria-pressed", String(!zoomed));
    zoom.setAttribute("aria-pressed", String(zoomed));
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    if (ready) {
      status.textContent = image.naturalWidth + " × " + image.naturalHeight + " pixels. " +
        (zoomed ? "Actual size. Scroll the image area to explore." : "Fit to window.");
    }
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute("download")) return;
      var thumbnail = link.querySelector("img");
      if (!thumbnail || !link.href) return;
      try { dialog.showModal(); } catch (error) { return; }
      event.preventDefault();
      opener = link;
      lockPage();
      ready = false;
      image.hidden = true;
      image.alt = thumbnail.alt;
      fit.disabled = true;
      zoom.disabled = true;
      setZoom(false);
      var figure = link.closest("figure");
      var sourceCaption = figure && figure.querySelector("figcaption");
      caption.textContent = link.dataset.caption || (sourceCaption && sourceCaption.textContent.trim()) || thumbnail.alt;
      original.href = link.href;
      status.textContent = "Loading full-resolution image…";
      dialog.classList.add("is-loading");
      image.onload = function () {
        ready = true;
        image.width = image.naturalWidth;
        image.height = image.naturalHeight;
        image.hidden = false;
        fit.disabled = false;
        zoom.disabled = false;
        dialog.classList.remove("is-loading");
        setZoom(false);
      };
      image.onerror = function () {
        dialog.classList.remove("is-loading");
        status.textContent = "This image could not load. Use Open original image to view the source.";
      };
      image.src = link.href;
      close.focus({ preventScroll: true });
    });
  });

  close.addEventListener("click", function () { dialog.close(); });
  fit.addEventListener("click", function () { setZoom(false); });
  zoom.addEventListener("click", function () { setZoom(true); });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", function () {
    image.onload = null;
    image.onerror = null;
    image.removeAttribute("src");
    image.hidden = true;
    ready = false;
    unlockPage();
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
})();

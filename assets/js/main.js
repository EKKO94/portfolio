/* Reveal-on-scroll. Content stays visible without JS or with reduced motion. */
(function () {
  var items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  items.forEach(function (el) { io.observe(el); });
})();

/* Case studies: section progress and image lightbox. */
(function () {
  if (!document.body.classList.contains("case")) return;

  var secs = Array.prototype.slice.call(document.querySelectorAll("section[data-nav]"));
  if (secs.length && "IntersectionObserver" in window) {
    var nav = document.createElement("nav");
    nav.className = "progress";
    nav.setAttribute("aria-label", "Sections");
    var links = secs.map(function (s) {
      var a = document.createElement("a");
      a.href = "#" + (s.getAttribute("aria-labelledby") || s.id || (s.id = "sec-" + s.dataset.nav.toLowerCase()));
      a.innerHTML = "<span></span>";
      a.firstChild.textContent = s.dataset.nav;
      a.setAttribute("aria-label", s.dataset.nav);
      nav.appendChild(a);
      return a;
    });
    document.body.appendChild(nav);
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = secs.indexOf(e.target);
        links.forEach(function (l, j) { if (j === i) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
      });
    }, { rootMargin: "-" + Math.round(window.innerHeight * 0.4) + "px 0px -" + Math.round(window.innerHeight * 0.55) + "px 0px" });
    secs.forEach(function (s) { io2.observe(s); });
  }

  var dlg = document.createElement("dialog");
  if (typeof dlg.showModal !== "function") return;
  dlg.className = "viewer";
  dlg.setAttribute("aria-label", "Image viewer");
  var X = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var L = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var R = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  dlg.innerHTML = '<button class="viewer__btn viewer__close" type="button" aria-label="Close">' + X + '</button>' +
    '<p class="viewer__count" aria-hidden="true"></p>' +
    '<div class="viewer__stage"><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="></div>' +
    '<div class="viewer__bar"><button class="viewer__btn viewer__prev" type="button" aria-label="Previous image">' + L + '</button>' +
    '<button class="viewer__zoom" type="button">Click to zoom</button>' +
    '<button class="viewer__btn viewer__next" type="button" aria-label="Next image">' + R + '</button></div>' +
    '<p class="visually-hidden viewer__alt" aria-live="polite"></p>';
  document.body.appendChild(dlg);
  var big = dlg.querySelector("img"), capAlt = dlg.querySelector(".viewer__alt"), capCount = dlg.querySelector(".viewer__count"), zoomBtn = dlg.querySelector(".viewer__zoom");
  var prev = dlg.querySelector(".viewer__prev"), next = dlg.querySelector(".viewer__next");
  var items = [], index = 0, last = null;
  function show(i) {
    index = (i + items.length) % items.length;
    var img = items[index].tagName === "IMG" ? items[index] : items[index].querySelector("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    capAlt.textContent = img.alt;
    capCount.textContent = (index + 1) + " / " + items.length;
    dlg.classList.remove("is-zoomed");
    zoomBtn.textContent = "Click to zoom";
    last = items[index];
  }
  document.querySelectorAll(".shot, .fig-full img, .model img, .fig-white img, .browser__body img").forEach(function (shot) {
    if (shot.closest(".hero-fig, .hero-stage")) return;
    var pic = shot.tagName === "IMG" ? shot : shot.querySelector("img");
    items.push(shot);
    shot.setAttribute("data-zoom", "");
    shot.setAttribute("role", "button");
    shot.setAttribute("tabindex", "0");
    shot.setAttribute("aria-label", "View image: " + (pic.alt || ""));
    var idx = items.length - 1;
    shot.addEventListener("click", function () { show(idx); dlg.showModal(); });
    shot.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(idx); dlg.showModal(); }
    });
  });
  if (!items.length) return;
  if (items.length < 2) { prev.hidden = true; next.hidden = true; capCount.hidden = true; }
  function toggleZoom() { dlg.classList.toggle("is-zoomed"); zoomBtn.textContent = dlg.classList.contains("is-zoomed") ? "Click to fit" : "Click to zoom"; }
  zoomBtn.addEventListener("click", toggleZoom);
  dlg.querySelector(".viewer__close").addEventListener("click", function () { dlg.close(); });
  prev.addEventListener("click", function () { show(index - 1); });
  next.addEventListener("click", function () { show(index + 1); });
  big.addEventListener("click", toggleZoom);
  dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.classList.contains("viewer__stage")) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (items.length < 2) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
  });
  dlg.addEventListener("close", function () { if (last) last.focus(); });
})();
window.__revealReady = true;
document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  var p = document.querySelector(".progress");
  if (p) { p.classList.add("is-dismissed"); setTimeout(function () { p.classList.remove("is-dismissed"); }, 2000); }
});

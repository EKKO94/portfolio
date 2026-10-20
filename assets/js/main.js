/* Reveal-on-scroll. Content stays visible without JS or with reduced motion. */
window.__revealReady = true;
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
  dlg.className = "lightbox";
  dlg.setAttribute("aria-label", "Image preview");
  dlg.innerHTML = '<img alt=""><button class="lightbox__close" type="button">Close</button>';
  document.body.appendChild(dlg);
  var big = dlg.querySelector("img"), last = null;
  function open(shot) {
    var img = shot.tagName === "IMG" ? shot : shot.querySelector("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    last = shot;
    dlg.showModal();
  }
  document.querySelectorAll(".shot, .fig-full img, .model img, .fig-white img, .browser__body img").forEach(function (shot) {
    var pic = shot.tagName === "IMG" ? shot : shot.querySelector("img");
    shot.setAttribute("data-zoom", "");
    shot.setAttribute("role", "button");
    shot.setAttribute("tabindex", "0");
    shot.setAttribute("aria-label", "Enlarge image: " + (pic.alt || ""));
    shot.addEventListener("click", function () { open(shot); });
    shot.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(shot); }
    });
  });
  dlg.querySelector(".lightbox__close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () { if (last) last.focus(); });
})();

/* Walkthrough videos: muted loop that plays while visible, with a pause control. */
(function () {
  var videos = document.querySelectorAll(".video__el");
  if (!videos.length) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  videos.forEach(function (v) {
    var btn = v.parentNode.querySelector(".video__toggle");
    var userPaused = reduce;
    function setLabel() {
      var playing = !v.paused;
      btn.textContent = playing ? "Pause" : "Play";
      btn.setAttribute("aria-pressed", playing ? "false" : "true");
      btn.setAttribute("aria-label", (playing ? "Pause" : "Play") + " video");
    }
    function play() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    setLabel();
    v.addEventListener("play", setLabel);
    v.addEventListener("pause", setLabel);
    btn.addEventListener("click", function () {
      if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); }
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !userPaused) play(); else if (!e.isIntersecting) v.pause();
        });
      }, { threshold: 0.4 }).observe(v);
    }
  });
})();

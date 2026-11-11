/* v2 interactions: progress bar, tilt, magnetic primary buttons, count-up, scroll-through frames,
   before/after slider. Everything is optional: without JS the page reads normally. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* Hero headline: words enter one by one (home only, motion allowed). Text stays one heading for readers. */
  (function () {
    var h = document.querySelector("h1.hero__statement");
    if (!h || reduce) return;
    var n = 0;
    function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
            var s = document.createElement("span");
            s.className = "hw"; s.style.setProperty("--w", n++); s.textContent = t;
            frag.appendChild(s);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) {
          if (c.hasAttribute("data-roll")) { /* has its own letter roll-in */ }
          else wrap(c);
        }
      });
    }
    wrap(h);
    h.classList.add("is-words");
  })();

  /* Scroll progress */
  var bar = document.createElement("div");
  bar.className = "v2-progress"; bar.setAttribute("aria-hidden", "true");
  bar.innerHTML = "<i></i>";
  document.body.appendChild(bar);
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--p", h > 0 ? Math.min(1, window.scrollY / h).toFixed(4) : 0);
      frames.forEach(updateFrame);
      ticking = false;
    });
  }

  /* Scroll-through frames for long screens */
  var frames = [];
  document.querySelectorAll(".scrollframe").forEach(function (f) {
    var vp = f.querySelector(".scrollframe__vp"), img = vp && vp.querySelector("img");
    if (!vp || !img) return;
    var meter = f.querySelector(".scrollframe__meter i");
    if (!reduce) f.classList.add("scrollframe--animated");
    // Keyboard readers keep control of the native scroll position.
    vp.addEventListener("focusin", function () {
      f.classList.remove("scrollframe--animated");
      img.style.transform = "";
    });
    frames.push({ f: f, vp: vp, img: img, meter: meter });
  });
  function updateFrame(o) {
    if (!o.f.classList.contains("scrollframe--animated") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var r = o.vp.getBoundingClientRect(), vh = window.innerHeight;
    var travel = o.img.offsetHeight - o.vp.clientHeight;
    if (travel <= 0) return;
    // progress 0 when the frame enters the lower third, 1 when it leaves the upper third
    var start = vh * 0.85, end = vh * 0.15 - r.height;
    var p = (start - r.top) / (start - end);
    p = Math.max(0, Math.min(1, p));
    o.img.style.transform = "translate3d(0," + (-travel * p).toFixed(1) + "px,0)";
    if (o.meter) {
      var share = o.vp.clientHeight / o.img.offsetHeight;
      o.meter.style.setProperty("--h", (share * 100).toFixed(1) + "%");
      o.meter.style.setProperty("--y", ((1 / share - 1) * p * 100).toFixed(1) + "%");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  frames.forEach(function (o) { o.img.addEventListener("load", onScroll); });
  onScroll();

  /* Tilt on hero mockups (fine pointer only) */
  if (!reduce && fine) {
    document.querySelectorAll(".tilt").forEach(function (el) {
      var host = el.closest(".hero-stage, .hero-visual, .cover") || el;
      host.addEventListener("pointermove", function (e) {
        var r = host.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", (x * 5).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-y * 4).toFixed(2) + "deg");
      });
      host.addEventListener("pointerleave", function () { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
    });
    /* Magnetic: primary buttons only, a few pixels */
    document.querySelectorAll(".btn--primary").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
        b.style.transform = "translate(" + (x * 6).toFixed(1) + "px," + (y * 5).toFixed(1) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }


  /* Lens: hover a dense screenshot to read it at 2.4x (fine pointers only) */
  if (fine) {
    document.querySelectorAll(".case .shot img").forEach(function (img) {
      var shot = img.closest(".shot");
      if (!shot || shot.closest(".hero-fig, .hero-stage, .scrollframe, .annotated")) return;
      var lens = document.createElement("span");
      lens.className = "lens"; lens.setAttribute("aria-hidden", "true");
      shot.appendChild(lens);
      var S = 168, off = false;
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") { off = true; lens.style.opacity = 0; } });
      shot.addEventListener("pointermove", function (e) {
        if (off) return;
        var r = img.getBoundingClientRect(), sr = shot.getBoundingClientRect();
        if (!img.naturalWidth || document.querySelector(".viewer[open]")) { lens.style.opacity = 0; return; }
        // Drawn image box, for both object-fit: contain and cover.
        var nw = img.naturalWidth, nh = img.naturalHeight;
        var cover = getComputedStyle(img).objectFit === "cover";
        var sc = cover ? Math.max(r.width / nw, r.height / nh) : Math.min(r.width / nw, r.height / nh);
        var dw = nw * sc, dh = nh * sc;
        var ox = r.left + (r.width - dw) / 2, oy = r.top + (r.height - dh) / 2;
        var x = e.clientX - ox, y = e.clientY - oy;
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { lens.style.opacity = 0; return; }
        // Low-resolution sources get a gentler zoom so they stay legible.
        var Z = nw >= 1100 ? 2.4 : (nw >= 700 ? 2 : 1.7);
        lens.style.opacity = 1;
        lens.style.left = (e.clientX - sr.left - S / 2) + "px";
        lens.style.top = (e.clientY - sr.top - S / 2) + "px";
        lens.style.backgroundImage = "url(" + (img.currentSrc || img.src) + ")";
        lens.style.backgroundSize = (dw * Z) + "px " + (dh * Z) + "px";
        lens.style.backgroundPosition = (-(x * Z - S / 2)) + "px " + (-(y * Z - S / 2)) + "px";
      });
      shot.addEventListener("pointerleave", function () { lens.style.opacity = 0; off = false; });
    });
  }


  /* Annotated screens: pin <-> note highlight */
  document.querySelectorAll(".annotated").forEach(function (f) {
    f.querySelectorAll(".pin").forEach(function (p, i) { p.style.setProperty("--n", i); });
    function set(n, on) { f.querySelectorAll('[data-n="' + n + '"]').forEach(function (e) { e.classList.toggle("is-active", on); }); }
    f.querySelectorAll("[data-n]").forEach(function (e) {
      e.addEventListener("pointerenter", function () { set(e.getAttribute("data-n"), true); });
      e.addEventListener("pointerleave", function () { set(e.getAttribute("data-n"), false); });
    });
  });

  /* Count-up for real figures, once, when visible */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = parseFloat(el.getAttribute("data-count")), start = performance.now(), dur = 1100;
        if (reduce) { el.textContent = to; return; }
        (function tick(now) {
          var t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(to * e);
          if (t < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  }


  /* Rolling accent phrase: letters roll up and are replaced, on a slow loop.
     Only one phrase exists in the DOM at a time; the reserved width comes from a CSS pseudo-element. */
  document.querySelectorAll("[data-roll]").forEach(function (el) {
    var phrases = el.getAttribute("data-roll").split("|");
    if (phrases.length < 2) return;
    var first = el.textContent;
    el.textContent = "";
    var sr = document.createElement("span");
    sr.className = "visually-hidden"; sr.textContent = phrases.map(function (p) { return p.replace(/\.$/, ""); }).join(", ") + ".";
    var stack = document.createElement("span");
    stack.className = "roll__stack"; stack.setAttribute("aria-hidden", "true");
    // widest phrase decides the reserved width
    // Measured again once the web fonts are loaded, so the reserved width matches what is drawn.
    function size() {
      var cv = document.createElement("canvas").getContext("2d"), cs = getComputedStyle(el);
      cv.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
      var widest = phrases.reduce(function (a, p) { return cv.measureText(p).width > cv.measureText(a).width ? p : a; }, phrases[0]);
      stack.setAttribute("data-sizer", widest);
    }
    size();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);
    window.addEventListener("resize", size);
    function build(p, on) {
      var s = document.createElement("span");
      s.className = "roll__p" + (on ? " is-on" : "");
      p.split("").forEach(function (ch, k) {
        var l = document.createElement("span");
        l.className = "roll__c"; l.style.setProperty("--k", k);
        l.textContent = ch === " " ? "\u00a0" : ch;
        s.appendChild(l);
      });
      return s;
    }
    var cur = 0, node = build(phrases[0], true);
    stack.appendChild(node);
    el.appendChild(sr); el.appendChild(stack);
    if (reduce || window.matchMedia("(max-width: 480px)").matches) return;
    var timer = null, visible = true;
    function next() {
      if (!visible || document.hidden) return;
      var out = node; cur = (cur + 1) % phrases.length;
      node = build(phrases[cur], false); stack.appendChild(node);
      void node.offsetWidth;
      out.classList.remove("is-on"); out.classList.add("is-out");
      node.classList.add("is-on");
      setTimeout(function () { if (out.parentNode) out.parentNode.removeChild(out); }, 1100);
    }
    var paused = false;
    function start() { if (!timer && !paused) timer = setInterval(next, 3600); }
    function stop() { clearInterval(timer); timer = null; }
    // WCAG 2.2.2: a visible control to pause the rotating words.
    var cta = document.querySelector(".hero__cta");
    if (cta) {
      var pb = document.createElement("button");
      pb.type = "button"; pb.className = "roll__pause";
      pb.setAttribute("aria-pressed", "false"); pb.setAttribute("aria-label", "Pause rotating words");
      pb.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
      pb.addEventListener("click", function () {
        paused = !paused;
        pb.setAttribute("aria-pressed", paused ? "true" : "false");
        pb.setAttribute("aria-label", paused ? "Resume rotating words" : "Pause rotating words");
        pb.innerHTML = paused
          ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>'
          : '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
        if (paused) stop(); else start();
      });
      cta.appendChild(pb);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.2 }).observe(el);
    }
    el.addEventListener("pointerenter", stop); el.addEventListener("pointerleave", start);
    el.addEventListener("focusin", stop); el.addEventListener("focusout", start);
    setTimeout(start, 2600);
  });

  /* Before / after slider */
  document.querySelectorAll(".compare").forEach(function (c) {
    var range = c.querySelector(".compare__range");
    if (!range) return;
    function set() {
      c.style.setProperty("--pos", range.value + "%");
      range.setAttribute("aria-valuetext", range.value + "% in the product; " + (100 - Number(range.value)) + "% redesign proposal");
    }
    range.addEventListener("input", set); set();
    range.disabled = false;
  });
})();

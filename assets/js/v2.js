/* v2 interactions: progress bar, tilt, magnetic primary buttons, count-up, scroll-through frames,
   before/after slider. Everything is optional: without JS the page reads normally. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

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
    frames.push({ f: f, vp: vp, img: img, meter: meter });
  });
  function updateFrame(o) {
    if (reduce) return;
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
      if (!shot || shot.closest(".hero-fig, .hero-stage, .scrollframe")) return;
      var lens = document.createElement("span");
      lens.className = "lens"; lens.setAttribute("aria-hidden", "true");
      shot.appendChild(lens);
      var Z = 2.4, S = 168;
      shot.addEventListener("pointermove", function (e) {
        var r = img.getBoundingClientRect(), sr = shot.getBoundingClientRect();
        var nw = img.naturalWidth || r.width;
        if (nw < 900 || document.querySelector(".viewer[open]")) { lens.style.opacity = 0; return; }
        // object-fit: contain -> compute the drawn image box
        var ar = img.naturalWidth / img.naturalHeight, dw = r.width, dh = r.height;
        if (dw / dh > ar) dw = dh * ar; else dh = dw / ar;
        var ox = r.left + (r.width - dw) / 2, oy = r.top + (r.height - dh) / 2;
        var x = e.clientX - ox, y = e.clientY - oy;
        if (x < 0 || y < 0 || x > dw || y > dh) { lens.style.opacity = 0; return; }
        lens.style.opacity = 1;
        lens.style.left = (e.clientX - sr.left - S / 2) + "px";
        lens.style.top = (e.clientY - sr.top - S / 2) + "px";
        lens.style.backgroundImage = "url(" + (img.currentSrc || img.src) + ")";
        lens.style.backgroundSize = (dw * Z) + "px " + (dh * Z) + "px";
        lens.style.backgroundPosition = (-(x * Z - S / 2)) + "px " + (-(y * Z - S / 2)) + "px";
      });
      shot.addEventListener("pointerleave", function () { lens.style.opacity = 0; });
    });
  }

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

  /* Before / after slider */
  document.querySelectorAll(".compare").forEach(function (c) {
    var range = c.querySelector(".compare__range");
    if (!range) return;
    function set() { c.style.setProperty("--pos", range.value + "%"); }
    range.addEventListener("input", set); set();
  });
})();

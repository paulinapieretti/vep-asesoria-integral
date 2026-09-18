(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Menú móvil
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Año en el footer
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header con sombra al scrollear (sin listeners de scroll: sentinel + IntersectionObserver)
  var header = document.getElementById("siteHeader");
  var sentinel = document.getElementById("topSentinel");
  if (header && sentinel && "IntersectionObserver" in window) {
    var headerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          header.classList.toggle("is-scrolled", !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    headerObserver.observe(sentinel);
  }

  // Stagger: asigna un delay creciente a los .reveal agrupados por contenedor
  var groups = document.querySelectorAll(
    ".bento, .gallery, .steps, .venc-grid, .team-grid, .dif-grid, .stats-grid"
  );
  groups.forEach(function (group) {
    var items = group.querySelectorAll(":scope > .reveal");
    items.forEach(function (item, i) {
      item.style.setProperty("--d", Math.min(i * 70, 280) + "ms");
    });
  });

  // Revelado suave al hacer scroll
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Conteo animado de estadísticas
  var counters = document.querySelectorAll(".stat-num[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    var start = null;
    var duration = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) {
        countObserver.observe(el);
      });
    }
  }

  // Tilt sutil en la foto del hero y en la galería (solo con mouse, no en touch)
  var supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (supportsHover && !reduceMotion) {
    var tiltFrame = document.getElementById("tiltFrame");
    if (tiltFrame) {
      tiltFrame.addEventListener("pointermove", function (e) {
        var rect = tiltFrame.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        tiltFrame.style.setProperty("--tx", (px * 6).toFixed(2));
        tiltFrame.style.setProperty("--ty", (py * 6).toFixed(2));
      });
      tiltFrame.addEventListener("pointerleave", function () {
        tiltFrame.style.setProperty("--tx", 0);
        tiltFrame.style.setProperty("--ty", 0);
      });
    }
  }
})();

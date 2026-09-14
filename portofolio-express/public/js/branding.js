```javascript
(function () {
  "use strict";

  /*
   * ============================================================
   * JOKER UI/UX — BRANDING PAGE SCRIPT
   * ============================================================
   * Este arquivo contém APENAS JavaScript.
   *
   * IMPORTANTE:
   * O HTML do Lightbox NÃO deve ficar neste arquivo.
   * O bloco:
   *
   * <div class="image-lightbox">...</div>
   *
   * deve estar no arquivo HTML/EJS da página.
   * ============================================================
   */

  /* ============================================================
   * CONFIGURAÇÕES GERAIS
   * ============================================================ */

  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const reduceMotion = reduceMotionQuery.matches;

  const SELECTORS = {
    reveal: ".reveal",
    cursorGlow: "#cursorGlow",
    ambient: ".ambient",
    tilt: "[data-tilt]",
    decor: ".decor",
    phone: ".phone",
    postMediaImages: ".post-media img",
    post: ".post",
    lightbox: "#imageLightbox",
    lightboxImage: "#lightboxImage",
    lightboxCaption: "#lightboxCaption",
    lightboxClose: "#lightboxClose",
    lightboxPrev: "#lightboxPrev",
    lightboxNext: "#lightboxNext",
    lightboxStage: "#lightboxStage",
    socialMini: ".social-mini span",
    whatsapp: "[data-whatsapp], #whatsappButton, .whatsapp-button",
    backgroundVideo: ".bg-video"
  };

  const WHATSAPP_NUMBER = "244927825820";

  const WHATSAPP_MESSAGE =
    "Olá, Joker UI/UX! Gostaria de saber mais sobre os serviços de design.";

  /* ============================================================
   * HELPERS
   * ============================================================ */

  function $(selector, root) {
    const scope = root || document;
    return scope.querySelector(selector);
  }

  function $$(selector, root) {
    const scope = root || document;
    return Array.from(scope.querySelectorAll(selector));
  }

  function isElement(element) {
    return element instanceof Element;
  }

  function safeFocus(element) {
    if (!isElement(element)) {
      return;
    }

    try {
      element.focus({
        preventScroll: true
      });
    } catch (error) {
      element.focus();
    }
  }

  function openExternalUrl(url) {
    if (!url) {
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  /* ============================================================
   * REVEAL ON SCROLL
   * ============================================================ */

  function initializeRevealAnimations() {
    const revealItems = $$(SELECTORS.reveal);

    if (!revealItems.length) {
      return;
    }

    if (
      "IntersectionObserver" in window &&
      !reduceMotion
    ) {
      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");

            obs.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -30px 0px"
        }
      );

      revealItems.forEach(function (element) {
        observer.observe(element);
      });

      return;
    }

    revealItems.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  /* ============================================================
   * CURSOR GLOW
   * ============================================================ */

  function initializeCursorGlow() {
    const cursorGlow = $(SELECTORS.cursorGlow);

    if (!cursorGlow || reduceMotion) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener(
      "pointermove",
      function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
      },
      {
        passive: true
      }
    );

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";

      window.requestAnimationFrame(animateGlow);
    }

    window.requestAnimationFrame(animateGlow);
  }

  /* ============================================================
   * AMBIENT PARALLAX
   * ============================================================ */

  function initializeAmbientParallax() {
    const ambients = $$(SELECTORS.ambient);

    if (!ambients.length || reduceMotion) {
      return;
    }

    window.addEventListener(
      "pointermove",
      function (event) {
        const x =
          event.clientX / window.innerWidth - 0.5;

        const y =
          event.clientY / window.innerHeight - 0.5;

        ambients.forEach(function (element, index) {
          const strength = (index + 1) * 8;

          element.style.transform =
            "translate(" +
            x * strength +
            "px, " +
            y * strength +
            "px)";
        });
      },
      {
        passive: true
      }
    );
  }

  /* ============================================================
   * 3D CARD TILT
   * ============================================================ */

  function initializeCardTilt() {
    const cards = $$(SELECTORS.tilt);

    if (!cards.length) {
      return;
    }

    cards.forEach(function (card) {
      if (!isElement(card)) {
        return;
      }

      card.addEventListener(
        "pointermove",
        function (event) {
          if (
            reduceMotion ||
            window.innerWidth < 700
          ) {
            return;
          }

          const rect = card.getBoundingClientRect();

          if (
            rect.width <= 0 ||
            rect.height <= 0
          ) {
            return;
          }

          const px =
            (event.clientX - rect.left) /
            rect.width;

          const py =
            (event.clientY - rect.top) /
            rect.height;

          const rotateX =
            (0.5 - py) * 4;

          const rotateY =
            (px - 0.5) * 5;

          const isElevatedCard =
            card.matches(
              ":nth-child(2), :nth-child(5)"
            );

          const baseY =
            isElevatedCard ? 20 : 0;

          card.style.transform =
            "translateY(" +
            (baseY - 2) +
            "px) rotateX(" +
            rotateX +
            "deg) rotateY(" +
            rotateY +
            "deg)";
        },
        {
          passive: true
        }
      );

      card.addEventListener(
        "pointerleave",
        function () {
          const isElevatedCard =
            card.matches(
              ":nth-child(2), :nth-child(5)"
            );

          const baseY =
            isElevatedCard ? 20 : 0;

          card.style.transform =
            "translateY(" +
            baseY +
            "px)";
        },
        {
          passive: true
        }
      );
    });
  }

  /* ============================================================
   * SCROLL DECORATIONS
   * ============================================================ */

  function initializeScrollDecorations() {
    const decorElements = $$(SELECTORS.decor);

    if (!decorElements.length) {
      return;
    }

    let ticking = false;

    function updateDecorations() {
      const scrollY = window.scrollY || 0;

      decorElements.forEach(function (element, index) {
        if (reduceMotion) {
          return;
        }

        const factors = [
          0.05,
          0.035,
          0.025
        ];

        const factor =
          factors[index] || 0.03;

        /*
         * Usamos transform em vez de style.translate
         * para melhor compatibilidade entre navegadores.
         */
        element.style.transform =
          "translate3d(0, " +
          scrollY * factor +
          "px, 0)";
      });

      ticking = false;
    }

    function onScroll() {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(
        updateDecorations
      );
    }

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true
      }
    );

    updateDecorations();
  }

  /* ============================================================
   * PHONE / WHATSAPP
   * ============================================================ */

  function initializePhoneButton() {
    const phone = $(SELECTORS.phone);

    if (!phone) {
      return;
    }

    phone.style.cursor = "pointer";
    phone.title = "Abrir WhatsApp";

    phone.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        const url =
          "https://wa.me/" +
          WHATSAPP_NUMBER;

        openExternalUrl(url);
      }
    );
  }

  /* ============================================================
   * IMAGE FALLBACK
   * ============================================================ */

  function initializeImageFallbacks() {
    const images =
      $$(SELECTORS.postMediaImages);

    if (!images.length) {
      return;
    }

    images.forEach(function (image) {
      image.addEventListener(
        "error",
        function () {
          image.style.display = "none";

          const parent =
            image.parentElement;

          if (!parent) {
            return;
          }

          parent.style.background =
            "radial-gradient(" +
            "circle at 55% 45%, " +
            "rgba(0,240,192,.35), " +
            "transparent 22%), " +
            "linear-gradient(" +
            "145deg, " +
            "#0b3a31, " +
            "#06110f 70%" +
            ")";
        },
        {
          once: true
        }
      );
    });
  }

  /* ============================================================
   * IMAGE LIGHTBOX
   * ============================================================ */

  function initializeLightbox() {
    const lightbox =
      $(SELECTORS.lightbox);

    const viewer =
      $(SELECTORS.lightboxImage);

    const caption =
      $(SELECTORS.lightboxCaption);

    const closeButton =
      $(SELECTORS.lightboxClose);

    const previousButton =
      $(SELECTORS.lightboxPrev);

    const nextButton =
      $(SELECTORS.lightboxNext);

    const stage =
      $(SELECTORS.lightboxStage);

    const images =
      $$(SELECTORS.postMediaImages);

    /*
     * O Lightbox é opcional.
     *
     * Se a página não tiver o HTML do Lightbox,
     * o restante do site continua funcionando normalmente.
     */
    if (!lightbox) {
      return;
    }

    if (!viewer) {
      return;
    }

    if (!caption) {
      return;
    }

    if (!closeButton) {
      return;
    }

    if (!previousButton) {
      return;
    }

    if (!nextButton) {
      return;
    }

    if (!stage) {
      return;
    }

    if (!images.length) {
      return;
    }

    let currentIndex = 0;

    function updateNavigationState() {
      const hasMultipleImages =
        images.length > 1;

      previousButton.disabled =
        !hasMultipleImages;

      nextButton.disabled =
        !hasMultipleImages;

      previousButton.setAttribute(
        "aria-hidden",
        hasMultipleImages
          ? "false"
          : "true"
      );

      nextButton.setAttribute(
        "aria-hidden",
        hasMultipleImages
          ? "false"
          : "true"
      );
    }

    function openImage(index) {
      if (!images.length) {
        return;
      }

      currentIndex =
        (index + images.length) %
        images.length;

      const source =
        images[currentIndex];

      if (!source) {
        return;
      }

      const sourceUrl =
        source.currentSrc ||
        source.src ||
        source.getAttribute("src");

      if (!sourceUrl) {
        return;
      }

      viewer.src = sourceUrl;

      viewer.alt =
        source.alt ||
        "Social Media Print — Joker UI/UX";

      caption.textContent =
        "Social Media Print · " +
        String(currentIndex + 1).padStart(
          2,
          "0"
        );

      lightbox.classList.add("open");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "lightbox-open"
      );

      updateNavigationState();

      safeFocus(closeButton);
    }

    function closeImage() {
      lightbox.classList.remove("open");

      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove(
        "lightbox-open"
      );

      window.setTimeout(
        function () {
          if (
            !lightbox.classList.contains(
              "open"
            )
          ) {
            viewer.removeAttribute("src");
          }
        },
        280
      );
    }

    function previousImage() {
      if (images.length <= 1) {
        return;
      }

      openImage(currentIndex - 1);
    }

    function nextImage() {
      if (images.length <= 1) {
        return;
      }

      openImage(currentIndex + 1);
    }

    /*
     * Clique diretamente na imagem.
     */
    images.forEach(function (image, index) {
      image.style.cursor = "zoom-in";

      image.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          event.stopPropagation();

          openImage(index);
        }
      );
    });

    /*
     * Clique no card inteiro.
     */
    const posts =
      $$(SELECTORS.post);

    posts.forEach(function (card, index) {
      card.addEventListener(
        "click",
        function (event) {
          if (
            event.target.closest(
              "a, button, input, textarea, select"
            )
          ) {
            return;
          }

          if (index >= images.length) {
            return;
          }

          openImage(index);
        }
      );
    });

    closeButton.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        closeImage();
      }
    );

    previousButton.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        previousImage();
      }
    );

    nextButton.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        nextImage();
      }
    );

    /*
     * Clique no fundo do Lightbox.
     */
    lightbox.addEventListener(
      "click",
      function (event) {
        if (
          event.target === lightbox
        ) {
          closeImage();
        }
      }
    );

    /*
     * Clique no stage fora da imagem.
     */
    stage.addEventListener(
      "click",
      function (event) {
        if (
          event.target === stage
        ) {
          closeImage();
        }
      }
    );

    /*
     * Teclado.
     */
    document.addEventListener(
      "keydown",
      function (event) {
        if (
          !lightbox.classList.contains(
            "open"
          )
        ) {
          return;
        }

        if (event.key === "Escape") {
          event.preventDefault();
          closeImage();
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previousImage();
          return;
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          nextImage();
        }
      }
    );

    /*
     * Swipe mobile.
     */
    let startX = 0;
    let startY = 0;

    stage.addEventListener(
      "touchstart",
      function (event) {
        if (
          !event.changedTouches ||
          !event.changedTouches.length
        ) {
          return;
        }

        const touch =
          event.changedTouches[0];

        startX = touch.clientX;
        startY = touch.clientY;
      },
      {
        passive: true
      }
    );

    stage.addEventListener(
      "touchend",
      function (event) {
        if (
          !event.changedTouches ||
          !event.changedTouches.length
        ) {
          return;
        }

        const touch =
          event.changedTouches[0];

        const deltaX =
          touch.clientX - startX;

        const deltaY =
          touch.clientY - startY;

        const horizontalSwipe =
          Math.abs(deltaX) > 55 &&
          Math.abs(deltaX) >
            Math.abs(deltaY);

        if (!horizontalSwipe) {
          return;
        }

        if (deltaX < 0) {
          nextImage();
        } else {
          previousImage();
        }
      },
      {
        passive: true
      }
    );

    updateNavigationState();
  }

  /* ============================================================
   * SOCIAL LINKS
   * ============================================================ */

  function initializeSocialLinks() {
    const socialItems = [
      {
        selector:
          ".social-mini span:nth-child(1)",
        url:
          "https://www.instagram.com/",
        label: "Instagram"
      },
      {
        selector:
          ".social-mini span:nth-child(2)",
        url:
          "https://www.tiktok.com/",
        label: "TikTok"
      },
      {
        selector:
          ".social-mini span:nth-child(3)",
        url:
          "https://www.facebook.com/",
        label: "Facebook"
      }
    ];

    socialItems.forEach(
      function (social) {
        const icons =
          $$(social.selector);

        icons.forEach(function (icon) {
          /*
           * Evita transformar novamente um elemento
           * que já tenha sido convertido em link.
           */
          if (
            icon.tagName.toLowerCase() ===
            "a"
          ) {
            return;
          }

          const anchor =
            document.createElement("a");

          anchor.href = social.url;
          anchor.target = "_blank";
          anchor.rel =
            "noopener noreferrer";

          anchor.setAttribute(
            "aria-label",
            social.label
          );

          anchor.title =
            social.label;

          /*
           * Preserva todo o conteúdo original
           * do ícone.
           */
          while (
            icon.firstChild
          ) {
            anchor.appendChild(
              icon.firstChild
            );
          }

          icon.replaceWith(anchor);

          anchor.style.cssText =
            [
              "width:20px",
              "height:20px",
              "display:grid",
              "place-items:center",
              "border:1px solid rgba(192,132,255,.20)",
              "background:rgba(10,5,16,.58)",
              "border-radius:6px",
              "font-size:9px",
              "color:white",
              "text-decoration:none",
              "backdrop-filter:blur(8px)",
              "-webkit-backdrop-filter:blur(8px)",
              "transition:transform .2s ease," +
                "border-color .2s ease," +
                "box-shadow .2s ease"
            ].join(";");

          anchor.addEventListener(
            "mouseenter",
            function () {
              anchor.style.transform =
                "translateY(-2px)";

              anchor.style.borderColor =
                "rgba(192,132,255,.65)";

              anchor.style.boxShadow =
                "0 0 16px rgba(155,77,255,.18)";
            }
          );

          anchor.addEventListener(
            "mouseleave",
            function () {
              anchor.style.transform =
                "";

              anchor.style.borderColor =
                "rgba(192,132,255,.20)";

              anchor.style.boxShadow =
                "";
            }
          );
        });
      }
    );
  }

  /* ============================================================
   * WHATSAPP BUTTONS
   * ============================================================ */

  function initializeWhatsAppButtons() {
    const buttons =
      $$(
        SELECTORS.whatsapp
      );

    if (!buttons.length) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener(
        "click",
        function (event) {
          event.preventDefault();

          const message =
            encodeURIComponent(
              WHATSAPP_MESSAGE
            );

          const url =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            message;

          openExternalUrl(url);
        }
      );
    });
  }

  /* ============================================================
   * BACKGROUND VIDEO
   * ============================================================ */

  function initializeBackgroundVideo() {
    const backgroundVideo =
      $(SELECTORS.backgroundVideo);

    if (!backgroundVideo) {
      return;
    }

    backgroundVideo.addEventListener(
      "error",
      function () {
        backgroundVideo.style.display =
          "none";
      }
    );

    backgroundVideo.addEventListener(
      "canplay",
      function () {
        if (
          reduceMotion
        ) {
          return;
        }

        const playPromise =
          backgroundVideo.play();

        if (
          playPromise &&
          typeof playPromise.catch ===
            "function"
        ) {
          playPromise.catch(
            function () {
              /*
               * Alguns navegadores bloqueiam
               * autoplay. Não interrompemos o site.
               */
            }
          );
        }
      }
    );
  }

  /* ============================================================
   * REDUCED MOTION — ATUALIZAÇÃO DINÂMICA
   * ============================================================ */

  function initializeMotionPreferenceListener() {
    if (
      !reduceMotionQuery ||
      typeof reduceMotionQuery.addEventListener !==
        "function"
    ) {
      return;
    }

    reduceMotionQuery.addEventListener(
      "change",
      function () {
        /*
         * A preferência do sistema pode mudar
         * enquanto a página está aberta.
         *
         * Não recarregamos a página.
         * As animações já existentes respeitam
         * a preferência inicial e os componentes
         * importantes continuam funcionais.
         */
      }
    );
  }

  /* ============================================================
   * INICIALIZAÇÃO
   * ============================================================ */

  function initialize() {
    initializeRevealAnimations();
    initializeCursorGlow();
    initializeAmbientParallax();
    initializeCardTilt();
    initializeScrollDecorations();
    initializePhoneButton();
    initializeImageFallbacks();
    initializeLightbox();
    initializeSocialLinks();
    initializeWhatsAppButtons();
    initializeBackgroundVideo();
    initializeMotionPreferenceListener();
  }

  /*
   * Garante que o DOM esteja disponível antes
   * de procurar os elementos da página.
   */
  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once: true
      }
    );
  } else {
    initialize();
  }
})();
```

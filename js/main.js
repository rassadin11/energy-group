/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/slider.js":
/*!*************************************!*\
  !*** ./src/js/components/slider.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const swiffyslider = {
  version: "1.6.0",
  init() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    for (let t of e.querySelectorAll(".swiffy-slider")) this.initSlider(t);
  },
  initSlider(e) {
    for (let t of e.querySelectorAll(".slider-nav")) {
      let i = t.classList.contains("slider-nav-next");
      t.addEventListener("click", () => this.slide(e, i), {
        passive: !0
      });
    }
    for (let t of e.querySelectorAll(".slider-indicators")) t.addEventListener("click", () => this.slideToByIndicator()), this.onSlideEnd(e, () => this.handleIndicators(e), 0);
    if (e.classList.contains("slider-nav-autoplay")) {
      const t = e.getAttribute("data-slider-nav-autoplay-interval") ? e.getAttribute("data-slider-nav-autoplay-interval") : 2500;
      this.autoPlay(e, t, e.classList.contains("slider-nav-autopause"));
    }
    if (["slider-nav-autohide", "slider-nav-animation"].some(t => e.classList.contains(t))) {
      const t = e.getAttribute("data-slider-nav-animation-threshold") ? e.getAttribute("data-slider-nav-animation-threshold") : 0.3;
      this.setVisibleSlides(e, t);
    }
  },
  setVisibleSlides(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
    let i = new IntersectionObserver(t => {
      t.forEach(e => {
        e.isIntersecting ? e.target.classList.add("slide-visible") : e.target.classList.remove("slide-visible");
      }), e.querySelector(".slider-container>*:first-child").classList.contains("slide-visible") ? e.classList.add("slider-item-first-visible") : e.classList.remove("slider-item-first-visible"), e.querySelector(".slider-container>*:last-child").classList.contains("slide-visible") ? e.classList.add("slider-item-last-visible") : e.classList.remove("slider-item-last-visible");
    }, {
      root: e.querySelector(".slider-container"),
      threshold: t
    });
    for (let t of e.querySelectorAll(".slider-container>*")) i.observe(t);
  },
  slide(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    const i = e.querySelector(".slider-container"),
      s = e.classList.contains("slider-nav-page"),
      l = e.classList.contains("slider-nav-noloop"),
      r = e.classList.contains("slider-nav-nodelay"),
      o = i.children,
      n = parseInt(window.getComputedStyle(i).columnGap),
      a = o[0].offsetWidth + n;
    let d = t ? i.scrollLeft + a : i.scrollLeft - a;
    s && (d = t ? i.scrollLeft + i.offsetWidth : i.scrollLeft - i.offsetWidth), i.scrollLeft < 1 && !t && !l && (d = i.scrollWidth - i.offsetWidth), i.scrollLeft >= i.scrollWidth - i.offsetWidth && t && !l && (d = 0), i.scroll({
      left: d,
      behavior: r ? "auto" : "smooth"
    });
  },
  slideToByIndicator() {
    const e = window.event.target,
      t = Array.from(e.parentElement.children).indexOf(e),
      i = e.parentElement.children.length,
      s = e.closest(".swiffy-slider"),
      l = s.querySelector(".slider-container").children.length / i * t;
    this.slideTo(s, l);
  },
  slideTo(e, t) {
    const i = e.querySelector(".slider-container"),
      s = parseInt(window.getComputedStyle(i).columnGap),
      l = i.children[0].offsetWidth + s,
      r = e.classList.contains("slider-nav-nodelay");
    i.scroll({
      left: l * t,
      behavior: r ? "auto" : "smooth"
    });
  },
  onSlideEnd(e, t) {
    let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 125;
    let s;
    e.querySelector(".slider-container").addEventListener("scroll", function () {
      window.clearTimeout(s), s = setTimeout(t, i);
    }, {
      capture: !1,
      passive: !0
    });
  },
  autoPlay(e, t, i) {
    t = t < 750 ? 750 : t;
    let s = setInterval(() => this.slide(e), t);
    const l = () => this.autoPlay(e, t, i);
    return i && (["mouseover", "touchstart"].forEach(function (t) {
      e.addEventListener(t, function () {
        window.clearTimeout(s);
      }, {
        once: !0,
        passive: !0
      });
    }), ["mouseout", "touchend"].forEach(function (t) {
      e.addEventListener(t, function () {
        l();
      }, {
        once: !0,
        passive: !0
      });
    })), s;
  },
  handleIndicators(e) {
    if (!e) return;
    const t = e.querySelector(".slider-container"),
      i = t.scrollWidth - t.offsetWidth,
      s = t.scrollLeft / i;
    for (let t of e.querySelectorAll(".slider-indicators")) {
      let e = t.children,
        i = Math.abs(Math.round((e.length - 1) * s));
      for (let t of e) t.classList.remove("active");
      e[i].classList.add("active");
    }
  }
};
window.swiffyslider = swiffyslider, document.currentScript.hasAttribute("data-noinit") || (document.currentScript.hasAttribute("defer") ? swiffyslider.init() : document.onreadystatechange = () => {
  "interactive" === document.readyState && swiffyslider.init();
});
const swiffysliderextensions = {
  version: "1.6.0",
  draggingtimer: null,
  init() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    for (const s of e.querySelectorAll(".swiffy-slider")) this.initSlider(s);
  },
  initSlider(e) {
    e.classList.contains("slider-nav-mousedrag") && e.addEventListener("mousedown", s => this.handleMouseDrag(s, e), {
      passive: !0
    });
  },
  handleMouseDrag(e, s) {
    if (e.srcElement.classList.contains("slider-nav") || e.srcElement.parentElement.classList.contains("slider-indicators")) return;
    const t = s.querySelector(".slider-container");
    s.classList.contains("dragging") && clearTimeout(this.draggingtimer), t.style.cursor = "grabbing", s.classList.add("dragging");
    const i = t.scrollLeft,
      n = e.clientX,
      r = t.children[0].offsetWidth + parseInt(window.getComputedStyle(t).columnGap),
      o = r * (t.children.length - 1),
      l = t.scrollLeft;
    let d = l;
    const a = e => {
      const s = e.clientX - n,
        a = i - 1.8 * s;
      a > 0 && a <= o && (t.scrollLeft = a, s < 0 ? d = o <= l ? l : t.scrollLeft + (r + 1.8 * s) : l > 0 && (d = t.scrollLeft - (r - 1.8 * s)));
    };
    t.addEventListener("mousemove", a, {
      passive: !0
    }), document.addEventListener("mouseup", () => {
      t.removeEventListener("mousemove", a), t.style.cursor = null, d < 0 && (d = 0), t.scroll({
        left: d,
        behavior: "smooth"
      }), this.draggingtimer = setTimeout(() => {
        s.classList.remove("dragging");
      }, 550);
    }, {
      once: !0,
      passive: !0
    });
  }
};
window.swiffyslider.extensions = swiffysliderextensions, document.currentScript.hasAttribute("data-noinit") || window.addEventListener("load", () => {
  swiffyslider.extensions.init();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/slider.js */ "./src/js/components/slider.js");


// dropdown

const dropdowns = document.querySelectorAll('.menu__dropdown');
const headerWrapper = document.querySelector('.header__wrapper');
function activateDropdownMenu() {
  if (document.body.clientWidth > 992) {
    dropdowns.forEach(item => {
      const dropdownMenu = item.querySelector('.dropdown-menu');
      item.addEventListener('mouseover', e => {
        if (e.target.classList.contains('nav-link')) {
          dropdownMenu.classList.add('active');
          headerWrapper.classList.add('active');
        }
      });
      item.addEventListener('mouseleave', () => {
        // закрываем меню
        item.querySelector('.dropdown-menu').classList.remove('active');
        headerWrapper.classList.remove('active');
      });
    });
  } else {
    dropdowns.forEach(item => {
      const dropdownMenu = item.querySelector('.dropdown-menu');
      item.querySelector('.nav-link').addEventListener('click', () => {
        if (!dropdownMenu.classList.contains('active')) {
          let height = 0;
          dropdownMenu.querySelectorAll('& > *').forEach(item => {
            height += item.clientHeight;
          });
          dropdownMenu.style.maxHeight = height + 5 + 'px';
        } else {
          dropdownMenu.style.maxHeight = 0;
        }
        dropdownMenu.classList.toggle('active');
        item.querySelector('.small-arrow').classList.toggle('active');
      });
    });
  }
}
function resetDropdown() {
  dropdowns.forEach(item => {
    const dropdownMenu = item.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('active');
    item.querySelector('.small-arrow').classList.remove('active');
    dropdownMenu.style.maxHeight = 0;
  });
}
activateDropdownMenu();
window.addEventListener('resize', () => {
  activateDropdownMenu();
});

// search

const searchButton = document.querySelector('.header__mobile-icons .search');
const searchOverlay = document.querySelector('.overlay-search');
const backgroundPopup = document.querySelector('.background-popup');
const crossSearch = document.querySelector('.cross-search');
searchButton.addEventListener('click', () => {
  searchOverlay.classList.toggle('active');
  backgroundPopup.classList.toggle('active');
  document.querySelector('.header-menu-wrapper').classList.remove('active');
  document.querySelector('.overlay-contacts').classList.remove('active');
  if (headerWrapper.classList.contains('active')) {
    setTimeout(() => {
      headerWrapper.classList.remove('active');
    }, 300);
  } else {
    headerWrapper.classList.toggle('active');
  }
});
crossSearch.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
  setTimeout(() => {
    headerWrapper.classList.remove('active');
  }, 300);
});

// contacts

const contactsButton = document.querySelector('.header__mobile-icons .contacts');
const contactsOverlay = document.querySelector('.overlay-contacts');
const crossContact = document.querySelector('.cross-contact');
contactsButton.addEventListener('click', () => {
  contactsOverlay.classList.toggle('active');
  backgroundPopup.classList.toggle('active');
  document.querySelector('.header-menu-wrapper').classList.remove('active');
  searchOverlay.classList.remove('active');
  if (headerWrapper.classList.contains('active')) {
    setTimeout(() => {
      headerWrapper.classList.remove('active');
    }, 300);
  } else {
    headerWrapper.classList.toggle('active');
  }
});
crossContact.addEventListener('click', () => {
  contactsOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
  setTimeout(() => {
    headerWrapper.classList.remove('active');
  }, 300);
});

// menu-burger

const burger = document.querySelector('.header__mobile-icons .burger');
const menuOverlay = document.querySelector('.header-menu-wrapper');
const crossMenu = document.querySelector('.cross-menu');
burger.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
});
crossMenu.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
  setTimeout(() => {
    resetDropdown();
  }, 300);
});

// reset overlays on click on backgroundPopup
backgroundPopup.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
  contactsOverlay.classList.remove('active');
  menuOverlay.classList.remove('active');
  setTimeout(() => {
    headerWrapper.classList.remove('active');
  }, 300);
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
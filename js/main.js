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
  init(e = document.body) {
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
  setVisibleSlides(e, t = 0.3) {
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
  slide(e, t = !0) {
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
  onSlideEnd(e, t, i = 125) {
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
  init(e = document.body) {
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
        dropdowns.forEach(elem => {
          elem.querySelector('.dropdown-menu').classList.remove('active');
        });
        dropdownMenu.classList.add('active');
        headerWrapper.classList.add('active');
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

// catalogue overlay pc

const catalogueButton = document.querySelector('.header__catalogue');
const catalogueOverlay = document.querySelector('.catalogue-header__overlay');
const headerMenu = document.querySelector('.header-menu-wrapper');
headerMenu.addEventListener('mouseover', e => {
  if (catalogueButton.contains(e.target) || catalogueOverlay.contains(e.target)) {
    catalogueOverlay.classList.add('active');
  } else {
    catalogueOverlay.classList.remove('active');
  }
});
headerMenu.addEventListener('mouseleave', () => {
  catalogueOverlay.classList.remove('active');
});
headerMenu.addEventListener('click', e => {
  if (catalogueButton.contains(e.target)) {
    catalogueOverlay.classList.toggle('active');
  }
});
catalogueOverlay.addEventListener('mouseleave', () => {
  catalogueOverlay.classList.remove('active');
});

// catalogue overlay mobile

const mobileTitle = document.querySelector('.mobile-catalogue__title');
const attrLayouts = document.querySelectorAll("[data-layout]");
const initialMenu = document.querySelectorAll('[data-initial-layout]');
const mobileMenu = {};

// добавляем в массив главное меню
mobileMenu[0] = [];
initialMenu.forEach(item => {
  const title = item.querySelector('span').innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();
  if (+item.dataset.layout) {
    mobileMenu[0] = [...mobileMenu[0], [title, +item.dataset.layout]];
  } else {
    mobileMenu[0] = [...mobileMenu[0], [title]];
  }
});

// на первой итерации собираем все заголовки
attrLayouts.forEach(item => {
  if (item.dataset.position.includes('header')) {
    const headerPosition = item.dataset.position.replace(" ", "").split(",").indexOf('header');
    const layouts = item.dataset.layout.split(",");
    const itemTitle = item.querySelector("span").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();
    mobileMenu[`${+layouts[headerPosition]}`] = [itemTitle];
  }
});

// на второй итерации составляем меню
attrLayouts.forEach(item => {
  if (item.dataset.position.includes('element')) {
    const layouts = item.dataset.layout.split(",");
    let itemTitle;
    let itemHref = item.href;
    if (item.querySelector("a")) {
      itemTitle = item.querySelector("a").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();
    } else {
      itemTitle = item.querySelector("span").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();
    }
    if (layouts.length === 1) {
      if (mobileMenu[+layouts[0]]) {
        mobileMenu[+layouts[0]] = [...mobileMenu[+layouts[0]], [itemTitle, null, itemHref]];
      } else {
        mobileMenu[+layouts[0]] = [[itemTitle]];
      }
    } else {
      if (mobileMenu[+layouts[0]]) {
        mobileMenu[+layouts[0]] = [...mobileMenu[+layouts[0]], [itemTitle, +layouts[1], itemHref]];
      } else {
        mobileMenu[+layouts[0]] = [[itemTitle, +layouts[1]]];
      }
    }
  }
});

// click catalogue mobile

function menuGenerator(elements, mainMenuField) {
  mainMenuField.innerHTML = '';
  if (!elements) return;
  if (mobileTitle && elements) mobileTitle.innerHTML = elements[0];
  for (let i = 1; i < elements.length; i++) {
    if (elements[i][1]) {
      mainMenuField.insertAdjacentHTML(`beforeend`, `
                <li class="header-menu__item nav-item menu__dropdown position-relative" data-layout="${elements[i][1]}">
                    <span class="nav-link py-lg-2 py-3 d-lg-block d-flex justify-content-between align-items-center">
                        <span>${elements[i][0]}</span>
                        <svg class="small-arrow d-lg-none d-block">
                            <use xlink:href="./img/svg/sprite.svg#small-arrow"></use>
                        </svg>
                    </span>
                </li>
            `);
    } else {
      mainMenuField.insertAdjacentHTML(`beforeend`, `
                <li class="nav-item">
                    <a href="${elements[i][2]}" class="py-lg-3 py-2 d-block"><span>${elements[i][0]}</span></a>
                </li>
            `);
    }
  }
}

// составляем само меню при нажатии на кнопки

let m_history = [];
const arrowBack = document.querySelector('.mobile-catalogue-arrow');
const overlayMenu = document.querySelector('.overlay-menu');
const mobileCatalogue = document.querySelector('.mobile-catalogue__content');
function computeMobileMenu() {
  const catalogueItem = document.querySelector(".mobile-catalogue");
  const dataLayout = document.querySelectorAll('[data-layout]');
  catalogueItem.addEventListener('click', () => {
    overlayMenu.classList.add('d-none');
    mobileCatalogue.classList.remove('d-none');
    m_history.push(0);
    let elements;
    if (!m_history.length) {
      arrowBack.classList.remove('active');
    } else {
      arrowBack.classList.add('active');
      elements = mobileMenu[m_history.at(-1)];
    }
    menuGenerator(elements, mobileCatalogue.querySelector('.header-menu'));
    computeMobileMenu();
  });
  dataLayout.forEach(item => {
    item.addEventListener('click', () => {
      mobileCatalogue.querySelector('.header-menu').innerHTML = '';
      m_history.push(+item.dataset.layout);
      let elements;
      if (!m_history.length) {
        arrowBack.classList.remove('active');
      } else {
        arrowBack.classList.add('active');
        elements = mobileMenu[m_history.at(-1)];
      }
      menuGenerator(elements, mobileCatalogue.querySelector('.header-menu'));
      computeMobileMenu();
    });
  });
}
arrowBack.addEventListener('click', () => {
  if (m_history.length) {
    m_history.pop();
    let elements;
    if (!m_history.length) {
      arrowBack.classList.remove('active');
      overlayMenu.classList.remove('d-none');
      mobileCatalogue.classList.add('d-none');
    } else {
      elements = mobileMenu[m_history.at(-1)];
    }
    menuGenerator(elements, mobileCatalogue.querySelector('.header-menu'));
    computeMobileMenu();
  }
});
computeMobileMenu();

// search

const searchButton = document.querySelector('.header__mobile-icons .search');
const searchOverlay = document.querySelector('.overlay-search');
const backgroundPopup = document.querySelector('.background-popup');
const crossSearch = document.querySelector('.cross-search');
searchButton.addEventListener('click', () => {
  searchOverlay.classList.toggle('active');
  if (searchOverlay.classList.contains('active')) {
    backgroundPopup.classList.add('active');
  } else {
    backgroundPopup.classList.remove('active');
  }
  document.body.classList.toggle('overflow-hidden');
  document.querySelector('.header-menu-wrapper').classList.remove('active');
  document.querySelector('.overlay-contacts').classList.remove('active');
  document.querySelector('.overlay-place').classList.remove('active');
  if (searchOverlay.classList.contains('active')) {
    headerWrapper.classList.add('active');
  } else {
    setTimeout(() => {
      headerWrapper.classList.remove('active');
    }, 300);
  }
});
crossSearch.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
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
  document.body.classList.toggle('overflow-hidden');
  if (contactsOverlay.classList.contains('active')) {
    backgroundPopup.classList.add('active');
  } else {
    backgroundPopup.classList.remove('active');
  }
  document.querySelector('.header-menu-wrapper').classList.remove('active');
  searchOverlay.classList.remove('active');
  document.querySelector('.header-menu-wrapper').classList.remove('active');
  document.querySelector('.overlay-place').classList.remove('active');
  if (contactsOverlay.classList.contains('active')) {
    headerWrapper.classList.add('active');
  } else {
    setTimeout(() => {
      headerWrapper.classList.remove('active');
    }, 300);
  }
});
crossContact.addEventListener('click', () => {
  contactsOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => {
    headerWrapper.classList.remove('active');
  }, 300);
});

// place overlay
const placeButton = document.querySelector('.header__mobile-icons .place');
const placeOverlay = document.querySelector('.overlay-place');
const crossPlace = placeOverlay.querySelector('.cross-place');
placeButton.addEventListener('click', () => {
  placeOverlay.classList.toggle('active');
  document.body.classList.toggle('overflow-hidden');
  if (placeOverlay.classList.contains('active')) {
    backgroundPopup.classList.add('active');
  } else {
    backgroundPopup.classList.remove('active');
  }
  document.querySelector('.header-menu-wrapper').classList.remove('active');
  searchOverlay.classList.remove('active');
  document.querySelector('.header-menu-wrapper').classList.remove('active');
  document.querySelector('.overlay-contacts').classList.remove('active');
  document.querySelector('.overlay-search').classList.remove('active');
  if (placeOverlay.classList.contains('active')) {
    headerWrapper.classList.add('active');
  } else {
    setTimeout(() => {
      headerWrapper.classList.remove('active');
    }, 300);
  }
});
crossPlace.addEventListener('click', () => {
  placeOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => {
    headerWrapper.classList.remove('active');
  }, 300);
});

// contacts popup

const contactsWrapper = document.querySelector('.contacts-wrapper');
const contactsWhiteBackground = contactsWrapper.querySelector('.contacts-wrapper__background');
const contactsBlackBackground = document.querySelector('.contacts-wrapper__black-background');
const arrowExtra = document.querySelector('.toggle-extra');
const extraPhone = contactsWrapper.querySelector('.extra-phone');
let contactsPopupHeight = 0;
contactsWrapper.addEventListener('mouseover', () => {
  contactsPopupHeight = 0;
  contactsPopupHeight += contactsWrapper.querySelector('.header__contacts').offsetHeight;
  contactsPopupHeight += extraPhone.offsetHeight;
  contactsWhiteBackground.style.height = contactsPopupHeight + 40 + 'px';
  contactsBlackBackground.classList.add('active');
  arrowExtra.classList.add('active');
  extraPhone.classList.add('active');
});
contactsWrapper.addEventListener('mouseleave', () => {
  contactsWhiteBackground.style.height = 0 + 'px';
  contactsBlackBackground.classList.remove('active');
  arrowExtra.classList.remove('active');
  extraPhone.classList.remove('active');
});

// ширина скроллбара
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

// place popup pc
const headerCity = document.querySelector('.pre-header__city');
const cityPopup = document.querySelector('.header-pc__overlay');
const cityCross = cityPopup.querySelector('.cross-place');
headerCity.addEventListener('click', () => {
  cityPopup.classList.add('active');
  contactsBlackBackground.classList.add('active');
  document.body.classList.add('overflow-hidden');
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
    document.querySelector('.headers').style.paddingRight = `${scrollbarWidth}px`;
  }
});
cityCross.addEventListener('click', () => {
  cityPopup.classList.remove('active');
  contactsBlackBackground.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  document.body.style.paddingRight = `${0}px`;
  document.querySelector('.headers').style.paddingRight = `${0}px`;
});
contactsBlackBackground.addEventListener('click', () => {
  contactsWhiteBackground.style.height = 0 + 'px';
  contactsBlackBackground.classList.remove('active');
  extraPhone.classList.remove('active');
  cityPopup.classList.remove('active');
  arrowExtra.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  document.body.style.paddingRight = `${0}px`;
  document.querySelector('.headers').style.paddingRight = `${0}px`;
});

// menu-burger

const burger = document.querySelector('.header__mobile-icons .burger');
const menuOverlay = document.querySelector('.header-menu-wrapper');
const crossMenu = document.querySelector('.cross-menu');
burger.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
  backgroundPopup.classList.remove('active');
  searchOverlay.classList.remove('active');
  contactsOverlay.classList.remove('active');
  placeOverlay.classList.remove('active');
  document.body.classList.add('overflow-hidden');
});
crossMenu.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => {
    resetDropdown();
  }, 300);
});

// reset overlays on click on backgroundPopup
backgroundPopup.addEventListener('click', () => {
  backgroundPopup.classList.remove('active');
  searchOverlay.classList.remove('active');
  contactsOverlay.classList.remove('active');
  placeOverlay.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => {
    headerWrapper.classList.remove('active');
  }, 300);
});

// params-block__button

const paramsBlock = document.querySelector('.params-block');
if (paramsBlock) {
  const paramsButtons = paramsBlock.querySelectorAll('.params-block__button');
  const smallSyncContainers = paramsBlock.querySelectorAll('[data-sync-key]');
  let paramsWrapper = null;
  let paramsOverlay = null;
  let paramsButtonsOverlay = [];
  let all_big_selects = [];

  // initial params for diesel

  const diesel_power = ['12 кВт', '15 кВт', '16 кВт', '20 кВт', '24 кВт', '25 кВт', '30 кВт', '35 кВт', '40 кВт', '45 кВт', '48 кВт', '50 кВт', '60 кВт', '70 кВт', '75 кВт', '80 кВт', '100 кВт', '75 кВт', '110 кВт', '120 кВт', '130 кВт', '150 кВт', '160 кВт', '180 кВт', '200 кВт', '240 кВт', '250 кВт', '300 кВт', '320 кВт', '350 кВт', '400 кВт', '450 кВт', '500 кВт', '600 кВт', '700 кВт', '800 кВт', '900 кВт', '1000 кВт', '1100 кВт', '1200 кВт', '1500 кВт', '150 кВт', '1600 кВт', '2000 кВт', '200 кВт'];
  const diesel_engine = ['Aksa', 'BOUDOUIN', 'Cooper', 'Cummins', 'Deutz', 'Doosan', 'Hino', 'Isuzu', 'IVECO', 'Komatsu', 'Kubota', 'Lister Petter', 'Lombardini', 'Mitsubishi', 'MTU', 'Perkins', 'Ricardo', 'Scania', 'SDEC', 'TSS Diesel', 'Weichai', 'Weifang', 'YangDong', 'Yanmar', 'Yuchai', 'MM3', 'ЯМЗ'];
  const diesel_developers = ['Gazvolt', 'Genese', 'Motor', 'REG', 'Азимут', 'Амперос', 'Вепрь', 'Дизель', 'Добрыня', 'Исток', 'Старт', 'ТСС', 'ФАС', 'Фрегат', 'AGG', 'CTG', 'Firman', 'MingPowers', 'PowerLink', 'Toyo', 'Aksa', 'EMSA', 'Hertz', 'Zeus', 'Airman', 'Denyo', 'Kubota', 'Mitsubishi', 'Yamaha', 'Yanmar', 'Briggs &amp; Stratton', 'Chicago Pneumatic', 'Cummins', 'Generac', 'Honeywell', 'Mirkon Energy', 'ELCOS', 'FPT', 'Genmac', 'GMGen', 'Onis Visa', 'Pramac', 'Fubag', 'Geko', 'Henkelhausen', 'RID', 'FG Wilson', 'JCB', 'EUROPOWER', 'Gesan', 'Himoinsa', 'FOGO', 'Atlas Copco', 'Energo', 'SDMO'];
  const diesel_tension = ["230 B", "230/400 B"];
  const diesel_out_tension = ["230/400 B", "230 B"];
  const diesel_amortization = ["1 - ручной ввод", "2 - автозапуск"];

  // initial params for patrol

  const patrol_power = ['15 кВт', '16 кВт', '17 кВт', '18 кВт'];
  const patrol_engine = ['Briggs and Stratton Vanguard', 'Fubag', 'Loncin'];
  const patrol_developers = ['EuroPower', 'Fubag', 'Geko', 'Исток', 'ТСС'];
  const patrol_tension = ["230 B", "230/400 B"];
  const patrol_out_tension = ["230/400 B", "230 B"];
  const patrol_amortization = ["1 - ручной ввод", "2 - автозапуск"];

  // select blocks for small block
  const power_small_select = document.querySelector(".power.small-block .dropdown-options");
  const tension_small_select = document.querySelector(".tension.small-block .dropdown-options");
  const engine_small_select = document.querySelector(".engine.small-block .dropdown-options");
  const developers_small_select = document.querySelector(".developer.small-block .dropdown-options");

  // connection between select and values
  const all_small_selects = [[power_small_select, diesel_power, patrol_power], [tension_small_select, diesel_tension, patrol_tension], [engine_small_select, diesel_engine, patrol_engine], [developers_small_select, diesel_developers, patrol_developers]];
  paramsButtons.forEach(elem => {
    elem.addEventListener('click', () => {
      paramsButtons.forEach(item => item.classList.remove('active'));
      elem.classList.add('active');
      changeSelects(all_small_selects, elem.dataset.type, paramsBlock);
    });
  });
  changeSelects(all_small_selects, 'diesel', paramsBlock);
  function syncOverlayState() {
    if (!paramsOverlay) {
      return;
    }
    const activeSmallTypeButton = paramsBlock.querySelector('.params-block__button.active');
    const currentType = activeSmallTypeButton ? activeSmallTypeButton.dataset.type : 'diesel';
    if (paramsButtonsOverlay.length) {
      paramsButtonsOverlay.forEach(btn => {
        if (btn.dataset.type === currentType) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
    if (all_big_selects.length) {
      changeSelects(all_big_selects, currentType, paramsOverlay);
    }
    smallSyncContainers.forEach(container => {
      const syncKey = container.dataset.syncKey;
      const hiddenInput = container.querySelector('input[type="hidden"]');
      if (!syncKey || !hiddenInput) {
        return;
      }
      const value = (hiddenInput.value || '').trim();
      if (!value) {
        return;
      }
      const overlayContainer = paramsOverlay.querySelector(`.custom-dropdown.big-block[data-sync-key="${syncKey}"]`);
      if (!overlayContainer) {
        return;
      }
      const optionToSelect = overlayContainer.querySelector(`.dropdown-option[data-value="${value}"]`) || Array.from(overlayContainer.querySelectorAll('.dropdown-option')).find(option => option.textContent.trim() === value);
      if (optionToSelect) {
        optionToSelect.click();
      }
    });
  }
  function syncMainState() {
    if (!paramsOverlay) {
      return;
    }
    const activeOverlayTypeButton = paramsOverlay.querySelector('.params-overlay__buttons .params-block__button.active');
    const currentType = activeOverlayTypeButton ? activeOverlayTypeButton.dataset.type : 'diesel';
    const matchingBaseTypeButton = paramsBlock.querySelector(`.params-block__button[data-type="${currentType}"]`);
    if (matchingBaseTypeButton) {
      paramsButtons.forEach(button => button.classList.remove('active'));
      matchingBaseTypeButton.classList.add('active');
      changeSelects(all_small_selects, currentType, paramsBlock);
    }
    const overlaySyncContainers = paramsOverlay.querySelectorAll('.custom-dropdown.big-block[data-sync-key]');
    overlaySyncContainers.forEach(container => {
      const syncKey = container.dataset.syncKey;
      if (!syncKey) {
        return;
      }
      const hiddenInput = container.querySelector('input[type="hidden"]');
      const value = hiddenInput && hiddenInput.value ? hiddenInput.value.trim() : '';
      const baseContainer = paramsBlock.querySelector(`.custom-dropdown.small-block[data-sync-key="${syncKey}"]`);
      if (!baseContainer) {
        return;
      }
      if (!value) {
        resetCustomDropdowns(baseContainer);
        return;
      }
      const optionToSelect = baseContainer.querySelector(`.dropdown-option[data-value="${value}"]`) || Array.from(baseContainer.querySelectorAll('.dropdown-option')).find(option => option.textContent.trim() === value);
      if (optionToSelect) {
        optionToSelect.click();
      }
    });
  }
  function changeSelects(selects, type, resetScope) {
    if (!selects || !selects.length) {
      return;
    }
    const dataIndex = type === "patrol" ? 2 : 1;
    selects.forEach(select => {
      changeSelect(select[0], select[dataIndex]);
    });
    resetCustomDropdowns(resetScope);
  }
  function changeSelect(select, initialData) {
    if (!select || !initialData) {
      return;
    }
    select.innerHTML = '';
    initialData.forEach(item => {
      select.insertAdjacentHTML('beforeend', `
            <div class="dropdown-option py-2 px-3" data-value="${item}">${item}</div>
        `);
    });
  }

  // params overlay

  try {
    paramsWrapper = document.querySelector('.params-overlay__wrapper');
    paramsOverlay = document.querySelector('.params-overlay');
    const paramsButton = document.querySelectorAll('.params-show-popup');
    const paramsCross = paramsOverlay ? paramsOverlay.querySelector('.cross-place') : null;
    function closeParamsOverlay() {
      syncMainState();
      if (paramsWrapper) {
        paramsWrapper.classList.remove('active');
      }
      if (paramsOverlay) {
        paramsOverlay.classList.remove('active');
      }
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    }
    paramsButton.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!paramsWrapper || !paramsOverlay) {
          return;
        }
        paramsWrapper.classList.add('active');
        paramsOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        syncOverlayState();
      });
    });
    if (paramsWrapper) {
      paramsWrapper.addEventListener('click', () => {
        closeParamsOverlay();
      });
    }
    if (paramsCross) {
      paramsCross.addEventListener('click', () => {
        closeParamsOverlay();
      });
    }
  } catch (e) {
    console.warn('error');
  }

  // params-block__button inside overlay

  paramsButtonsOverlay = Array.from(document.querySelectorAll('.params-overlay__buttons .params-block__button'));
  if (paramsButtonsOverlay.length && paramsOverlay) {
    // select blocks for big block
    const power_big_select = document.querySelector(".power.big-block .dropdown-options");
    const tension_big_select = document.querySelector(".tension.big-block .dropdown-options");
    const engine_big_select = document.querySelector(".engine.big-block .dropdown-options");
    const developers_big_select = document.querySelector(".developer.big-block .dropdown-options");
    const out_tension_big_select = document.querySelector(".out-tension.big-block .dropdown-options");
    const amortization_big_select = document.querySelector(".amortization.big-block .dropdown-options");

    // connection between select and values
    all_big_selects = [[power_big_select, diesel_power, patrol_power], [tension_big_select, diesel_tension, patrol_tension], [engine_big_select, diesel_engine, patrol_engine], [developers_big_select, diesel_developers, patrol_developers], [out_tension_big_select, diesel_out_tension, patrol_out_tension], [amortization_big_select, diesel_amortization, patrol_amortization]];
    paramsButtonsOverlay.forEach(elem => {
      elem.addEventListener('click', () => {
        paramsButtonsOverlay.forEach(item => item.classList.remove('active'));
        elem.classList.add('active');
        changeSelects(all_big_selects, elem.dataset.type, paramsOverlay);
      });
    });
    changeSelects(all_big_selects, 'diesel', paramsOverlay);
  }
}

// country accordeon

const countryBlocks = document.querySelectorAll(".blocks-manufacturers__block");
countryBlocks.forEach(item => {
  item.addEventListener('click', () => {
    item.querySelector('.arrow').classList.toggle('active');
    const companiesBlock = item.querySelector('.block-manufacturers__companies');
    if (item.querySelector('.arrow').classList.contains('active')) {
      const companiesAll = item.querySelectorAll('.block-manufacturers__companies > *');
      let initialWidth = 0;
      companiesAll.forEach(elem => initialWidth += elem.clientWidth + 12 + 5);
      const amountOfRows = Math.ceil(initialWidth / item.clientWidth);
      companiesBlock.style.maxHeight = companiesAll[0].clientHeight * amountOfRows + amountOfRows * 12 + 26 + 'px';
      companiesBlock.classList.add('active');
    } else {
      companiesBlock.style.maxHeight = '0px';
      companiesBlock.classList.remove('active');
    }
  });
});

// footer accordeon

const itemFooter = document.querySelectorAll('.item-footer');
itemFooter.forEach(item => {
  item.querySelector('.item-footer__title').addEventListener('click', () => {
    const list = item.querySelector('ul');
    let heightCounter = 0;
    if (item.classList.contains('active')) {
      list.style.maxHeight = 0;
    } else {
      list.querySelectorAll('li').forEach(elem => heightCounter += elem.clientHeight);
      heightCounter += (list.querySelectorAll('li').length - 1) * 8;
      list.style.maxHeight = heightCounter + 'px';
    }
    item.classList.toggle('active');
    item.querySelector('.item-footer__title').classList.toggle('active');
    item.querySelector('.arrow').classList.toggle('active');
    item.querySelector('ul').classList.toggle('active');
  });
});
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
lightGallery(document.getElementById('animated-thumbnails'), {
  thumbnail: true,
  selector: '.blagodar-image__wrapper'
});
lightGallery(document.getElementById(`article-video`), {
  selector: 'this',
  iframeMaxHeight: '90%'
});
const mainPageVideo = document.querySelectorAll(".main-page-video > li > a");
for (let elem of mainPageVideo) {
  lightGallery(elem, {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}
const videoReviews = document.querySelectorAll(".video-reviews > div > a");
for (let elem of videoReviews) {
  lightGallery(elem, {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}
const videoPage = document.querySelectorAll(".video-page .stretched-link");
for (let elem of videoPage) {
  lightGallery(elem, {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}
const openVideoBlock = document.querySelectorAll(".open-video-block li .stretched-link");
for (let elem of openVideoBlock) {
  lightGallery(elem, {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}
if (document.getElementById(`calculator-video-block`)) {
  lightGallery(document.getElementById(`calculator-video-block`), {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}

// open vidoe on page: about company

if (document.getElementById(`about-company`)) {
  lightGallery(document.getElementById(`about-company`), {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}
if (document.getElementById(`about-company2`)) {
  lightGallery(document.getElementById(`about-company2`), {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}

// certificates

lightGallery(document.getElementById('animated-thumbnails'), {
  thumbnail: true,
  selector: '.certificate'
});

// project

lightGallery(document.getElementById('animated-thumbnails-project'), {
  thumbnail: true,
  selector: '.project-gallery-image',
  iframeMaxHeight: '90%'
});

// Custom dropdown with search

function activateCustomDropdowns() {
  const customDropdowns = document.querySelectorAll('.custom-dropdown');
  customDropdowns.forEach(dropdown => {
    const selectDisplay = dropdown.querySelector('.select-display');
    const selectedValue = dropdown.querySelector('.selected-value');
    const dropdownContainer = dropdown.querySelector('.dropdown-container');
    const searchInput = dropdown.querySelector('.search-input');
    const options = dropdown.querySelectorAll('.dropdown-option');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    const selectLabel = dropdown.querySelector('.select-label');
    const arrowSelect = dropdown.querySelector('.arrow');
    const dropdownWrapper = dropdown.querySelector('.dropdown-container-wrapper');

    // Toggle dropdown on click
    selectDisplay.addEventListener('click', () => {
      selectDisplay.classList.toggle('active');
      arrowSelect.classList.toggle('active');
      dropdownWrapper.classList.toggle('active');
      dropdownContainer.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) {
        selectDisplay.classList.remove('active');
        arrowSelect.classList.remove('active');
        dropdownWrapper.classList.remove('active');
        dropdownContainer.classList.remove('active');
      }
    });

    // Filter options based on search input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        options.forEach(option => {
          const optionText = option.textContent.toLowerCase();
          if (optionText.includes(searchText)) {
            option.style.display = 'block';
          } else {
            option.style.display = 'none';
          }
        });
      });
    }

    // Select option on click
    options.forEach(option => {
      option.addEventListener('click', () => {
        // Update display value
        selectedValue.textContent = option.textContent;
        selectedValue.classList.add('d-block');
        if (!selectedValue.classList.contains('no-title')) {
          selectedValue.classList.add('mt-2');
          selectedValue.classList.add('fw-semibold');
        } else {
          selectedValue.classList.remove('default');
        }
        if (!selectDisplay.classList.contains('overlay')) {
          selectedValue.classList.add('pt-1');
        }
        selectDisplay.classList.add('selected');

        // Update hidden input value
        hiddenInput.value = option.getAttribute('data-value');
        const event = new Event('change');
        hiddenInput.dispatchEvent(event);

        // Close dropdown
        dropdownContainer.classList.remove('active');

        // Clear search input
        if (searchInput) searchInput.value = '';
        selectDisplay.classList.remove('active');
        arrowSelect.classList.remove('active');
        dropdownWrapper.classList.remove('active');
        if (searchInput && selectLabel) selectLabel.classList.add('active');

        // Show all options again
        options.forEach(opt => {
          opt.style.display = 'block';
        });
      });
    });
    hiddenInput.value = options[0].getAttribute('data-value');
    const event = new Event('change');
    hiddenInput.dispatchEvent(event);
  });
}
activateCustomDropdowns();
function resetCustomDropdowns(scope) {
  const root = scope && scope.querySelectorAll ? scope : document;
  const dropdownsList = Array.from(root.querySelectorAll('.custom-dropdown'));
  const customDropdowns = root !== document && root.classList && root.classList.contains('custom-dropdown') ? [root, ...dropdownsList] : dropdownsList;
  customDropdowns.forEach(dropdown => {
    const selectDisplay = dropdown.querySelector('.select-display');
    const selectedValue = dropdown.querySelector('.selected-value');
    const dropdownContainer = dropdown.querySelector('.dropdown-container');
    const searchInput = dropdown.querySelector('.search-input');
    const options = dropdown.querySelectorAll('.dropdown-option');
    const selectLabel = dropdown.querySelector('.select-label');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    const arrowSelect = dropdown.querySelector('.arrow');
    const dropdownWrapper = dropdown.querySelector('.dropdown-container-wrapper');

    // Select option on click
    if (!selectDisplay || !selectedValue) {
      return;
    }
    selectedValue.classList.remove('d-block');
    selectedValue.classList.remove('mt-2');
    selectedValue.classList.remove('fw-semibold');
    selectedValue.classList.remove('default');
    selectedValue.classList.remove('pt-1');
    if (selectLabel) {
      selectedValue.innerHTML = selectLabel.innerHTML;
      selectLabel.classList.remove('active');
    } else {
      selectedValue.innerHTML = '';
    }
    selectDisplay.classList.remove('selected');
    selectDisplay.classList.remove('active');
    if (searchInput) {
      searchInput.value = '';
    }
    if (dropdownContainer) {
      dropdownContainer.classList.remove('active');
    }
    if (dropdownWrapper) {
      dropdownWrapper.classList.remove('active');
    }
    if (arrowSelect) {
      arrowSelect.classList.remove('active');
    }
    options.forEach(option => {
      option.addEventListener('click', () => {
        selectedValue.textContent = option.textContent;
        selectedValue.classList.add('d-block');
        if (!selectedValue.classList.contains('no-title')) {
          selectedValue.classList.add('mt-2');
          selectedValue.classList.add('fw-semibold');
        } else {
          selectedValue.classList.remove('default');
        }
        if (!selectDisplay.classList.contains('overlay')) {
          selectedValue.classList.add('pt-1');
        }
        selectDisplay.classList.add('selected');

        // Update hidden input value
        if (hiddenInput) {
          hiddenInput.value = option.getAttribute('data-value');
        }

        // Close dropdown
        if (dropdownContainer) {
          dropdownContainer.classList.remove('active');
        }

        // Clear search input
        if (searchInput) {
          searchInput.value = '';
        }
        selectDisplay.classList.remove('active');
        if (arrowSelect) {
          arrowSelect.classList.remove('active');
        }
        if (dropdownWrapper) {
          dropdownWrapper.classList.remove('active');
        }
        if (selectLabel) {
          selectLabel.classList.add('active');
        }

        // Show all options again
        options.forEach(opt => {
          opt.style.display = 'block';
        });
      });
    });
  });
}
const allGenerators = document.querySelectorAll('.generators');
allGenerators.forEach(generator => {
  const generatorButtons = generator.querySelectorAll('.tabs-header__buttons .btn');
  const buttons = generator.querySelectorAll('.nav-tabs .nav-item');
  let activeTab = 0;
  let activeBtn = 0;
  if (generatorButtons) {
    buttons.forEach((button, idx) => {
      button.addEventListener('click', () => {
        activeTab = idx;
        generatorButtons.forEach((button, idx) => {
          if (!idx) button.classList.add('active');else button.classList.remove('active');
        });
        activeBtn = 0;
        showContent();
      });
    });
    generatorButtons.forEach((button, idx) => {
      button.addEventListener('click', () => {
        generatorButtons.forEach(item => item.classList.remove("active"));
        button.classList.add('active');
        activeBtn = idx;

        // validate tabs

        showContent();
      });
    });
  }
  function showContent() {
    const tabs = generator.querySelectorAll(`.tab-content .tab-pane:nth-child(${activeTab + 1}) .tab-cards`);
    tabs.forEach(tab => {
      tab.classList.add('d-none');
      tab.classList.remove('d-flex');
      tab.classList.remove('d-lg-grid');
    });
    tabs[activeBtn].classList.remove('d-none');
    tabs[activeBtn].classList.add('d-flex');
    tabs[activeBtn].classList.add('d-lg-grid');
  }
});

// arenda slider

if (document.querySelector('.usluga:not(.city-slider__wrapper) .swiffy-slider')) {
  const usluga = document.querySelector('.usluga:not(.city-slider__wrapper)');
  const nextButton = usluga.querySelector('.slider-nav.slider-nav-next');
  const prevButton = usluga.querySelector('.slider-nav:not(.slider-nav-next)');
  const amountOfSlides = usluga.querySelectorAll('.swiffy-slider li').length;
  let activeSlider = 1;
  nextButton.classList.add('active');
  prevButton.classList.add('remove');
  const container = usluga.querySelector(".slider-container");
  const items = container.querySelectorAll("li");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.dataset.mid) {
        activeSlider = +entry.target.dataset.mid;
        if (activeSlider === amountOfSlides) {
          nextButton.disabled = true;
          nextButton.classList.remove('active');
        } else if (activeSlider === 1) {
          prevButton.disabled = true;
          prevButton.classList.remove('active');
        } else {
          nextButton.disabled = false;
          nextButton.classList.add('active');
          prevButton.disabled = false;
          prevButton.classList.add('active');
        }
      }
    });
  }, {
    root: container,
    threshold: 0.6
  });
  items.forEach(item => observer.observe(item));
  nextButton.addEventListener('click', () => {
    if (activeSlider + 1 === amountOfSlides) {
      nextButton.disabled = true;
      nextButton.classList.remove('active');
    } else {
      nextButton.disabled = false;
      nextButton.classList.add('active');
    }
    if (activeSlider + 1 > 1) {
      prevButton.disabled = false;
      prevButton.classList.add('active');
    }
  });
  prevButton.addEventListener('click', () => {
    if (activeSlider - 1 === 1) {
      prevButton.disabled = true;
      prevButton.classList.remove('active');
    } else {
      prevButton.disabled = false;
      prevButton.classList.add('active');
    }
    if (activeSlider - 1 < amountOfSlides) {
      nextButton.disabled = false;
      nextButton.classList.add('active');
    }
  });
}

// for city slider
let activeCitySlider = 1;
let isObserver = true;
const buttons = document.querySelectorAll('.city-slider__buttons button');
if (document.querySelector('.usluga.city-slider__wrapper .swiffy-slider')) {
  const usluga = document.querySelector('.usluga.city-slider__wrapper');
  const nextButton = usluga.querySelector('.slider-nav.slider-nav-next');
  const prevButton = usluga.querySelector('.slider-nav:not(.slider-nav-next)');
  const amountOfSlides = usluga.querySelectorAll('.swiffy-slider li').length;
  nextButton.classList.add('active');
  prevButton.classList.add('remove');
  const container = usluga.querySelector(".slider-container");
  const items = container.querySelectorAll("li");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.dataset.mid) {
        if (!isObserver) return;
        activeCitySlider = +entry.target.dataset.mid;
        if (activeCitySlider === amountOfSlides) {
          nextButton.disabled = true;
          nextButton.classList.remove('active');
          prevButton.disabled = false;
          prevButton.classList.add('active');
        } else if (activeCitySlider === 1) {
          prevButton.disabled = true;
          prevButton.classList.remove('active');
          nextButton.disabled = false;
          nextButton.classList.add('active');
        } else {
          nextButton.disabled = false;
          nextButton.classList.add('active');
          prevButton.disabled = false;
          prevButton.classList.add('active');
        }
        activateButton(activeCitySlider - 1);
      }
    });
  }, {
    root: container,
    threshold: 0.6
  });
  items.forEach(item => observer.observe(item));
  nextButton.addEventListener('click', () => {
    if (activeCitySlider + 1 === amountOfSlides) {
      nextButton.disabled = true;
      nextButton.classList.remove('active');
    } else {
      nextButton.disabled = false;
      nextButton.classList.add('active');
    }
    if (activeCitySlider + 1 > 1) {
      prevButton.disabled = false;
      prevButton.classList.add('active');
    }
  });
  prevButton.addEventListener('click', () => {
    if (activeCitySlider - 1 === 1) {
      prevButton.disabled = true;
      prevButton.classList.remove('active');
    } else {
      prevButton.disabled = false;
      prevButton.classList.add('active');
    }
    if (activeCitySlider - 1 < amountOfSlides) {
      nextButton.disabled = false;
      nextButton.classList.add('active');
    }
  });
  buttons.forEach(item => {
    item.addEventListener('click', () => {
      buttons.forEach(elem => elem.classList.remove('active'));
      item.classList.add('active');
      isObserver = false;
      const activeNumber = +item.dataset.sliderCity - 1;
      activeCitySlider = activeNumber;
      const slider = document.querySelector('.usluga.city-slider__wrapper .slider-container');
      const slides = slider.querySelectorAll('.city-slider__item');
      const slideWidth = slides[0].offsetWidth;
      slider.scrollTo({
        left: slideWidth * activeNumber,
        behavior: 'smooth'
      });

      // for arrows

      if (activeCitySlider + 1 === amountOfSlides) {
        nextButton.disabled = true;
        nextButton.classList.remove('active');
        prevButton.disabled = false;
        prevButton.classList.add('active');
      } else if (activeCitySlider + 1 === 1) {
        prevButton.disabled = true;
        prevButton.classList.remove('active');
        nextButton.disabled = false;
        nextButton.classList.add('active');
      } else {
        nextButton.disabled = false;
        nextButton.classList.add('active');
        prevButton.disabled = false;
        prevButton.classList.add('active');
      }
      setTimeout(() => {
        isObserver = true;
      }, 1000);
    });
  });
}
function activateButton(activeBtn) {
  buttons.forEach(elem => elem.classList.remove('active'));
  buttons[activeBtn].classList.add('active');
}

// for product page

function tooltipsPosition() {
  if (document.querySelector('.product')) {
    const borderRight = document.querySelector('.product .product__wrapper').getBoundingClientRect().right;
    const customTooltips = document.querySelectorAll('.custom-tooltip');
    customTooltips.forEach(tool => {
      tool.style.right = 'inherit';
      tool.style.left = '80%';
      if (tool.getBoundingClientRect().right > borderRight) {
        tool.style.left = 'inherit';
        tool.style.right = '0';
      }
    });
  }
}
window.onresize = () => {
  tooltipsPosition();
};
tooltipsPosition();
function checkStuck() {
  var st = window.scrollY || document.documentElement.scrollTop;
  var docWidth = document.documentElement.clientWidth;
  var fixed = document.querySelector('.headers');
  var height = fixed.offsetTop + fixed.offsetHeight;
  if (st < height && docWidth < 979) {
    fixed.classList.remove('scroll-to-fixed-fixed');
    fixed.style.top = 'auto';
    fixed.style.position = 'static';
    fixed.style.width = '100%';
    document.body.style.marginTop = '0';
  } else {
    if (docWidth < 979 && st > height) {
      fixed.classList.add('scroll-to-fixed-fixed');
      fixed.style.position = 'fixed';
      fixed.style.top = '0';
      document.body.style.marginTop = '50px';
    }
  }
}
window.onload = () => {
  checkStuck();
};
window.onscroll = () => {
  checkStuck();
};

// popups

const popupRecall = document.querySelector('.popup-recall');
if (popupRecall) {
  const cross = popupRecall.querySelector('.popup-cross');
  const background = popupRecall.querySelector('.popup-background');
  cross.addEventListener('click', () => {
    popupRecall.classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = `0px`;
    if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
      document.querySelector('.headers').style.paddingRight = `0px`;
    }
  });
  background.addEventListener('click', () => {
    popupRecall.classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = `0px`;
    if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
      document.querySelector('.headers').style.paddingRight = `0px`;
    }
  });
  const openPopupRecall = document.querySelectorAll('.open-popup-recall');
  openPopupRecall.forEach(item => {
    item.addEventListener('click', () => {
      popupRecall.classList.remove('d-none');
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
        document.querySelector('.headers').style.paddingRight = `${scrollbarWidth}px`;
      }
    });
  });
}
// popup book s-th

const popupBook = document.querySelector('.popup-book');
if (popupBook) {
  const crossBook = popupBook.querySelector('.popup-cross');
  const backgroundBook = popupBook.querySelector('.popup-background');
  crossBook.addEventListener('click', () => {
    popupBook.classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = `0px`;
  });
  backgroundBook.addEventListener('click', () => {
    popupBook.classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = `0px`;
    if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
      document.querySelector('.headers').style.paddingRight = `${0}px`;
    }
  });
  const openPopupBook = document.querySelectorAll('.open-popup-book');
  openPopupBook.forEach(item => {
    item.addEventListener('click', () => {
      popupBook.classList.remove('d-none');
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
        document.querySelector('.headers').style.paddingRight = `${scrollbarWidth}px`;
      }
    });
  });
}
try {
  const resumeWrapper = document.querySelector('.resume-overlay__wrapper');
  if (resumeWrapper) {
    const resumeOverlay = document.querySelector('.resume-overlay');
    const resumeCross = resumeOverlay.querySelector('.cross-place');
    const resumeButton = document.querySelectorAll('.resume-show-popup');
    resumeButton.forEach(btn => {
      btn.addEventListener('click', () => {
        resumeWrapper.classList.add('active');
        resumeOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });
    resumeWrapper.addEventListener('click', () => {
      resumeWrapper.classList.remove('active');
      resumeOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    resumeCross.addEventListener('click', () => {
      resumeWrapper.classList.remove('active');
      resumeOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
  }
} catch (e) {
  console.warn('error');
}
const fileInput = document.getElementById('pdf-upload');
const fileNameDisplay = document.getElementById('file-name');
if (fileInput) {
  fileInput.addEventListener('change', function (e) {
    if (this.files.length > 0) {
      const file = this.files[0];

      // Проверка типа файла
      if (file.type !== 'application/pdf') {
        console.log('Пожалуйста, выберите файл в формате PDF.');
        this.value = '';
        fileNameDisplay.textContent = '';
        return;
      }

      // Проверка размера файла (5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.log('Файл слишком большой. Максимальный размер: 5MB.');
        this.value = '';
        fileNameDisplay.textContent = '';
        return;
      }
      fileNameDisplay.textContent = file.name;
    } else {
      fileNameDisplay.textContent = '';
    }
  });

  // Обработка перетаскивания файлов
  const fileInputLabel = document.querySelector('.file-input-label');
  fileInputLabel.addEventListener('dragover', e => {
    e.preventDefault();
    fileInputLabel.style.borderColor = '#3366FF';
  });
  fileInputLabel.addEventListener('dragleave', () => {
    fileInputLabel.style.borderColor = '#e7e9eb';
  });
  fileInputLabel.addEventListener('drop', e => {
    e.preventDefault();
    fileInputLabel.style.borderColor = '#e7e9eb';
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      const event = new Event('change');
      fileInput.dispatchEvent(event);
    }
  });
}
const vacanciesCards = document.querySelectorAll('.vacancies-card');
if (vacanciesCards) {
  vacanciesCards.forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.classList.contains('btn')) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
}
const reviewsFilterButtons = document.querySelector('.reviews-page__filters');
if (reviewsFilterButtons) {
  reviewsFilterButtons.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', () => {
      reviewsFilterButtons.querySelectorAll('button').forEach(elem => elem.classList.remove('active'));
      item.classList.add('active');

      // для страницы товара
      const filtersObjects = document.querySelectorAll('[data-filter]');
      const podborka = document.querySelector('.podborki');
      if (!filtersObjects.length || !podborka) return;
      if (item.dataset.category === 'about_product') {
        filtersObjects.forEach(filter => {
          if (filter.dataset.filter === 'about_product') {
            filter.classList.remove('d-none');
          } else {
            filter.classList.add('d-none');
          }
        });
        podborka.classList.remove('d-none');
      } else if (item.dataset.category === 'reviews') {
        filtersObjects.forEach(filter => {
          if (filter.dataset.filter === 'reviews') {
            filter.classList.remove('d-none');
          } else {
            filter.classList.add('d-none');
          }
        });
        podborka.classList.add('d-none');
      }
    });
  });
}

// catalog page filters switcher
(function catalogFiltersSwitcher() {
  const podborkiSection = document.querySelector('.catalog-podborki');
  if (!podborkiSection) return;
  const filtersButtons = podborkiSection.querySelectorAll('.reviews-page__filters button');
  const linkBlocks = podborkiSection.querySelectorAll('.catalog-podborki__links');
  if (!filtersButtons.length || !linkBlocks.length) return;
  filtersButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.category || '';
      filtersButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      linkBlocks.forEach(block => {
        if (block.dataset.podborka === target) {
          block.classList.remove('d-none');
        } else {
          block.classList.add('d-none');
        }
      });
    });
  });
})();

// highlight links in header

const categoryLink = document.body.dataset.category;
if (categoryLink) {
  const links = headerWrapper.querySelectorAll('[data-category]');
  links.forEach(link => {
    if (link.dataset.category === categoryLink) {
      link.classList.add('active');
    }
  });
}

// для аккордеонов добавляем класс active к открытому accordion-item

const accordionItems = document.querySelectorAll(".accordion-item");
if (accordionItems) {
  accordionItems.forEach(item => {
    const collapse = item.querySelector(".accordion-collapse");
    const button = item.querySelector(".accordion-button");

    // когда аккордеон открывается
    collapse.addEventListener("show.bs.collapse", () => {
      item.classList.add("active");
      // Убираем класс collapsed для правильного отображения стрелки
      if (button) {
        button.classList.remove("collapsed");
        button.setAttribute("aria-expanded", "true");
      }
    });

    // когда аккордеон закрывается
    collapse.addEventListener("hide.bs.collapse", () => {
      item.classList.remove("active");
      // Добавляем класс collapsed для правильного отображения стрелки
      if (button) {
        button.classList.add("collapsed");
        button.setAttribute("aria-expanded", "false");
      }
    });

    // делаем весь accordion-item кликабельным
    item.addEventListener("click", e => {
      // если клик был не на кнопке, переключаем аккордеон
      if (button && !button.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();

        // Используем Bootstrap Collapse API для переключения состояния
        if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(collapse) || new bootstrap.Collapse(collapse, {
            toggle: false
          });
          bsCollapse.toggle();
        } else {
          // Fallback: вызываем клик на кнопке
          button.click();
        }
      }
    });
  });
}

// for calcs

function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth);
}

// пример использования
const static_button = document.querySelector(".calculator__result-button");
const dynamic_block = document.querySelector(".calculator__result");
function showDynamicBlock() {
  if (static_button && dynamic_block) {
    if (isInViewport(static_button)) {
      dynamic_block.classList.add("d-none");
    } else {
      dynamic_block.classList.remove('d-none');
    }
  }
}
if (static_button && dynamic_block) {
  window.onscroll = () => {
    showDynamicBlock();
  };
  showDynamicBlock();
}

// for product_page sliders

function imageClick(imageNumber) {
  setTimeout(() => {
    //Find the slider element
    const sliderElement = document.getElementById('pgalleryModal');
    //Slide to he right image
    swiffyslider.slideTo(sliderElement, imageNumber);
    //Listen to slide end and set focus to the container to enable keyboard navigation
    swiffyslider.onSlideEnd(sliderElement, () => sliderElement.querySelector(".slider-container").focus());
  }, 300);
}
function thumbHover(imageNumber) {
  //Find the slider element
  const sliderElement = document.getElementById('pgallery');
  //Slide to he right image
  swiffyslider.slideTo(sliderElement, imageNumber);
}
const productGallery = document.getElementById('productGallery');
if (productGallery) {
  const mainSlider = document.getElementById('pgallery');
  const smallSlider = document.getElementById('pgallerythumbs');
  mainSlider.querySelectorAll('img').forEach((img, idx) => {
    img.addEventListener('click', () => {
      imageClick(idx);
    });
  });
  smallSlider.querySelectorAll('img').forEach((img, idx) => {
    img.addEventListener('click', () => {
      thumbHover(idx);
    });
  });
  const prevBtn = document.querySelector(".buy-page__prev-arrow");
  const nextBtn = document.querySelector(".buy-page__next-arrow");

  // функция проверки позиции
  function checkArrows() {
    const scrollTop = smallSlider.scrollTop;
    const scrollHeight = smallSlider.scrollHeight;
    const clientHeight = smallSlider.clientHeight;

    // верх
    if (scrollTop <= 0) {
      prevBtn.classList.add('hide');
    } else {
      prevBtn.classList.remove('hide');
    }

    // низ
    if (scrollTop + clientHeight >= scrollHeight) {
      nextBtn.classList.add('hide');
    } else {
      nextBtn.classList.remove('hide');
    }
  }
  checkArrows();

  // слушаем прокрутку
  smallSlider.addEventListener("scroll", checkArrows);
  document.querySelector(".buy-page__prev-arrow").addEventListener("click", () => {
    smallSlider.scrollBy({
      top: -82,
      behavior: "smooth"
    });
  });
  document.querySelector(".buy-page__next-arrow").addEventListener("click", () => {
    smallSlider.scrollBy({
      top: 82,
      behavior: "smooth"
    });
  });
}

// разворачиваем текст на странице продукта

function initReadMore({
  wrapper,
  content,
  button,
  fade = null,
  lines = null,
  height = null,
  openText = "Скрыть",
  closeText = "Показать всё"
}) {
  if (!wrapper || !content || !button) return;

  // Определяем ограниченную высоту
  let collapsedHeight;
  if (height) {
    collapsedHeight = height;
  } else if (lines) {
    const lineHeight = parseInt(getComputedStyle(content).lineHeight);
    collapsedHeight = lineHeight * lines;
  } else {
    console.warn('Укажите либо lines, либо height');
    return;
  }

  // Устанавливаем начальное состояние
  wrapper.style.maxHeight = collapsedHeight + 'px';
  if (fade) fade.style.top = `${collapsedHeight - 80}px`;
  button.addEventListener('click', function () {
    const expanded = wrapper.classList.toggle('expanded');
    button.classList.toggle('expanded', expanded);
    if (expanded) {
      wrapper.style.maxHeight = content.scrollHeight + 'px';
      if (fade) {
        fade.style.top = `${content.scrollHeight}px`;
        setTimeout(() => {
          fade.classList.add('hidden');
        }, 300);
      }
      button.innerHTML = openText;
    } else {
      wrapper.style.maxHeight = collapsedHeight + 'px';
      if (fade) {
        fade.classList.remove('hidden');
        fade.style.top = `${collapsedHeight - 80}px`;
      }
      ;
      button.innerHTML = closeText;
    }
  });
}
initReadMore({
  wrapper: document.querySelector('.product-description__wrapper'),
  content: document.querySelector('.product-description__content'),
  button: document.querySelector('.product-description__read-more'),
  lines: 4 // либо height: 100
});
initReadMore({
  wrapper: document.querySelector('.product-content__wrapper'),
  content: document.querySelector('.product-content__content'),
  button: document.querySelector('.product-content__read-more'),
  fade: document.querySelector('.product-content__fade'),
  lines: 5 // либо height: 100
});
const buyPageDesc = document.querySelectorAll('.buy-page__description');
if (buyPageDesc[1]) {
  const minHeight = buyPageDesc[0].clientHeight + buyPageDesc[1].clientHeight;
  initReadMore({
    wrapper: document.querySelector('.product1__wrapper'),
    content: document.querySelector('.product1__content'),
    button: document.querySelector('.product1__read-more'),
    fade: document.querySelector('.product1__fade'),
    height: minHeight // либо height: 100,
  });
}

// reviews expanded

const allReviews = document.querySelectorAll('.review-catalog__review');
allReviews.forEach(item => {
  initReadMore({
    wrapper: item.querySelector('.review-catalog__wrapper'),
    content: item.querySelector('.review-catalog__content'),
    button: item.querySelector('.review-catalog__read-more'),
    lines: 6
  });
});

// читать далее для отзывов на мобильном

const swiffyReviewsSlider = document.querySelector('.swiffy-reviews');
if (swiffyReviewsSlider) {
  const allSwiffyReviews = swiffyReviewsSlider.querySelectorAll('li');
  allSwiffyReviews.forEach(item => {
    initReadMore({
      wrapper: item.querySelector('.swiffy-content__wrapper'),
      content: item.querySelector('.swiffy-content__content'),
      button: item.querySelector('.swiffy-content__read-more'),
      fade: item.querySelector('.swiffy-content__fade'),
      height: 160,
      // либо height: 100
      closeText: 'Читать полностью'
    });
  });
}

// Инициализация всех tooltip'ов
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
  new bootstrap.Tooltip(el, {
    placement: el.dataset.bsPlacement,
    // пытается сверху
    fallbackPlacements: ['bottom'],
    // если не влезает — снизу
    trigger: 'hover focus' // показывается при наведении
  });
});

//
const sliderCatalog = document.getElementById('slider-catalog');
if (sliderCatalog) {
  const sliderCatalogPrev = document.querySelector('.slider-catalog__prev-arrow');
  const sliderCatalogNext = document.querySelector('.slider-catalog__next-arrow');
  const slideCatalogWidth = sliderCatalog.querySelector('.slider-catalog__slide').offsetWidth + 16; // ширина + gap

  sliderCatalogPrev.addEventListener('click', () => {
    sliderCatalog.scrollBy({
      left: -slideCatalogWidth,
      behavior: 'smooth'
    });
  });
  function updateButtons() {
    const maxScroll = sliderCatalog.scrollWidth - sliderCatalog.clientWidth;
    if (sliderCatalog.scrollLeft <= 0) {
      sliderCatalogPrev.parentNode.classList.add('hide');
    } else {
      sliderCatalogPrev.parentNode.classList.remove('hide');
    }
    if (sliderCatalog.scrollLeft >= maxScroll - 5) {
      sliderCatalogNext.parentNode.classList.add('hide');
    } else {
      sliderCatalogNext.parentNode.classList.remove('hide');
    }
  }
  sliderCatalogNext.addEventListener('click', () => {
    sliderCatalog.scrollBy({
      left: slideCatalogWidth,
      behavior: 'smooth'
    });
  });
  sliderCatalog.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);

  // при загрузке страницы
  updateButtons();
}

// для фильтров
function scrollFilters(item, useContentHeight) {
  const btn = item.parentNode.querySelector('#toggleBtn');
  let blockHeight = 0;
  let expanded = false;
  let btnInitialValue = '';
  blockHeight = item.clientHeight;
  btn.addEventListener('click', () => {
    if (!btnInitialValue) btnInitialValue = btn.querySelector('span').innerHTML;
    expanded = !expanded;
    item.classList.toggle('expanded', expanded);
    if (expanded) {
      item.classList.remove('pe-1');
      item.parentNode.parentNode.style.maxHeight = +item.parentNode.parentNode.style.maxHeight.replace("px", '') + (300 - blockHeight) + 'px';
      useContentHeight(+item.parentNode.parentNode.style.maxHeight.replace("px", ''));
    } else {
      item.classList.add('pe-1');
      item.parentNode.parentNode.style.maxHeight = +item.parentNode.clientHeight + 'px';
      useContentHeight(+item.parentNode.clientHeight);
      item.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
    btn.querySelector('.default-icon-arrow').style.transform = expanded ? 'rotate(-90deg)' : 'rotate(90deg)';
    btn.querySelector('span').textContent = expanded ? 'Свернуть' : btnInitialValue;
  });
}

// Находим все блоки фильтров каталога
const filterBlocks = document.querySelectorAll('.catalog__filter');
setTimeout(() => {
  filterBlocks.forEach(filterBlock => {
    const toggleBtn = filterBlock.querySelector('.filter-catalog__header .btn');
    if (toggleBtn) {
      const contentWrapper = filterBlock.querySelector('.filter-catalog__wrapper');
      const arrowIcon = toggleBtn.querySelector('.default-icon-arrow');
      let isExpanded = true;
      let contentHeight = contentWrapper.clientHeight;
      console.log(contentWrapper, contentWrapper.clientHeight);
      function useContentHeight(value) {
        contentHeight = value;
      }
      contentWrapper.style.maxHeight = contentHeight + 'px';
      contentWrapper.style.transition = 'all 0.3s ease-in';
      let isPadding;

      // Добавляем обработчик события на кнопку
      toggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (contentWrapper.classList.contains('pb-2')) isPadding = true;
        if (isExpanded) {
          contentWrapper.style.maxHeight = '0px';
          if (isPadding) {
            contentWrapper.classList.add('pb-0');
            contentWrapper.classList.remove('pb-2');
            contentWrapper.parentNode.querySelector('.filter-catalog__header').classList.remove('mb-3');
            contentWrapper.parentNode.querySelector('.filter-catalog__header').classList.add('mb-0');
          }

          // change padding for all block

          contentWrapper.parentNode.classList.remove('pb-5');
          contentWrapper.parentNode.classList.add('pb-1');
          arrowIcon.style.transform = 'rotate(-90deg)';
        } else {
          // Разворачиваем контент
          contentWrapper.style.maxHeight = contentHeight + 'px';
          arrowIcon.style.transform = 'rotate(90deg)';
          if (isPadding) {
            contentWrapper.classList.add('pb-2');
            contentWrapper.classList.remove('pb-0');
            contentWrapper.parentNode.querySelector('.filter-catalog__header').classList.add('mb-3');
            contentWrapper.parentNode.querySelector('.filter-catalog__header').classList.remove('mb-0');
          }

          // change padding for all block

          contentWrapper.parentNode.classList.add('pb-5');
          contentWrapper.parentNode.classList.remove('pb-1');
        }

        // Добавляем transition для стрелки
        arrowIcon.style.transition = 'transform 0.3s ease-in-out';

        // Меняем состояние
        isExpanded = !isExpanded;
      });
      const wrapper = filterBlock.querySelector('#checkboxWrapper');
      if (wrapper) {
        scrollFilters(wrapper, useContentHeight);
      }

      // Обработчик для изменения размера окна (на случай изменения контента)
      window.addEventListener('resize', function () {
        if (isExpanded) {
          const newHeight = contentWrapper.scrollHeight;
          contentWrapper.style.maxHeight = newHeight + 'px';
        }
      });
    }
  });
}, 0);

// nouislider

let nouisliders = document.querySelectorAll('#nouislider');
if (nouisliders) {
  nouisliders.forEach(slider => {
    const parentWrapper = slider.parentNode;
    const sliderRange = noUiSlider.create(slider, {
      start: [+slider.dataset.min, +slider.dataset.max],
      connect: true,
      range: {
        'min': +slider.dataset.min,
        'max': +slider.dataset.max
      }
    });
    sliderRange.on('update', vals => {
      parentWrapper.querySelector('.min-input').value = Math.round(+vals[0]);
      parentWrapper.querySelector('.max-input').value = Math.round(+vals[1]);
    });
    parentWrapper.querySelector('.min-input').addEventListener('input', e => {
      const value = e.target.value;
      sliderRange.set([value, null]);
    });
    parentWrapper.querySelector('.max-input').addEventListener('input', e => {
      const value = e.target.value;
      sliderRange.set([null, value]);
    });
  });
}
if (document.body.clientWidth < 768) {
  // filters overlay
  try {
    const filtersWrapper = document.querySelector('.filters-overlay__wrapper');
    const filtersOverlay = document.querySelector('.filters-overlay');
    const filtersCross = filtersOverlay.querySelector('.cross-place');
    const filtersButton = document.querySelectorAll('.filters-show-popup');
    filtersButton.forEach(btn => {
      btn.addEventListener('click', () => {
        filtersWrapper.classList.add('active');
        filtersOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });
    filtersWrapper.addEventListener('click', () => {
      filtersWrapper.classList.remove('active');
      filtersOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    filtersCross.addEventListener('click', () => {
      filtersWrapper.classList.remove('active');
      filtersOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });

    // cloning node
    const pcFilters = document.querySelector('.catalog-order__main-content > div:first-child');
    const popupPlace = document.querySelector(".filters-popup__filters");
    while (pcFilters.firstChild) {
      if (pcFilters.firstElementChild.classList.contains('btn')) break;
      popupPlace.insertAdjacentElement("beforeend", pcFilters.firstElementChild);
    }
  } catch (e) {
    console.warn('error');
  }
  try {
    const sortWrapper = document.querySelector('.sort-overlay__wrapper');
    const sortOverlay = document.querySelector('.sort-overlay');
    const sortCross = sortOverlay.querySelector('.cross-place');
    const sortButton = document.querySelectorAll('.sort-show-popup');
    sortButton.forEach(btn => {
      btn.addEventListener('click', () => {
        sortWrapper.classList.add('active');
        sortOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });
    sortWrapper.addEventListener('click', () => {
      sortWrapper.classList.remove('active');
      sortOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    sortCross.addEventListener('click', () => {
      sortWrapper.classList.remove('active');
      sortOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
  } catch (e) {
    console.warn('error');
  }

  // sort filters

  const sortGoodsPage = document.querySelectorAll(".sort-overlay__amount");
  sortGoodsPage.forEach(item => {
    item.addEventListener('click', () => {
      sortGoodsPage.forEach(elem => elem.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

// map inactive

const mapInactive = document.querySelector('.map-inactive');
if (mapInactive) {
  mapInactive.addEventListener('click', () => {
    mapInactive.classList.remove('show');
  });
}
// for checkboxes in product_page

const valuesCheckboxes = document.querySelectorAll('.values-buy__checkbox');
if (valuesCheckboxes) {
  valuesCheckboxes.forEach(item => {
    item.addEventListener('click', e => {
      if (!e.target.classList.contains('form-check-input')) {
        item.querySelector('input').checked = true;
        valuesCheckboxes.forEach(elem => elem.classList.remove("checked"));
        item.classList.add('checked');
      }
    });
  });
}

// for characteristicks link in product_page

const characteristicksLink = document.querySelector('a[href="#characteristicks"]');
if (characteristicksLink) {
  characteristicksLink.addEventListener('click', e => {
    reviewsFilterButtons.querySelectorAll('button').forEach(item => item.classList.remove('active'));
    reviewsFilterButtons.querySelectorAll('button')[0].classList.add('active');
    const filtersObjects = document.querySelectorAll('[data-filter]');
    const podborka = document.querySelector('.podborki');
    filtersObjects.forEach(filter => {
      if (filter.dataset.filter === 'about_product') {
        filter.classList.remove('d-none');
      } else {
        filter.classList.add('d-none');
      }
    });
    podborka.classList.remove('d-none');
  });
}

// quiz

const popupQuiz = document.querySelector('.popup-quiz');
if (popupQuiz) {
  const cross = popupQuiz.querySelector('.quiz-cross');
  const background = popupQuiz.querySelector('.popup-background');
  cross.addEventListener('click', () => {
    popupQuiz.classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = `0px`;
    if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
      document.querySelector('.headers').style.paddingRight = `0px`;
    }
  });
  background.addEventListener('click', () => {
    popupQuiz.classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
    document.body.style.paddingRight = `0px`;
    if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
      document.querySelector('.headers').style.paddingRight = `0px`;
    }
  });
  const openPopupQuiz = document.querySelectorAll('.open-popup-quiz');
  openPopupQuiz.forEach(item => {
    item.addEventListener('click', () => {
      popupQuiz.classList.remove('d-none');
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
        document.querySelector('.headers').style.paddingRight = `${scrollbarWidth}px`;
      }
    });
  });
}
const radios = document.querySelectorAll('input[name="quiz-radio"]');
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('label').forEach(label => {
      label.classList.remove('active');
    });
    if (radio.checked) {
      radio.closest('label').classList.add('active');
    }
  });
});
let quiz_slide = 1;
const quizButtonBack = document.querySelector('.quiz-back');
const quizButtonNext = document.querySelector('.quiz-next');
const quizProgress = document.querySelector('.quiz-progress');
const quizProgressBar = document.querySelector('.progress-quiz .progress-bar');
const quizWarning = document.querySelector('.quiz-warning');
if (quizButtonBack) {
  function showQuizScreen(index, content) {
    quizProgress.innerHTML = content;
    const quizScreens = document.querySelectorAll('[data-screen]');
    quizScreens.forEach(item => {
      if (item.dataset.screen == index) {
        item.classList.remove('d-none');
      } else {
        item.classList.add('d-none');
      }
    });

    // меняем progressbar

    if (index <= 5) {
      quizProgressBar.style.width = 100 / 5 * index + '%';
    } else {}
  }
  quizButtonBack.addEventListener('click', () => {
    if (quiz_slide > 1) quiz_slide--;
    if (quiz_slide === 1) {
      quizButtonBack.classList.add('disabled');
    }
    if (quiz_slide === 5) {
      quizButtonNext.querySelector('span').innerHTML = 'Зафиксировать выгоду';
      showQuizScreen(quiz_slide, `Вопрос ${quiz_slide} из 5`);
      quizProgressBar.classList.remove('bg-warning');
      quizWarning.classList.add('d-none');
    } else {
      quizButtonNext.querySelector('span').innerHTML = 'Далее';
      quizButtonNext.querySelector('svg').classList.remove('d-none');
      if (document.body.clientWidth < 768) {
        quizButtonNext.classList.remove('flex-fill');
        quizButtonBack.querySelector('span').classList.remove('d-none');
      }
    }
    showQuizScreen(quiz_slide, `Вопрос ${quiz_slide} из 5`);
  });
  quizButtonNext.addEventListener('click', () => {
    if (quiz_slide < 6) quiz_slide++;
    if (quiz_slide === 5) {
      quizButtonNext.querySelector('span').innerHTML = 'Зафиксировать выгоду';
      quizButtonNext.querySelector('svg').classList.add('d-none');
      if (document.body.clientWidth < 768) {
        quizButtonNext.classList.add('flex-fill');
        quizButtonBack.querySelector('span').classList.add('d-none');
      }
      showQuizScreen(quiz_slide, `Вопрос ${quiz_slide} из 5`);
    } else if (quiz_slide === 6) {
      quizButtonNext.querySelector('span').innerHTML = 'Отправить данные';
      quizProgressBar.classList.add('bg-warning');
      quizWarning.classList.remove('d-none');
      showQuizScreen(quiz_slide, `Оставьте заявку`);
    } else {
      quizButtonNext.querySelector('span').innerHTML = 'Далее';
      quizButtonNext.querySelector('svg').classList.remove('d-none');
      quizButtonBack.classList.remove('disabled');
      showQuizScreen(quiz_slide, `Вопрос ${quiz_slide} из 5`);
    }
  });
  const inputAddress = document.querySelector('.quiz-map__input');
  initMap();
  async function initMap() {
    await ymaps3.ready;
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapListener,
      YMapMarker,
      YMapDefaultFeaturesLayer
    } = ymaps3;
    const map = new YMap(document.getElementById('quiz-map'), {
      location: {
        center: [37.588144, 55.733842],
        zoom: 10
      }
    });
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());
    const center = [37.628056, 55.742245];
    const icon = document.createElement('img');
    icon.className = 'marker';
    icon.src = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCw1MTIpIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiCmZpbGw9IiNmZjQ0MzMiIHN0cm9rZT0ibm9uZSI+CjxwYXRoIGQ9Ik0yNDEwIDQ3NzQgYy0yNzYgLTMzIC01MTYgLTEyMCAtNzQwIC0yNjggLTEzOCAtOTIgLTM0MSAtMjkzIC00MjkKLTQyNiAtMTE3IC0xNzYgLTIwNiAtMzg3IC0yNDYgLTU4NSAtNDkgLTI0MyAtMzMgLTYxOSA0MSAtOTU0IDEyNCAtNTU2IDQyMQotMTEyMCA4NTggLTE2MzAgMTEyIC0xMzAgMzYyIC0zODEgNDc2IC00NzcgMTU0IC0xMzAgMTg0IC0xNDMgMjQ1IC0xMDUgOTkgNjAKMzc2IDMxOSA1NDcgNTEwIDQ3OCA1MzcgNzg5IDExMTEgOTIyIDE3MDYgNzQgMzI3IDkwIDcwOSA0MSA5NTAgLTM5IDE5MCAtMTI1CjQwMCAtMjMwIDU2MCAtNjkgMTA2IC0xMDAgMTQ0IC0xOTggMjQ0IC0yMzEgMjM1IC01MTUgMzg5IC04MzQgNDUxIC0xMDQgMjEKLTM2NiAzNCAtNDUzIDI0eiBtMzkzIC04ODEgYzEyMyAtNDMgMTg5IC04NSAyODcgLTE4MyAxMzYgLTEzNiAyMDcgLTI5NCAyMTcKLTQ4NSAyMCAtMzYxIC0yMjMgLTY4NiAtNTc1IC03NzIgLTg4IC0yMSAtMjU2IC0yMSAtMzQ0IDAgLTI4NiA3MCAtNTA1IDI5OAotNTY0IDU4NyAtNTggMjg5IDcxIDYwMiAzMTYgNzY1IDE0NiA5NyAyNTEgMTI2IDQ0MCAxMjIgMTIwIC0zIDE0NCAtNyAyMjMKLTM0eiIvPgo8L2c+Cjwvc3ZnPgo=";
    const marker = new YMapMarker({
      coordinates: center
    }, icon);
    map.addChild(marker);
    const clickCallback = async (_, e) => {
      const coords = e.coordinates;
      ymaps3.search({
        'text': coords
      }).then(function (res) {
        const props = res[0].properties;
        const address = [props.description, props.name].filter(Boolean).join(', ');
        let center_update = res[0].geometry.coordinates;
        map.update({
          location: {
            center: center_update,
            zoom: 17,
            duration: 400
          }
        });
        marker.update({
          coordinates: center_update
        });
        inputAddress.value = address;
      });
    };
    const mapListener = new YMapListener({
      layer: 'any',
      onClick: clickCallback
    });
    map.addChild(mapListener);
    inputAddress.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const query = inputAddress.value.trim();
        if (!query) return;
        ymaps3.search({
          text: query
        }).then(function (res) {
          if (res && res.length > 0) {
            const props = res[0].properties;
            const address = [props.description, props.name].filter(Boolean).join(', ');
            let center_update = res[0].geometry.coordinates;
            map.update({
              location: {
                center: center_update,
                zoom: 17,
                duration: 400
              }
            });
            marker.update({
              coordinates: center_update
            });
            inputAddress.value = address;
          } else {
            console.log('Адрес не найден, попробуйте уточнить');
          }
        }).catch(err => {
          console.error('Ошибка поиска:', err);
        });
      }
    });
  }
}

// for garant accordion
const garantAccordionButtons = document.querySelectorAll('.garant-accordion__item button');
const allAccordions = document.querySelectorAll('.accordion-item');
if (document.body.clientWidth <= 768) {
  allAccordions.forEach(item => {
    item.classList.remove('active');
    item.querySelector('h2 button').classList.add('collapsed');
    item.querySelector('.accordion-collapse').classList.remove('show');
  });
}
function initializeGarantAccordion() {
  garantAccordionButtons.forEach(item => {
    const target = item.dataset.bsTarget;
    if (document.body.clientWidth > 768) {
      item.dataset.bsTarget = '';
    } else {
      item.dataset.bsTarget = target;
    }
  });
}
initializeGarantAccordion();
window.onresize = () => initializeGarantAccordion();

// power overlay wrap

if (document.body.clientWidth < 768) {
  try {
    const powerWrapper = document.querySelector('.power-overlay__wrapper');
    const powerOverlay = document.querySelector('.power-overlay');
    const powerCross = powerOverlay.querySelector('.cross-place');
    const powerButton = document.querySelectorAll('.power-show-popup');
    const powerSubmit = document.querySelector('.power-overlay__submit');
    powerButton.forEach(btn => {
      btn.addEventListener('click', () => {
        powerWrapper.classList.add('active');
        powerOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });
    powerWrapper.addEventListener('click', () => {
      powerWrapper.classList.remove('active');
      powerOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    powerCross.addEventListener('click', () => {
      powerWrapper.classList.remove('active');
      powerOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    powerSubmit.addEventListener('click', () => {
      powerWrapper.classList.remove('active');
      powerOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
  } catch (e) {
    console.warn('error');
  }
}

// industry overlay wrap

if (document.body.clientWidth < 768) {
  try {
    const industryWrapper = document.querySelector('.industry-overlay__wrapper');
    const industryOverlay = document.querySelector('.industry-overlay');
    const industryCross = industryOverlay.querySelector('.cross-place');
    const industryButton = document.querySelectorAll('.industry-show-popup');
    const industrySubmit = document.querySelector('.industry-overlay__submit');
    industryButton.forEach(btn => {
      btn.addEventListener('click', () => {
        industryWrapper.classList.add('active');
        industryOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });
    industryWrapper.addEventListener('click', () => {
      industryWrapper.classList.remove('active');
      industryOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    industryCross.addEventListener('click', () => {
      industryWrapper.classList.remove('active');
      industryOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    industrySubmit.addEventListener('click', () => {
      industryWrapper.classList.remove('active');
      industryOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
  } catch (e) {
    console.warn('error');
  }
}

// region overlay wrap

if (document.body.clientWidth < 768) {
  try {
    const regionWrapper = document.querySelector('.region-overlay__wrapper');
    const regionOverlay = document.querySelector('.region-overlay');
    const regionCross = regionOverlay.querySelector('.cross-place');
    const regionButton = document.querySelectorAll('.region-show-popup');
    const regionSubmit = document.querySelector('.region-overlay__submit');
    regionButton.forEach(btn => {
      btn.addEventListener('click', () => {
        regionWrapper.classList.add('active');
        regionOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });
    regionWrapper.addEventListener('click', () => {
      regionWrapper.classList.remove('active');
      regionOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    regionCross.addEventListener('click', () => {
      regionWrapper.classList.remove('active');
      regionOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    regionSubmit.addEventListener('click', () => {
      regionWrapper.classList.remove('active');
      regionOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
  } catch (e) {
    console.warn('error');
  }
}

// ampers calc

const ampers = document.querySelector('.ampers');
if (ampers) {
  const ampersCheckboxes = ampers.querySelectorAll('.ampers-wrapper');
  ampersCheckboxes.forEach((item, idx) => {
    const allCheckboxes = item.querySelectorAll('.ampers-checkbox');
    if (!idx) {
      allCheckboxes.forEach(elem => {
        elem.addEventListener('change', () => {
          allCheckboxes.forEach(i => i.classList.remove('active'));
          elem.classList.add('active');
          if (elem.dataset.change) {
            ampers.querySelector('[data-custom]').innerHTML = 'Введите мощность';
          } else {
            ampers.querySelector('[data-custom]').innerHTML = 'Номинальный ток, Ампер';
          }
        });
      });
    } else {
      allCheckboxes.forEach(elem => {
        elem.addEventListener('change', () => {
          allCheckboxes.forEach(i => i.classList.remove('active'));
          elem.classList.add('active');
        });
      });
    }
  });
  const ampersType = ampers.querySelector('[data-type]');
  let type_value = '1';
  ampersType.querySelectorAll('.ampers-checkbox').forEach(item => {
    item.addEventListener('change', () => {
      type_value = item.querySelector('input').value;
      generateResult();
    });
  });
  const phaseType = ampers.querySelector('[data-phase]');
  let phase_value = '220';
  phaseType.querySelectorAll('.ampers-checkbox').forEach(item => {
    item.addEventListener('change', () => {
      phase_value = item.querySelector('input').value;
      generateResult();
    });
  });
  const currentType = ampers.querySelector('.ampers-current');
  let current_value = 0;
  currentType.value = 0;
  currentType.addEventListener('input', () => {
    current_value = currentType.value;
    generateResult();
  });
  function num(e) {
    return e % 1 === 0 ? e.toFixed(0) : e.toFixed(2);
  }
  function generateResult() {
    if (String(current_value) && String(phase_value) && String(type_value)) {
      console.log(current_value, phase_value, type_value);
      const result = ampers.querySelector('.calculator__power span:first-child');
      const result_postfix = ampers.querySelector('.calculator__power span:last-child');
      switch (type_value) {
        case '1':
          if (phase_value == 380) {
            result.innerHTML = num(current_value * +phase_value * 1.73);
          } else {
            result.innerHTML = num(current_value * +phase_value);
          }
          result_postfix.innerHTML = 'Вт';
          break;
        case '2':
          if (phase_value == 380) {
            result.innerHTML = num(current_value / (+phase_value * 1.73));
          } else {
            result.innerHTML = num(current_value / +phase_value);
          }
          result_postfix.innerHTML = 'А';
          break;
      }
    }
  }
  generateResult();
}

// for scrollspy
new bootstrap.ScrollSpy(document.body, {
  target: '#navbar-example2',
  offset: 20
});

// for arenda reviews slider

const reviewsSlider = document.querySelector('.reviews');
function maskForReviewsSlider(reviews) {
  const rects = reviews.querySelector('.container').getBoundingClientRect();
  const width = rects.width;
  const x = rects.x;
  const slider = reviews.querySelector('.reviews .swiffy-slider');
  slider.style.maskImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${document.body.clientWidth}" height="500"><rect x="0" y="0" width="${x}" height="500" fill="rgba(0,0,0,0.2)" /><rect x="${x}" y="0" width="${width}" height="500" fill="white" /><rect x="${width + x}" y="0" width="${document.body.clientWidth - width - x}" height="500" fill="rgba(0,0,0,0.2)" /></svg>')`;
  slider.querySelector('.slider-container').style.paddingLeft = `${x + 16}px`;
  slider.querySelector('.slider-container').style.paddingRight = `${x + 16}px`;
  console.log(slider.querySelector('.slider-container').style.paddingLeft);
  if (document.body.clientWidth > 1280) {
    slider.style.setProperty('--swiffy-slider-item-count', "unset");
    reviews.querySelectorAll('.reviews__slide').forEach(item => {
      item.style.minWidth = '406px';
    });
    console.log('changed');
  }
  window.onresize = () => maskForReviewsSlider(reviewsSlider);
}
if (reviewsSlider) {
  maskForReviewsSlider(reviewsSlider);
}

// Calculator (КВА -> КВт) synchronization for custom dropdowns
(function syncCalculatorDropdowns() {
  const kvaDropdown = document.querySelector('.custom-dropdown[data-select="kva"]');
  const kwDropdown = document.querySelector('.custom-dropdown[data-select="kw"]');
  if (!kvaDropdown || !kwDropdown) return;
  let isSyncing = false;

  // helper to safely click counterpart without endless loop
  const syncByIndex = (fromDropdown, toDropdown, sourceOption) => {
    const sourceOptions = Array.from(fromDropdown.querySelectorAll('.dropdown-option'));
    const targetOptions = Array.from(toDropdown.querySelectorAll('.dropdown-option'));
    const idx = sourceOptions.indexOf(sourceOption);
    if (idx === -1 || !targetOptions[idx]) return;
    isSyncing = true;
    targetOptions[idx].click();
    setTimeout(() => {
      isSyncing = false;
    }, 0);
  };

  // click on КВА option -> click corresponding КВт option (same index)
  kvaDropdown.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', () => {
      if (isSyncing) return;
      syncByIndex(kvaDropdown, kwDropdown, option);
    });
  });

  // click on КВт option -> click corresponding КВА option (same index)
  kwDropdown.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', () => {
      if (isSyncing) return;
      syncByIndex(kwDropdown, kvaDropdown, option);
    });
  });
})();

// Calculator pricing and term handling
function initCalculatorPricing() {
  const termDropdown = document.querySelector('.custom-dropdown[data-select="term"]');
  const kvaDropdown = document.querySelector('.custom-dropdown[data-select="kva"]');
  const kwDropdown = document.querySelector('.custom-dropdown[data-select="kw"]');
  const priceEl = document.querySelector('.info-calculator__block:nth-child(1) .info-calculator__price');
  const fuelEl = document.querySelector('.info-calculator__block:nth-child(3) .info-calculator__price');
  const discountEl = document.querySelector('.info-calculator__block:nth-child(2) .info-calculator__price');
  if (!termDropdown) return;
  const powerKvaOrder = ['25', '37.5', '62.5', '75', '125', '150', '181.25', '250', '300', '400', '462.5', '625'];
  const powerKwOrder = ['20', '30', '50', '60', '100', '120', '145', '200', '240', '320', '370', '500'];
  const termValueToIndex = {
    '1': 0,
    '2': 1,
    '3-10': 2,
    '11-30': 3,
    '31+': 4
  };
  const priceTable = [[9000, 10000, 13000, 13000, 15000, 17000, 19000, 22000, 25000, 32000, 36000, null], [4000, 5000, 7000, 7000, 8000, 9000, 10000, 11500, 13000, 16500, 18500, null], [3500, 4000, 4700, 4700, 6000, 6800, 7500, 8500, 9500, 12000, 14500, null], [3300, 3700, 4300, 4300, 5700, 6400, 7000, 8000, 9100, 11300, 13200, 16500], [3000, 3400, 4000, 4000, 5300, 5900, 6500, 7700, 8700, 10700, 12700, 16000]];
  const fuelConsumption = [3.5, 5.9, 8.1, 8.8, 14, 12.1, 21, 28.4, 21, 48.6, 63.7, null];
  const discountTable = [
  // 1 день
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // 2 дня
  [55.6, 50.0, 46.2, 46.2, 46.7, 47.1, 47.4, 47.7, 48.0, 48.4, null, null],
  // от 3 до 10
  [61.1, 60.0, 63.8, 63.8, 60.0, 60.0, 60.5, 61.4, 62.0, 62.5, null, null],
  // от 11 до 30
  [63.3, 63.0, 66.9, 66.9, 62.0, 62.4, 63.2, 63.6, 63.6, 64.7, null, null],
  // от 31 дня
  [66.7, 66.0, 69.2, 69.2, 64.7, 65.3, 65.8, 65.0, 65.2, 66.6, 64.7, 3]];
  const termHidden = termDropdown.querySelector('input[type="hidden"]');
  const kvaHidden = kvaDropdown.querySelector('input[type="hidden"]');
  const kwHidden = kwDropdown.querySelector('input[type="hidden"]');
  const termOptions = Array.from(termDropdown.querySelectorAll('.dropdown-option'));
  const kvaOptions = Array.from(kvaDropdown.querySelectorAll('.dropdown-option'));
  const kwOptions = Array.from(kwDropdown.querySelectorAll('.dropdown-option'));
  const kvaOptionsRoot = kvaDropdown.querySelector('.dropdown-options');
  const kwOptionsRoot = kwDropdown.querySelector('.dropdown-options');
  const kva625Option = kvaDropdown.querySelector('.dropdown-option[data-value="625"]');
  const kw500Option = kwDropdown.querySelector('.dropdown-option[data-value="500"]');
  const formatPrice = value => `${value.toLocaleString('ru-RU')} ₽`;
  const formatFuel = value => `${value.toLocaleString('ru-RU')} л/ч.`;
  const formatDiscount = value => `${value.toLocaleString('ru-RU', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })}%`;
  const getTermIndex = () => termValueToIndex[termHidden.value] ?? 0;
  const getPowerIndex = () => {
    if (kvaHidden.value) {
      const idx = powerKvaOrder.indexOf(kvaHidden.value);
      if (idx !== -1) return idx;
    }
    if (kwHidden.value) {
      const idx = powerKwOrder.indexOf(kwHidden.value);
      if (idx !== -1) return idx;
    }
    return -1;
  };
  const selectPowerByValue = value => {
    const option = kvaDropdown.querySelector(`.dropdown-option[data-value="${value}"]`);
    if (option) option.click();
  };
  const enforce625Availability = () => {
    const termIdx = getTermIndex();
    const disallow625 = termIdx <= 2;
    const hasKva625 = kva625Option && kvaOptionsRoot.contains(kva625Option);
    if (disallow625 && hasKva625) {
      if (kvaHidden.value === '625' || kwHidden.value === '500') {
        selectPowerByValue('462.5');
      }
      if (kva625Option && kva625Option.parentNode) {
        kva625Option.parentNode.removeChild(kva625Option);
      }
      if (kw500Option && kw500Option.parentNode) {
        kw500Option.parentNode.removeChild(kw500Option);
      }
    } else if (!disallow625 && !hasKva625 && kva625Option && kw500Option) {
      kvaOptionsRoot.appendChild(kva625Option);
      kwOptionsRoot.appendChild(kw500Option);
    }
  };
  const updatePrice = () => {
    enforce625Availability();
    const powerIdx = getPowerIndex();
    if (powerIdx === -1) {
      priceEl.textContent = '—';
      fuelEl.textContent = '—';
      discountEl.textContent = '—';
      return;
    }
    const termIdx = getTermIndex();
    const price = priceTable[termIdx]?.[powerIdx];
    const fuel = fuelConsumption[powerIdx];
    const discount = discountTable[termIdx]?.[powerIdx];
    if (typeof price === 'number') {
      priceEl.textContent = `от ${formatPrice(price)}`;
    } else {
      priceEl.textContent = '—';
    }
    if (typeof fuel === 'number') {
      fuelEl.textContent = `от ${formatFuel(fuel)}`;
    } else {
      fuelEl.textContent = '—';
    }
    if (typeof discount === 'number') {
      discountEl.textContent = `${formatDiscount(discount)}`;
    } else {
      discountEl.textContent = '—';
    }
  };
  const bindUpdate = options => {
    options.forEach(option => {
      option.addEventListener('click', () => {
        setTimeout(updatePrice, 0);
      });
    });
  };
  bindUpdate(termOptions);
  bindUpdate(kvaOptions);
  bindUpdate(kwOptions);
  kvaOptions[0].click();
  if (!termHidden.value && termOptions[0]) {
    termOptions[0].click();
  }
  updatePrice();
}
;
initCalculatorPricing();

// for catalog selects

const catalogSorting = document.querySelector('.catalog-sorting');
const catalogGoods = document.querySelector('.catalog-goods');
if (catalogGoods && catalogSorting) {
  const sortingOptions = catalogSorting.querySelector('input[type="hidden"]');
  const goodsOptions = catalogGoods.querySelector('input[type="hidden"]');
  console.log(sortingOptions);
  sortingOptions.addEventListener('change', () => {
    console.log(sortingOptions.value);
  });
  goodsOptions.addEventListener('change', () => {
    console.log(goodsOptions.value);
  });
}
})();

var __webpack_export_target__ = window;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map
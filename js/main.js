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
    if (item.querySelector("a")) {
      itemTitle = item.querySelector("a").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();
    } else {
      itemTitle = item.querySelector("span").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();
    }
    if (layouts.length === 1) {
      if (mobileMenu[+layouts[0]]) {
        mobileMenu[+layouts[0]] = [...mobileMenu[+layouts[0]], [itemTitle]];
      } else {
        mobileMenu[+layouts[0]] = [[itemTitle]];
      }
    } else {
      if (mobileMenu[+layouts[0]]) {
        mobileMenu[+layouts[0]] = [...mobileMenu[+layouts[0]], [itemTitle, +layouts[1]]];
      } else {
        mobileMenu[+layouts[0]] = [[itemTitle, +layouts[1]]];
      }
    }
  }
});

// click catalogue mobile

function menuGenerator(elements, mainMenuField) {
  mobileTitle.innerHTML = elements[0];
  mainMenuField.innerHTML = '';
  for (let i = 1; i < elements.length; i++) {
    if (elements[i].length === 2) {
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
                    <a href="#" class="py-lg-3 py-2 d-block"><span>${elements[i][0]}</span></a>
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
      changeSelects(all_small_selects, elem.dataset.type);
    });
  });
  changeSelects(all_small_selects, 'diesel');
  function changeSelects(selects, type) {
    switch (type) {
      case "diesel":
        selects.forEach(select => {
          changeSelect(select[0], select[1]);
        });
        resetCustomDropdowns();
        break;
      case "patrol":
        selects.forEach(select => {
          changeSelect(select[0], select[2]);
        });
        resetCustomDropdowns();
        break;
    }
  }
  function changeSelect(select, initialData) {
    select.innerHTML = '';
    initialData.forEach(item => {
      select.insertAdjacentHTML('beforeend', `
            <div class="dropdown-option py-2 px-3" data-value="${item}">${item}</div>
        `);
    });
  }

  // params overlay

  try {
    const paramsWrapper = document.querySelector('.params-overlay__wrapper');
    const paramsOverlay = document.querySelector('.params-overlay');
    const paramsCross = paramsOverlay.querySelector('.cross-place');
    const paramsButton = document.querySelectorAll('.params-show-popup');
    paramsButton.forEach(btn => {
      btn.addEventListener('click', () => {
        paramsWrapper.classList.add('active');
        paramsOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      });
    });
    paramsWrapper.addEventListener('click', () => {
      paramsWrapper.classList.remove('active');
      paramsOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
    paramsCross.addEventListener('click', () => {
      paramsWrapper.classList.remove('active');
      paramsOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = `${0}px`;
    });
  } catch (e) {
    console.warn('error');
  }

  // params-block__button inside overlay

  const paramsButtonsOverlay = document.querySelectorAll('.params-overlay__buttons .params-block__button');
  if (paramsButtonsOverlay) {
    // select blocks for big block
    const power_big_select = document.querySelector(".power.big-block .dropdown-options");
    const tension_big_select = document.querySelector(".tension.big-block .dropdown-options");
    const engine_big_select = document.querySelector(".engine.big-block .dropdown-options");
    const developers_big_select = document.querySelector(".developer.big-block .dropdown-options");
    const out_tension_big_select = document.querySelector(".out-tension.big-block .dropdown-options");
    const amortization_big_select = document.querySelector(".amortization.big-block .dropdown-options");

    // connection between select and values
    const all_big_selects = [[power_big_select, diesel_power, patrol_power], [tension_big_select, diesel_tension, patrol_tension], [engine_big_select, diesel_engine, patrol_engine], [developers_big_select, diesel_developers, patrol_developers], [out_tension_big_select, diesel_out_tension, patrol_out_tension], [amortization_big_select, diesel_amortization, patrol_amortization]];
    paramsButtonsOverlay.forEach(elem => {
      elem.addEventListener('click', () => {
        paramsButtonsOverlay.forEach(item => item.classList.remove('active'));
        elem.classList.add('active');
        changeSelects(all_big_selects, elem.dataset.type);
      });
    });
    changeSelects(all_big_selects, 'diesel');
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
for (let i = 1; i <= 4; i++) {
  lightGallery(document.getElementById(`open-video-${i}`), {
    selector: 'this',
    iframeMaxHeight: '90%'
  });
}
for (let i = 1; i <= 4; i++) {
  lightGallery(document.getElementById(`open-video-block-${i}`), {
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

        // Close dropdown
        dropdownContainer.classList.remove('active');

        // Clear search input
        searchInput.value = '';
        selectDisplay.classList.remove('active');
        arrowSelect.classList.remove('active');
        dropdownWrapper.classList.remove('active');
        selectLabel.classList.add('active');

        // Show all options again
        options.forEach(opt => {
          opt.style.display = 'block';
        });
      });
    });
  });
}
activateCustomDropdowns();
function resetCustomDropdowns() {
  const customDropdowns = document.querySelectorAll('.custom-dropdown');
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
    selectedValue.classList.remove('d-block');
    selectedValue.classList.remove('mt-2');
    selectedValue.classList.remove('fw-semibold');
    selectedValue.classList.remove('default');
    selectedValue.classList.remove('pt-1');
    selectedValue.innerHTML = selectLabel.innerHTML;
    selectDisplay.classList.remove('selected');
    selectDisplay.classList.remove('active');
    selectLabel.classList.remove('active');
    searchInput.value = '';
    dropdownContainer.classList.remove('active');
    dropdownWrapper.classList.remove('active');
    arrowSelect.classList.remove('active');
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
        hiddenInput.value = option.getAttribute('data-value');

        // Close dropdown
        dropdownContainer.classList.remove('active');

        // Clear search input
        searchInput.value = '';
        selectDisplay.classList.remove('active');
        arrowSelect.classList.remove('active');
        dropdownWrapper.classList.remove('active');
        selectLabel.classList.add('active');

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

// for reviews slider
const sliderReviews = document.querySelector('.reviews .swiffy-slider');
let activeSlide = 0;
if (sliderReviews) {
  const reviews = sliderReviews;
  const items = reviews.querySelectorAll('li');
  const itemWidth = items[0].getBoundingClientRect().width;
  const dublicates = document.querySelector('.reviews__dublicates');
  const reviewsWrapper = document.querySelector('.reviews-dublicates-wrapper');

  // generate indicator buttons

  const indicators = document.querySelector('.indicators');
  const amountOfSlides = sliderReviews.querySelectorAll("li").length;
  indicators.innerHTML = '';
  for (let i = 0; i < amountOfSlides - 2; i++) {
    indicators.insertAdjacentHTML('beforeend', `<li data-slide=${i} class=${i === 0 ? 'active' : ''}></li>`);
  }
  const allIndicators = indicators.querySelectorAll('li');
  allIndicators.forEach(item => {
    item.addEventListener('click', () => {
      allIndicators.forEach(elem => elem.classList.remove('active'));
      item.classList.add('active');
      activeSlide = +item.dataset.slide;
      swiffyslider.slideTo(sliderReviews, activeSlide);
      dublicates.scrollTo({
        left: dublicates.children[activeSlide].offsetLeft - 5,
        behavior: 'smooth'
      });
      dublicates.querySelectorAll(".reviews__slide").forEach(item => item.classList.remove('hide'));
      dublicates.children[activeSlide + 1].classList.add('hide');
      dublicates.children[activeSlide + 2].classList.add('hide');
      dublicates.children[activeSlide + 3].classList.add('hide');
    });
  });

  // position dublicates container

  const rect1 = dublicates.children[1].offsetLeft + reviewsWrapper.offsetLeft;
  const reviewsRect = reviews.offsetLeft;
  console.log(rect1, reviewsRect);
  const diff = rect1 - reviewsRect - 14;
  reviewsWrapper.style.transform = `translate(-${diff}px, -389px)`;

  // change slide on click

  for (let i = 0; i < dublicates.children.length; i++) {
    let slide = dublicates.children[i];
    slide.addEventListener('click', () => {
      if (!slide.classList.contains('hide')) {
        let idx = +slide.dataset.forMid;
        if (idx > 3) {
          idx -= 3;
          swiffyslider.slideTo(sliderReviews, idx);
          dublicates.scrollTo({
            left: dublicates.children[idx].offsetLeft - 5,
            behavior: 'smooth'
          });
          dublicates.querySelectorAll(".reviews__slide").forEach(item => item.classList.remove('hide'));
          dublicates.children[idx + 1].classList.add('hide');
          dublicates.children[idx + 2].classList.add('hide');
          dublicates.children[idx + 3].classList.add('hide');
          allIndicators.forEach(ind => {
            if (+ind.dataset.slide !== idx) {
              ind.classList.remove('active');
            } else {
              ind.classList.add('active');
            }
          });
        } else {
          idx -= 1;
          swiffyslider.slideTo(sliderReviews, idx);
          dublicates.scrollTo({
            left: dublicates.children[idx].offsetLeft - 5,
            behavior: 'smooth'
          });
          dublicates.querySelectorAll(".reviews__slide").forEach(item => item.classList.remove('hide'));
          dublicates.children[idx + 1].classList.add('hide');
          dublicates.children[idx + 2].classList.add('hide');
          dublicates.children[idx + 3].classList.add('hide');
          allIndicators.forEach(ind => {
            if (+ind.dataset.slide !== idx) {
              ind.classList.remove('active');
            } else {
              ind.classList.add('active');
            }
          });
        }
      }
    });
  }

  // reviews dublicates positioning

  dublicates.querySelectorAll(".reviews__slide").forEach(item => {
    item.style.width = itemWidth + 'px';
  });
}

// reviews height

let r = document.querySelector('.reviews');
if (r) {
  if (document.body.clientWidth > 1400) {
    r.style.height = `${504}px`;
  } else {
    r.style.height = 'auto';
  }
}
window.onresize = () => {
  if (r) {
    if (document.body.clientWidth > 1400) {
      r.style.height = `${r.querySelector('.container').clientHeight}px`;
    } else {
      r.style.height = '0';
    }
  }
};

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

// popup book s-th

const popupBook = document.querySelector('.popup-book');
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
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
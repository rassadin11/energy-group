/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
console.log('components');

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
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");


// dropdown

const dropdowns = document.querySelectorAll('.menu__dropdown');
const headerWrapper = document.querySelector('.header__wrapper');
dropdowns.forEach(item => {
  const navLink = item.querySelector('.nav-link');
  const dropdownMenu = item.querySelector('.dropdown-menu');
  item.addEventListener('mouseover', e => {
    if (e.target.classList.contains('nav-link')) {
      dropdownMenu.classList.add('active');
      // navLink.querySelector('.arrow').classList.add('active');
      headerWrapper.classList.add('active');
    }
  });
  item.addEventListener('mouseleave', () => {
    // закрываем меню
    item.querySelector('.dropdown-menu').classList.remove('active');
    // navLink.querySelector('.arrow').classList.remove('active');
    headerWrapper.classList.remove('active');
  });
});

// mobile menu generator

const mobileTitle = document.querySelector('.mobile-menu-title');
const attrLayouts = document.querySelectorAll("[data-layout]");
const initialMenu = document.querySelectorAll('[data-initial-layout]');
const mobileMenu = {};

// добавляем в массив главное меню
mobileMenu[0] = [mobileTitle.innerHTML];
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

// добавляем в массив изначальное меню

function menuGenerator(elements, mainMenuField) {
  mobileTitle.innerHTML = elements[0];
  mainMenuField.innerHTML = '';
  for (let i = 1; i < elements.length; i++) {
    if (elements[i].length === 2) {
      mainMenuField.insertAdjacentHTML(`beforeend`, `
                <li class="d-flex justify-content-between align-items-center py-3" data-layout="${elements[i][1]}">
                    <span>${elements[i][0]}</span>
                    <svg class="small-arrow">
                        <use xlink:href="./img/svg/sprite.svg#small-arrow"></use>
                    </svg>
                </li>
            `);
    } else {
      mainMenuField.insertAdjacentHTML(`beforeend`, `
                <li class="py-3"><a href="#">${elements[i][0]}</a></li>
            `);
    }
  }
}
let m_history = [];
const mainMenuField = document.querySelector('.overlay-menu ul');
menuGenerator(mobileMenu[0], mainMenuField);
function computeMobileMenu() {
  const mainLayouts = mainMenuField.querySelectorAll("[data-layout]");
  mainLayouts.forEach(item => {
    item.addEventListener('click', () => {
      const layout = +item.dataset.layout;
      m_history.push(layout);
      mainMenuField.innerHTML = '';

      // создаём новый список
      let elements;
      if (m_history.length) {
        elements = mobileMenu[m_history.at(-1)];
      }
      menuGenerator(elements, mainMenuField);
      computeMobileMenu();
    });
  });
}
computeMobileMenu();

// mobile overlays

// search

const searchButton = document.querySelector('.header__mobile-icons .search');
const searchOverlay = document.querySelector('.overlay-search');
const backgroundPopup = document.querySelector('.background-popup');
const crossSearch = document.querySelector('.cross-search');
searchButton.addEventListener('click', () => {
  searchOverlay.classList.toggle('active');
  backgroundPopup.classList.toggle('active');
});
crossSearch.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
});

// contacts

const contactsButton = document.querySelector('.header__mobile-icons .contacts');
const contactsOverlay = document.querySelector('.overlay-contacts');
const crossContact = document.querySelector('.cross-contact');
contactsButton.addEventListener('click', () => {
  contactsOverlay.classList.toggle('active');
  backgroundPopup.classList.toggle('active');
});
crossContact.addEventListener('click', () => {
  contactsOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
});

// menu-burger

const burger = document.querySelector('.header__mobile-icons .burger');
const menuOverlay = document.querySelector('.overlay-menu');
const crossMenu = document.querySelector('.cross-menu');
burger.addEventListener('click', () => {
  menuOverlay.classList.toggle('active');
});
crossMenu.addEventListener('click', () => {
  menuOverlay.classList.remove('active');
  setTimeout(() => {
    m_history = [];
    menuGenerator(mobileMenu[0], mainMenuField);
    computeMobileMenu();
  }, 300);
});

// reset overlays on click on backgroundPopup
backgroundPopup.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  backgroundPopup.classList.remove('active');
  contactsOverlay.classList.remove('active');
  menuOverlay.classList.remove('active');
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
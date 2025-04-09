import './components/slider.js'

// dropdown

const dropdowns = document.querySelectorAll('.menu__dropdown');
const headerWrapper = document.querySelector('.header__wrapper')

function activateDropdownMenu() {
    if (document.body.clientWidth > 992) {
        dropdowns.forEach((item) => {
            const dropdownMenu = item.querySelector('.dropdown-menu');

            item.addEventListener('mouseover', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    dropdownMenu.classList.add('active');
                    headerWrapper.classList.add('active');
                }
            })

            item.addEventListener('mouseleave', () => {
                // закрываем меню
                item.querySelector('.dropdown-menu').classList.remove('active');
                headerWrapper.classList.remove('active');
            })
        })
    } else {
        dropdowns.forEach((item) => {
            const dropdownMenu = item.querySelector('.dropdown-menu');

            item.querySelector('.nav-link').addEventListener('click', () => {
                if (!dropdownMenu.classList.contains('active')) {
                    let height = 0;
                    dropdownMenu.querySelectorAll('& > *').forEach(item => {
                        height += item.clientHeight;
                    })

                    dropdownMenu.style.maxHeight = height + 5 + 'px'
                } else {
                    dropdownMenu.style.maxHeight = 0;
                }

                dropdownMenu.classList.toggle('active');
                item.querySelector('.small-arrow').classList.toggle('active');
            })
        })
    }
}

function resetDropdown() {
    dropdowns.forEach((item) => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        dropdownMenu.classList.remove('active')
        item.querySelector('.small-arrow').classList.remove('active');

        dropdownMenu.style.maxHeight = 0
    })
}

activateDropdownMenu();
window.addEventListener('resize', () => {
    activateDropdownMenu();
})

// catalogue overlay pc

const catalogueButton = document.querySelector('.header__catalogue');
const catalogueOverlay = document.querySelector('.catalogue-header__overlay');
const headerMenu = document.querySelector('.header-menu-wrapper')

headerMenu.addEventListener('mouseover', (e) => {
    if (e.target === catalogueButton) {
        catalogueOverlay.classList.add('active');
    }
})

headerMenu.addEventListener('mouseleave', (e) => {
    catalogueOverlay.classList.remove('active');
})

catalogueOverlay.addEventListener('mouseleave', () => {
    catalogueOverlay.classList.remove('active')
})

// catalogue overlay mobile

const mobileTitle = document.querySelector('.mobile-menu__title')
const attrLayouts = document.querySelectorAll("[data-layout]")
const initialMenu = document.querySelectorAll('[data-initial-layout]')
const mobileMenu = {}

// добавляем в массив главное меню
mobileMenu[0] = []

initialMenu.forEach(item => {
    const title = item.querySelector('span').innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim()
    if (+item.dataset.layout) {
        mobileMenu[0] = [...mobileMenu[0], [title, +item.dataset.layout]]
    } else {
        mobileMenu[0] = [...mobileMenu[0], [title]]
    }
})

// на первой итерации собираем все заголовки
attrLayouts.forEach(item => {
    if (item.dataset.position.includes('header')) {
        const headerPosition = item.dataset.position.replace(" ", "").split(",").indexOf('header');
        const layouts = item.dataset.layout.split(",")
        const itemTitle = item.querySelector("span").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();

        mobileMenu[`${+layouts[headerPosition]}`] = [itemTitle]
    }
})

console.log(mobileMenu)

// на второй итерации составляем меню
attrLayouts.forEach(item => {
    if (item.dataset.position.includes('element')) {
        const layouts = item.dataset.layout.split(",")
        let itemTitle;

        if (item.querySelector("a")) {
            itemTitle = item.querySelector("a").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim()
        } else {
            itemTitle = item.querySelector("span").innerHTML.replace(/\s+/g, ' ').replace('&nbsp;', " ").trim();
        }

        if (layouts.length === 1) {
            if (mobileMenu[+layouts[0]]) {
                mobileMenu[+layouts[0]] = [...mobileMenu[+layouts[0]], [itemTitle]]
            } else {
                mobileMenu[+layouts[0]] = [[itemTitle]]
            }
        } else {
            if (mobileMenu[+layouts[0]]) {
                mobileMenu[+layouts[0]] = [...mobileMenu[+layouts[0]], [itemTitle, +layouts[1]]]
            } else {
                mobileMenu[+layouts[0]] = [[itemTitle, +layouts[1]]]
            }
        }
    }
})

// search

const searchButton = document.querySelector('.header__mobile-icons .search');
const searchOverlay = document.querySelector('.overlay-search');
const backgroundPopup = document.querySelector('.background-popup');
const crossSearch = document.querySelector('.cross-search');

searchButton.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    backgroundPopup.classList.toggle('active');

    document.querySelector('.header-menu-wrapper').classList.remove('active');
    document.querySelector('.overlay-contacts').classList.remove('active')

    if (headerWrapper.classList.contains('active')) {
        setTimeout(() => {
            headerWrapper.classList.remove('active')
        }, 300)
    } else {
        headerWrapper.classList.toggle('active')
    }
})

crossSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    backgroundPopup.classList.remove('active');

    setTimeout(() => {
        headerWrapper.classList.remove('active')
    }, 300)
})

// contacts

const contactsButton = document.querySelector('.header__mobile-icons .contacts');
const contactsOverlay = document.querySelector('.overlay-contacts');
const crossContact = document.querySelector('.cross-contact');

contactsButton.addEventListener('click', () => {
    contactsOverlay.classList.toggle('active');
    backgroundPopup.classList.toggle('active');
    document.querySelector('.header-menu-wrapper').classList.remove('active');
    searchOverlay.classList.remove('active')

    if (headerWrapper.classList.contains('active')) {
        setTimeout(() => {
            headerWrapper.classList.remove('active')
        }, 300)
    } else {
        headerWrapper.classList.toggle('active')
    }
})

crossContact.addEventListener('click', () => {
    contactsOverlay.classList.remove('active');
    backgroundPopup.classList.remove('active');

    setTimeout(() => {
        headerWrapper.classList.remove('active')
    }, 300)
})

// place overlay
const placeButton = document.querySelector('.header__mobile-icons .place');
const placeOverlay = document.querySelector('.overlay-place');
const crossPlace = placeOverlay.querySelector('.cross-place');

placeButton.addEventListener('click', () => {
    placeOverlay.classList.toggle('active');
    backgroundPopup.classList.toggle('active');
    document.querySelector('.header-menu-wrapper').classList.remove('active');
    searchOverlay.classList.remove('active')

    if (headerWrapper.classList.contains('active')) {
        setTimeout(() => {
            headerWrapper.classList.remove('active')
        }, 300)
    } else {
        headerWrapper.classList.toggle('active')
    }
})

crossPlace.addEventListener('click', () => {
    placeOverlay.classList.remove('active');
    backgroundPopup.classList.remove('active');

    setTimeout(() => {
        headerWrapper.classList.remove('active')
    }, 300)
})


// contacts popup

const contactsWrapper = document.querySelector('.contacts-wrapper')
const contactsWhiteBackground = contactsWrapper.querySelector('.contacts-wrapper__background');
const contactsBlackBackground = document.querySelector('.contacts-wrapper__black-background');
const arrowExtra = document.querySelector('.toggle-extra')
const extraPhone = contactsWrapper.querySelector('.extra-phone');
let contactsPopupHeight = 0;
arrowExtra.addEventListener('click', () => {
    contactsPopupHeight = 0;

    if (!contactsBlackBackground.classList.contains('active')) {
        contactsPopupHeight += contactsWrapper.querySelector('.header__contacts').offsetHeight;
        contactsPopupHeight += extraPhone.offsetHeight;

        contactsWhiteBackground.style.height = contactsPopupHeight + 40 + 'px'
    } else {
        contactsWhiteBackground.style.height = 0 + 'px'
    }

    contactsBlackBackground.classList.toggle('active')
    arrowExtra.classList.toggle('active')
    extraPhone.classList.toggle('active')
})

// place popup pc

const headerCity = document.querySelector('.pre-header__city');
const cityPopup = document.querySelector('.header-pc__overlay');
const cityCross = cityPopup.querySelector('.cross-place')
headerCity.addEventListener('click', () => {
    cityPopup.classList.add('active')
    contactsBlackBackground.classList.add('active')
})

cityCross.addEventListener('click', () => {
    cityPopup.classList.remove('active')
    contactsBlackBackground.classList.remove('active')
})

contactsBlackBackground.addEventListener('click', () => {
    contactsWhiteBackground.style.height = 0 + 'px'
    contactsBlackBackground.classList.remove('active')
    extraPhone.classList.remove('active')
    cityPopup.classList.remove('active')
    arrowExtra.classList.remove('active')
})

// menu-burger

const burger = document.querySelector('.header__mobile-icons .burger');
const menuOverlay = document.querySelector('.header-menu-wrapper')
const crossMenu = document.querySelector('.cross-menu')

burger.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');
})

crossMenu.addEventListener('click', () => {
    menuOverlay.classList.remove('active');

    setTimeout(() => {
        resetDropdown()
    }, 300)
})

// reset overlays on click on backgroundPopup
backgroundPopup.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    backgroundPopup.classList.remove('active');
    contactsOverlay.classList.remove('active');
    menuOverlay.classList.remove('active');

    setTimeout(() => {
        headerWrapper.classList.remove('active')
    }, 300)
})


// selects

document.querySelectorAll('.custom-select').forEach(select => {
    select.addEventListener('change', function () {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });

    // Инициализация при загрузке
    if (select.value) {
        select.classList.add('has-value');
    }
});

// params-block__button

const paramsButtons = document.querySelectorAll('.params-block .params-block__button')

paramsButtons.forEach(elem => {
    elem.addEventListener('click', () => {
        paramsButtons.forEach(item => item.classList.remove('active'))
        elem.classList.add('active')
    })
})

// params overlay

const paramsWrapper = document.querySelector('.params-overlay__wrapper')
const paramsOverlay = document.querySelector('.params-overlay')
const paramsCross = paramsOverlay.querySelector('.cross-place')
const paramsButton = document.querySelectorAll('.params-show-popup')

paramsButton.forEach(btn => {
    btn.addEventListener('click', () => {
        paramsWrapper.classList.add('active')
        paramsOverlay.classList.add('active')
        document.body.classList.add('overflow-hidden')
    })
})

paramsWrapper.addEventListener('click', () => {
    paramsWrapper.classList.remove('active')
    paramsOverlay.classList.remove('active')
    document.body.classList.remove('overflow-hidden')
})

paramsCross.addEventListener('click', () => {
    paramsWrapper.classList.remove('active')
    paramsOverlay.classList.remove('active')
    document.body.classList.remove('overflow-hidden')
})

// params-block__button inside overlay

const paramsButtonsOverlay = document.querySelectorAll('.params-overlay__buttons .params-block__button')

paramsButtonsOverlay.forEach(elem => {
    elem.addEventListener('click', () => {
        paramsButtonsOverlay.forEach(item => item.classList.remove('active'))
        elem.classList.add('active')
    })
})

// country accordeon

const countryBlocks = document.querySelectorAll(".blocks-manufacturers__block")

countryBlocks.forEach(item => {
    item.addEventListener('click', () => {
        item.querySelector('.arrow').classList.toggle('active')
        const companiesBlock = item.querySelector('.block-manufacturers__companies')

        if (item.querySelector('.arrow').classList.contains('active')) {
            const companiesAll = item.querySelectorAll('.block-manufacturers__companies > *')
            let initialWidth = 0;

            companiesAll.forEach(elem => initialWidth += elem.clientWidth + 12 + 5)
            const amountOfRows = Math.ceil(initialWidth / item.clientWidth)

            companiesBlock.style.maxHeight = companiesAll[0].clientHeight * amountOfRows + amountOfRows * 12 + 26 + 'px'
            companiesBlock.classList.add('active')
        } else {
            companiesBlock.style.maxHeight = '0px'
            companiesBlock.classList.remove('active')
        }
    })
})
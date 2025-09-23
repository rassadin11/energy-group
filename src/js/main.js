import './components/slider.js';

// dropdown
const dropdowns = document.querySelectorAll('.menu__dropdown');
const headerWrapper = document.querySelector('.header__wrapper')

function activateDropdownMenu() {
    if (document.body.clientWidth > 992) {
        dropdowns.forEach((item) => {
            const dropdownMenu = item.querySelector('.dropdown-menu');

            item.addEventListener('mouseover', (e) => {
                dropdowns.forEach(elem => {
                    elem.querySelector('.dropdown-menu').classList.remove('active')
                })

                dropdownMenu.classList.add('active');
                headerWrapper.classList.add('active');
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
    if (catalogueButton.contains(e.target) || catalogueOverlay.contains(e.target)) {
        catalogueOverlay.classList.add('active');
    } else {
        catalogueOverlay.classList.remove('active');
    }
})

headerMenu.addEventListener('mouseleave', () => {
    catalogueOverlay.classList.remove('active')
})

headerMenu.addEventListener('click', (e) => {
    if (catalogueButton.contains(e.target)) {
        catalogueOverlay.classList.toggle('active');
    }
})

catalogueOverlay.addEventListener('mouseleave', () => {
    catalogueOverlay.classList.remove('active')
})

// catalogue overlay mobile

const mobileTitle = document.querySelector('.mobile-catalogue__title')
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

// click catalogue mobile

function menuGenerator(elements, mainMenuField) {
    mobileTitle.innerHTML = elements[0]
    mainMenuField.innerHTML = ''

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
            `)
        } else {
            mainMenuField.insertAdjacentHTML(`beforeend`, `
                <li class="nav-item">
                    <a href="#" class="py-lg-3 py-2 d-block"><span>${elements[i][0]}</span></a>
                </li>
            `)
        }
    }
}

// составляем само меню при нажатии на кнопки

let m_history = [];
const arrowBack = document.querySelector('.mobile-catalogue-arrow')
const overlayMenu = document.querySelector('.overlay-menu')
const mobileCatalogue = document.querySelector('.mobile-catalogue__content');

function computeMobileMenu() {
    const catalogueItem = document.querySelector(".mobile-catalogue")
    const dataLayout = document.querySelectorAll('[data-layout]');

    catalogueItem.addEventListener('click', () => {
        overlayMenu.classList.add('d-none')
        mobileCatalogue.classList.remove('d-none')

        m_history.push(0)

        let elements;

        if (!m_history.length) {
            arrowBack.classList.remove('active')
        } else {
            arrowBack.classList.add('active')
            elements = mobileMenu[m_history.at(-1)];
        }

        menuGenerator(elements, mobileCatalogue.querySelector('.header-menu'))
        computeMobileMenu();
    })

    dataLayout.forEach(item => {
        item.addEventListener('click', () => {
            mobileCatalogue.querySelector('.header-menu').innerHTML = ''

            m_history.push(+item.dataset.layout)

            let elements;

            if (!m_history.length) {
                arrowBack.classList.remove('active')
            } else {
                arrowBack.classList.add('active')
                elements = mobileMenu[m_history.at(-1)];
            }

            menuGenerator(elements, mobileCatalogue.querySelector('.header-menu'))
            computeMobileMenu();
        })
    })
}

arrowBack.addEventListener('click', () => {
    if (m_history.length) {
        m_history.pop();

        let elements;


        if (!m_history.length) {
            arrowBack.classList.remove('active')
            overlayMenu.classList.remove('d-none')
            mobileCatalogue.classList.add('d-none')
        } else {
            elements = mobileMenu[m_history.at(-1)];
        }

        menuGenerator(elements, mobileCatalogue.querySelector('.header-menu'))
        computeMobileMenu();
    }
})

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

    document.body.classList.toggle('overflow-hidden')

    document.querySelector('.header-menu-wrapper').classList.remove('active');
    document.querySelector('.overlay-contacts').classList.remove('active')
    document.querySelector('.overlay-place').classList.remove('active')

    if (searchOverlay.classList.contains('active')) {
        headerWrapper.classList.add('active')
    } else {
        setTimeout(() => {
            headerWrapper.classList.remove('active')
        }, 300)
    }
})

crossSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    backgroundPopup.classList.remove('active');
    document.body.classList.remove('overflow-hidden')

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
    document.body.classList.toggle('overflow-hidden')

    if (contactsOverlay.classList.contains('active')) {
        backgroundPopup.classList.add('active');
    } else {
        backgroundPopup.classList.remove('active');
    }

    document.querySelector('.header-menu-wrapper').classList.remove('active');
    searchOverlay.classList.remove('active')

    document.querySelector('.header-menu-wrapper').classList.remove('active');
    document.querySelector('.overlay-place').classList.remove('active')

    if (contactsOverlay.classList.contains('active')) {
        headerWrapper.classList.add('active')
    } else {
        setTimeout(() => {
            headerWrapper.classList.remove('active')
        }, 300)
    }
})

crossContact.addEventListener('click', () => {
    contactsOverlay.classList.remove('active');
    backgroundPopup.classList.remove('active');
    document.body.classList.remove('overflow-hidden')

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
    document.body.classList.toggle('overflow-hidden')

    if (placeOverlay.classList.contains('active')) {
        backgroundPopup.classList.add('active');
    } else {
        backgroundPopup.classList.remove('active');
    }

    document.querySelector('.header-menu-wrapper').classList.remove('active');
    searchOverlay.classList.remove('active')

    document.querySelector('.header-menu-wrapper').classList.remove('active');
    document.querySelector('.overlay-contacts').classList.remove('active')
    document.querySelector('.overlay-search').classList.remove('active')

    if (placeOverlay.classList.contains('active')) {
        headerWrapper.classList.add('active')
    } else {
        setTimeout(() => {
            headerWrapper.classList.remove('active')
        }, 300)
    }
})

crossPlace.addEventListener('click', () => {
    placeOverlay.classList.remove('active');
    backgroundPopup.classList.remove('active');
    document.body.classList.remove('overflow-hidden')

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

contactsWrapper.addEventListener('mouseover', () => {
    contactsPopupHeight = 0;
    contactsPopupHeight += contactsWrapper.querySelector('.header__contacts').offsetHeight;
    contactsPopupHeight += extraPhone.offsetHeight;
    contactsWhiteBackground.style.height = contactsPopupHeight + 40 + 'px'

    contactsBlackBackground.classList.add('active')
    arrowExtra.classList.add('active')
    extraPhone.classList.add('active')
})

contactsWrapper.addEventListener('mouseleave', () => {
    contactsWhiteBackground.style.height = 0 + 'px'
    contactsBlackBackground.classList.remove('active')
    arrowExtra.classList.remove('active')
    extraPhone.classList.remove('active')
})

// ширина скроллбара
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

// place popup pc
const headerCity = document.querySelector('.pre-header__city');
const cityPopup = document.querySelector('.header-pc__overlay');
const cityCross = cityPopup.querySelector('.cross-place')
headerCity.addEventListener('click', () => {
    cityPopup.classList.add('active')
    contactsBlackBackground.classList.add('active')
    document.body.classList.add('overflow-hidden')
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
        document.querySelector('.headers').style.paddingRight = `${scrollbarWidth}px`;
    }
})

cityCross.addEventListener('click', () => {
    cityPopup.classList.remove('active')
    contactsBlackBackground.classList.remove('active')
    document.body.classList.remove('overflow-hidden')
    document.body.style.paddingRight = `${0}px`;
    document.querySelector('.headers').style.paddingRight = `${0}px`;
})

contactsBlackBackground.addEventListener('click', () => {
    contactsWhiteBackground.style.height = 0 + 'px'
    contactsBlackBackground.classList.remove('active')
    extraPhone.classList.remove('active')
    cityPopup.classList.remove('active')
    arrowExtra.classList.remove('active')
    document.body.classList.remove('overflow-hidden')
    document.body.style.paddingRight = `${0}px`;
    document.querySelector('.headers').style.paddingRight = `${0}px`;
})

// menu-burger

const burger = document.querySelector('.header__mobile-icons .burger');
const menuOverlay = document.querySelector('.header-menu-wrapper')
const crossMenu = document.querySelector('.cross-menu')

burger.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');

    backgroundPopup.classList.remove('active');
    searchOverlay.classList.remove('active');
    contactsOverlay.classList.remove('active');
    placeOverlay.classList.remove('active');

    document.body.classList.add('overflow-hidden')
})

crossMenu.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.classList.remove('overflow-hidden')

    setTimeout(() => {
        resetDropdown()
    }, 300)
})

// reset overlays on click on backgroundPopup
backgroundPopup.addEventListener('click', () => {
    backgroundPopup.classList.remove('active');

    searchOverlay.classList.remove('active');
    contactsOverlay.classList.remove('active');
    placeOverlay.classList.remove('active');
    menuOverlay.classList.remove('active');

    document.body.classList.remove('overflow-hidden')

    setTimeout(() => {
        headerWrapper.classList.remove('active')
    }, 300)
})

// params-block__button

const paramsBlock = document.querySelector('.params-block')

if (paramsBlock) {
    const paramsButtons = paramsBlock.querySelectorAll('.params-block__button')

    // initial params for diesel

    const diesel_power = ['12 кВт', '15 кВт', '16 кВт', '20 кВт', '24 кВт', '25 кВт', '30 кВт', '35 кВт', '40 кВт', '45 кВт', '48 кВт', '50 кВт', '60 кВт', '70 кВт', '75 кВт', '80 кВт', '100 кВт', '75 кВт', '110 кВт', '120 кВт', '130 кВт', '150 кВт', '160 кВт', '180 кВт', '200 кВт', '240 кВт', '250 кВт', '300 кВт', '320 кВт', '350 кВт', '400 кВт', '450 кВт', '500 кВт', '600 кВт', '700 кВт', '800 кВт', '900 кВт', '1000 кВт', '1100 кВт', '1200 кВт', '1500 кВт', '150 кВт', '1600 кВт', '2000 кВт', '200 кВт']
    const diesel_engine = ['Aksa', 'BOUDOUIN', 'Cooper', 'Cummins', 'Deutz', 'Doosan', 'Hino', 'Isuzu', 'IVECO', 'Komatsu', 'Kubota', 'Lister Petter', 'Lombardini', 'Mitsubishi', 'MTU', 'Perkins', 'Ricardo', 'Scania', 'SDEC', 'TSS Diesel', 'Weichai', 'Weifang', 'YangDong', 'Yanmar', 'Yuchai', 'MM3', 'ЯМЗ']
    const diesel_developers = ['Gazvolt', 'Genese', 'Motor', 'REG', 'Азимут', 'Амперос', 'Вепрь', 'Дизель', 'Добрыня', 'Исток', 'Старт', 'ТСС', 'ФАС', 'Фрегат', 'AGG', 'CTG', 'Firman', 'MingPowers', 'PowerLink', 'Toyo', 'Aksa', 'EMSA', 'Hertz', 'Zeus', 'Airman', 'Denyo', 'Kubota', 'Mitsubishi', 'Yamaha', 'Yanmar', 'Briggs &amp; Stratton', 'Chicago Pneumatic', 'Cummins', 'Generac', 'Honeywell', 'Mirkon Energy', 'ELCOS', 'FPT', 'Genmac', 'GMGen', 'Onis Visa', 'Pramac', 'Fubag', 'Geko', 'Henkelhausen', 'RID', 'FG Wilson', 'JCB', 'EUROPOWER', 'Gesan', 'Himoinsa', 'FOGO', 'Atlas Copco', 'Energo', 'SDMO']
    const diesel_tension = ["230 B", "230/400 B"]
    const diesel_out_tension = ["230/400 B", "230 B"]
    const diesel_amortization = ["1 - ручной ввод", "2 - автозапуск"]

    // initial params for patrol

    const patrol_power = ['15 кВт', '16 кВт', '17 кВт', '18 кВт']
    const patrol_engine = ['Briggs and Stratton Vanguard', 'Fubag', 'Loncin']
    const patrol_developers = ['EuroPower', 'Fubag', 'Geko', 'Исток', 'ТСС']
    const patrol_tension = ["230 B", "230/400 B"]
    const patrol_out_tension = ["230/400 B", "230 B"]
    const patrol_amortization = ["1 - ручной ввод", "2 - автозапуск"]

    // select blocks for small block
    const power_small_select = document.querySelector(".power.small-block .dropdown-options")
    const tension_small_select = document.querySelector(".tension.small-block .dropdown-options")
    const engine_small_select = document.querySelector(".engine.small-block .dropdown-options")
    const developers_small_select = document.querySelector(".developer.small-block .dropdown-options")

    // connection between select and values
    const all_small_selects = [[power_small_select, diesel_power, patrol_power], [tension_small_select, diesel_tension, patrol_tension],
    [engine_small_select, diesel_engine, patrol_engine], [developers_small_select, diesel_developers, patrol_developers]]

    paramsButtons.forEach(elem => {
        elem.addEventListener('click', () => {
            paramsButtons.forEach(item => item.classList.remove('active'))
            elem.classList.add('active')
            changeSelects(all_small_selects, elem.dataset.type);
        })
    })

    changeSelects(all_small_selects, 'diesel')

    function changeSelects(selects, type) {
        switch (type) {
            case "diesel":
                selects.forEach(select => {
                    changeSelect(select[0], select[1]);
                })

                resetCustomDropdowns();
                break;
            case "patrol":
                selects.forEach(select => {
                    changeSelect(select[0], select[2]);
                })

                resetCustomDropdowns();
                break;
        }
    }

    function changeSelect(select, initialData) {
        select.innerHTML = ''
        initialData.forEach(item => {
            select.insertAdjacentHTML('beforeend', `
            <div class="dropdown-option py-2 px-3" data-value="${item}">${item}</div>
        `)
        })
    }

    // params overlay

    try {
        const paramsWrapper = document.querySelector('.params-overlay__wrapper')
        const paramsOverlay = document.querySelector('.params-overlay')
        const paramsCross = paramsOverlay.querySelector('.cross-place')
        const paramsButton = document.querySelectorAll('.params-show-popup')

        paramsButton.forEach(btn => {
            btn.addEventListener('click', () => {
                paramsWrapper.classList.add('active')
                paramsOverlay.classList.add('active')
                document.body.classList.add('overflow-hidden')
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            })
        })

        paramsWrapper.addEventListener('click', () => {
            paramsWrapper.classList.remove('active')
            paramsOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })

        paramsCross.addEventListener('click', () => {
            paramsWrapper.classList.remove('active')
            paramsOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })
    } catch (e) {
        console.warn('error')
    }

    // params-block__button inside overlay

    const paramsButtonsOverlay = document.querySelectorAll('.params-overlay__buttons .params-block__button')

    if (paramsButtonsOverlay) {
        // select blocks for big block
        const power_big_select = document.querySelector(".power.big-block .dropdown-options")
        const tension_big_select = document.querySelector(".tension.big-block .dropdown-options")
        const engine_big_select = document.querySelector(".engine.big-block .dropdown-options")
        const developers_big_select = document.querySelector(".developer.big-block .dropdown-options")
        const out_tension_big_select = document.querySelector(".out-tension.big-block .dropdown-options")
        const amortization_big_select = document.querySelector(".amortization.big-block .dropdown-options")

        // connection between select and values
        const all_big_selects = [[power_big_select, diesel_power, patrol_power], [tension_big_select, diesel_tension, patrol_tension],
        [engine_big_select, diesel_engine, patrol_engine], [developers_big_select, diesel_developers, patrol_developers],
        [out_tension_big_select, diesel_out_tension, patrol_out_tension], [amortization_big_select, diesel_amortization, patrol_amortization]]

        paramsButtonsOverlay.forEach(elem => {
            elem.addEventListener('click', () => {
                paramsButtonsOverlay.forEach(item => item.classList.remove('active'))
                elem.classList.add('active')
                changeSelects(all_big_selects, elem.dataset.type);
            })
        })

        changeSelects(all_big_selects, 'diesel');
    }
}

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

// footer accordeon

const itemFooter = document.querySelectorAll('.item-footer')

itemFooter.forEach(item => {
    item.querySelector('.item-footer__title').addEventListener('click', () => {
        const list = item.querySelector('ul');
        let heightCounter = 0;

        if (item.classList.contains('active')) {
            list.style.maxHeight = 0;
        } else {
            list.querySelectorAll('li').forEach(elem => heightCounter += elem.clientHeight)
            heightCounter += (list.querySelectorAll('li').length - 1) * 8
            list.style.maxHeight = heightCounter + 'px'
        }

        item.classList.toggle('active')
        item.querySelector('.item-footer__title').classList.toggle('active')
        item.querySelector('.arrow').classList.toggle('active')
        item.querySelector('ul').classList.toggle('active')
    })
})

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

lightGallery(document.getElementById('animated-thumbnails'), {
    thumbnail: true,
    selector: '.blagodar-image__wrapper',
});

lightGallery(document.getElementById(`article-video`), {
    selector: 'this',
    iframeMaxHeight: '90%'
});

for (let i = 1; i <= 4; i++) {
    lightGallery(document.getElementById(`open-video-${i}`), {
        selector: 'this',
        iframeMaxHeight: '90%'
    });
}

for (let i = 1; i <= 6; i++) {
    lightGallery(document.getElementById(`video-review-${i}`), {
        selector: 'this',
        iframeMaxHeight: '90%'
    });
}

for (let i = 1; i <= 9; i++) {
    lightGallery(document.getElementById(`video-page-${i}`), {
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
    selector: '.certificate',
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
        const selectLabel = dropdown.querySelector('.select-label')
        const arrowSelect = dropdown.querySelector('.arrow')
        const dropdownWrapper = dropdown.querySelector('.dropdown-container-wrapper')

        // Toggle dropdown on click
        selectDisplay.addEventListener('click', () => {
            selectDisplay.classList.toggle('active');
            arrowSelect.classList.toggle('active');
            dropdownWrapper.classList.toggle('active')
            dropdownContainer.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                selectDisplay.classList.remove('active');
                arrowSelect.classList.remove('active');
                dropdownWrapper.classList.remove('active')
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
                selectedValue.classList.add('d-block')

                if (!selectedValue.classList.contains('no-title')) {
                    selectedValue.classList.add('mt-2')
                    selectedValue.classList.add('fw-semibold')
                } else {
                    selectedValue.classList.remove('default')
                }

                if (!selectDisplay.classList.contains('overlay')) {
                    selectedValue.classList.add('pt-1')
                }

                selectDisplay.classList.add('selected');

                // Update hidden input value
                hiddenInput.value = option.getAttribute('data-value');

                // Close dropdown
                dropdownContainer.classList.remove('active');

                // Clear search input
                if (searchInput) searchInput.value = '';
                selectDisplay.classList.remove('active');
                arrowSelect.classList.remove('active');
                dropdownWrapper.classList.remove('active')

                if (searchInput) selectLabel.classList.add('active');

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
        const selectLabel = dropdown.querySelector('.select-label')
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        const arrowSelect = dropdown.querySelector('.arrow')
        const dropdownWrapper = dropdown.querySelector('.dropdown-container-wrapper')

        // Select option on click
        selectedValue.classList.remove('d-block')
        selectedValue.classList.remove('mt-2')
        selectedValue.classList.remove('fw-semibold')
        selectedValue.classList.remove('default')
        selectedValue.classList.remove('pt-1')
        selectedValue.innerHTML = selectLabel.innerHTML

        selectDisplay.classList.remove('selected');
        selectDisplay.classList.remove('active');
        selectLabel.classList.remove('active');

        searchInput.value = '';
        dropdownContainer.classList.remove('active');
        dropdownWrapper.classList.remove('active')
        arrowSelect.classList.remove('active');

        options.forEach(option => {
            option.addEventListener('click', () => {
                selectedValue.textContent = option.textContent;
                selectedValue.classList.add('d-block')

                if (!selectedValue.classList.contains('no-title')) {
                    selectedValue.classList.add('mt-2')
                    selectedValue.classList.add('fw-semibold')
                } else {
                    selectedValue.classList.remove('default')
                }

                if (!selectDisplay.classList.contains('overlay')) {
                    selectedValue.classList.add('pt-1')
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
                dropdownWrapper.classList.remove('active')
                selectLabel.classList.add('active');

                // Show all options again
                options.forEach(opt => {
                    opt.style.display = 'block';
                });
            });
        });
    });
}

const allGenerators = document.querySelectorAll('.generators')

allGenerators.forEach(generator => {
    const generatorButtons = generator.querySelectorAll('.tabs-header__buttons .btn')
    const buttons = generator.querySelectorAll('.nav-tabs .nav-item')

    let activeTab = 0;
    let activeBtn = 0;

    if (generatorButtons) {
        buttons.forEach((button, idx) => {
            button.addEventListener('click', () => {
                activeTab = idx;

                generatorButtons.forEach((button, idx) => {
                    if (!idx) button.classList.add('active')
                    else button.classList.remove('active')
                })

                activeBtn = 0;
                showContent();
            })
        })

        generatorButtons.forEach((button, idx) => {
            button.addEventListener('click', () => {
                generatorButtons.forEach(item => item.classList.remove("active"))
                button.classList.add('active')
                activeBtn = idx;

                // validate tabs

                showContent();
            })
        })
    }

    function showContent() {
        const tabs = generator.querySelectorAll(`.tab-content .tab-pane:nth-child(${activeTab + 1}) .tab-cards`)

        tabs.forEach(tab => {
            tab.classList.add('d-none')
            tab.classList.remove('d-flex')
            tab.classList.remove('d-lg-grid')
        })

        tabs[activeBtn].classList.remove('d-none')
        tabs[activeBtn].classList.add('d-flex')
        tabs[activeBtn].classList.add('d-lg-grid')
    }
})

// arenda slider

if (document.querySelector('.usluga:not(.city-slider__wrapper) .swiffy-slider')) {
    const usluga = document.querySelector('.usluga:not(.city-slider__wrapper)')

    const nextButton = usluga.querySelector('.slider-nav.slider-nav-next')
    const prevButton = usluga.querySelector('.slider-nav:not(.slider-nav-next)')
    const amountOfSlides = usluga.querySelectorAll('.swiffy-slider li').length
    let activeSlider = 1;

    nextButton.classList.add('active')
    prevButton.classList.add('remove')

    const container = usluga.querySelector(".slider-container");
    const items = container.querySelectorAll("li");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.dataset.mid) {
                    activeSlider = +entry.target.dataset.mid;

                    if (activeSlider === amountOfSlides) {
                        nextButton.disabled = true;
                        nextButton.classList.remove('active')
                    } else if (activeSlider === 1) {
                        prevButton.disabled = true;
                        prevButton.classList.remove('active')
                    } else {
                        nextButton.disabled = false;
                        nextButton.classList.add('active')
                        prevButton.disabled = false;
                        prevButton.classList.add('active')
                    }
                }
            });
        },
        {
            root: container,
            threshold: 0.6,
        }
    );

    items.forEach((item) => observer.observe(item));

    nextButton.addEventListener('click', () => {
        if (activeSlider + 1 === amountOfSlides) {
            nextButton.disabled = true;
            nextButton.classList.remove('active')
        } else {
            nextButton.disabled = false;
            nextButton.classList.add('active')
        }

        if (activeSlider + 1 > 1) {
            prevButton.disabled = false;
            prevButton.classList.add('active')
        }
    })

    prevButton.addEventListener('click', () => {
        if (activeSlider - 1 === 1) {
            prevButton.disabled = true;
            prevButton.classList.remove('active')
        } else {
            prevButton.disabled = false;
            prevButton.classList.add('active')
        }

        if (activeSlider - 1 < amountOfSlides) {
            nextButton.disabled = false;
            nextButton.classList.add('active')
        }
    })
}

// for city slider
let activeCitySlider = 1;
let isObserver = true;

const buttons = document.querySelectorAll('.city-slider__buttons button')

if (document.querySelector('.usluga.city-slider__wrapper .swiffy-slider')) {
    const usluga = document.querySelector('.usluga.city-slider__wrapper')

    const nextButton = usluga.querySelector('.slider-nav.slider-nav-next')
    const prevButton = usluga.querySelector('.slider-nav:not(.slider-nav-next)')
    const amountOfSlides = usluga.querySelectorAll('.swiffy-slider li').length

    nextButton.classList.add('active')
    prevButton.classList.add('remove')

    const container = usluga.querySelector(".slider-container");
    const items = container.querySelectorAll("li");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.dataset.mid) {
                    if (!isObserver) return;

                    activeCitySlider = +entry.target.dataset.mid;

                    if (activeCitySlider === amountOfSlides) {
                        nextButton.disabled = true;
                        nextButton.classList.remove('active')
                        prevButton.disabled = false;
                        prevButton.classList.add('active')
                    } else if (activeCitySlider === 1) {
                        prevButton.disabled = true;
                        prevButton.classList.remove('active')
                        nextButton.disabled = false;
                        nextButton.classList.add('active')
                    } else {
                        nextButton.disabled = false;
                        nextButton.classList.add('active')
                        prevButton.disabled = false;
                        prevButton.classList.add('active')
                    }

                    activateButton(activeCitySlider - 1)
                }
            });
        },
        {
            root: container,
            threshold: 0.6,
        }
    );

    items.forEach((item) => observer.observe(item));

    nextButton.addEventListener('click', () => {
        if (activeCitySlider + 1 === amountOfSlides) {
            nextButton.disabled = true;
            nextButton.classList.remove('active')
        } else {
            nextButton.disabled = false;
            nextButton.classList.add('active')
        }

        if (activeCitySlider + 1 > 1) {
            prevButton.disabled = false;
            prevButton.classList.add('active')
        }
    })

    prevButton.addEventListener('click', () => {
        if (activeCitySlider - 1 === 1) {
            prevButton.disabled = true;
            prevButton.classList.remove('active')
        } else {
            prevButton.disabled = false;
            prevButton.classList.add('active')
        }

        if (activeCitySlider - 1 < amountOfSlides) {
            nextButton.disabled = false;
            nextButton.classList.add('active')
        }

    })

    buttons.forEach(item => {
        item.addEventListener('click', () => {
            buttons.forEach(elem => elem.classList.remove('active'))
            item.classList.add('active')

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
                nextButton.classList.remove('active')
                prevButton.disabled = false;
                prevButton.classList.add('active')
            } else if (activeCitySlider + 1 === 1) {
                prevButton.disabled = true;
                prevButton.classList.remove('active')
                nextButton.disabled = false;
                nextButton.classList.add('active')
            } else {
                nextButton.disabled = false;
                nextButton.classList.add('active')
                prevButton.disabled = false;
                prevButton.classList.add('active')
            }

            setTimeout(() => {
                isObserver = true;
            }, 1000)
        })
    })
}

function activateButton(activeBtn) {
    buttons.forEach(elem => elem.classList.remove('active'))
    buttons[activeBtn].classList.add('active')
}

// for reviews slider
const sliderReviews = document.querySelector('.reviews .swiffy-slider')
let activeSlide = 0;

if (sliderReviews) {
    const reviews = sliderReviews
    const items = reviews.querySelectorAll('li');
    const itemWidth = items[0].getBoundingClientRect().width;
    const dublicates = document.querySelector('.reviews__dublicates');
    const reviewsWrapper = document.querySelector('.reviews-dublicates-wrapper')

    // generate indicator buttons

    const indicators = document.querySelector('.indicators')
    const amountOfSlides = sliderReviews.querySelectorAll("li").length
    indicators.innerHTML = ''

    for (let i = 0; i < amountOfSlides - 2; i++) {
        indicators.insertAdjacentHTML('beforeend', `<li data-slide=${i} class=${i === 0 ? 'active' : ''}></li>`)
    }

    const allIndicators = indicators.querySelectorAll('li')

    allIndicators.forEach(item => {
        item.addEventListener('click', () => {
            allIndicators.forEach(elem => elem.classList.remove('active'))
            item.classList.add('active')

            activeSlide = +item.dataset.slide
            swiffyslider.slideTo(sliderReviews, activeSlide)

            dublicates.scrollTo({
                left: dublicates.children[activeSlide].offsetLeft - 5,
                behavior: 'smooth'
            })

            dublicates.querySelectorAll(".reviews__slide").forEach(item => item.classList.remove('hide'))
            dublicates.children[activeSlide + 1].classList.add('hide')
            dublicates.children[activeSlide + 2].classList.add('hide')
            dublicates.children[activeSlide + 3].classList.add('hide')
        })
    })

    // position dublicates container

    const rect1 = dublicates.children[1].offsetLeft + reviewsWrapper.offsetLeft
    const reviewsRect = reviews.offsetLeft

    const diff = rect1 - reviewsRect - 14

    reviewsWrapper.style.transform = `translate(-${diff}px, -389px)`

    // change slide on click

    for (let i = 0; i < dublicates.children.length; i++) {
        let slide = dublicates.children[i]

        slide.addEventListener('click', () => {
            if (!slide.classList.contains('hide')) {
                let idx = +slide.dataset.forMid

                if (idx > 3) {
                    idx -= 3
                    swiffyslider.slideTo(sliderReviews, idx)

                    dublicates.scrollTo({
                        left: dublicates.children[idx].offsetLeft - 5,
                        behavior: 'smooth'
                    })

                    dublicates.querySelectorAll(".reviews__slide").forEach(item => item.classList.remove('hide'))
                    dublicates.children[idx + 1].classList.add('hide')
                    dublicates.children[idx + 2].classList.add('hide')
                    dublicates.children[idx + 3].classList.add('hide')

                    allIndicators.forEach(ind => {
                        if (+ind.dataset.slide !== idx) {
                            ind.classList.remove('active')
                        } else {
                            ind.classList.add('active')
                        }
                    })
                } else {
                    idx -= 1
                    swiffyslider.slideTo(sliderReviews, idx)

                    dublicates.scrollTo({
                        left: dublicates.children[idx].offsetLeft - 5,
                        behavior: 'smooth'
                    })

                    dublicates.querySelectorAll(".reviews__slide").forEach(item => item.classList.remove('hide'))
                    dublicates.children[idx + 1].classList.add('hide')
                    dublicates.children[idx + 2].classList.add('hide')
                    dublicates.children[idx + 3].classList.add('hide')

                    allIndicators.forEach(ind => {
                        if (+ind.dataset.slide !== idx) {
                            ind.classList.remove('active')
                        } else {
                            ind.classList.add('active')
                        }
                    })
                }
            }
        })
    }

    // reviews dublicates positioning

    dublicates.querySelectorAll(".reviews__slide").forEach(item => {
        item.style.width = itemWidth + 'px';
    })
}

// reviews height

let r = document.querySelector('.reviews')

if (r) {
    if (document.body.clientWidth > 1400) {
        r.style.height = `${504}px`
    } else {
        r.style.height = 'auto'
    }
}

window.onresize = () => {
    if (r) {
        if (document.body.clientWidth > 1400) {
            r.style.height = `${r.querySelector('.container').clientHeight}px`
        } else {
            r.style.height = '0'
        }
    }
}

// for product page

function tooltipsPosition() {
    if (document.querySelector('.product')) {
        const borderRight = document.querySelector('.product .product__wrapper').getBoundingClientRect().right
        const customTooltips = document.querySelectorAll('.custom-tooltip')

        customTooltips.forEach(tool => {
            tool.style.right = 'inherit'
            tool.style.left = '80%'

            if (tool.getBoundingClientRect().right > borderRight) {
                tool.style.left = 'inherit'
                tool.style.right = '0'
            }
        })
    }
}

window.onresize = () => {
    tooltipsPosition()
}

tooltipsPosition()

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
}

window.onscroll = () => {
    checkStuck();
}

// popups

const popupRecall = document.querySelector('.popup-recall')

if (popupRecall) {
    const cross = popupRecall.querySelector('.popup-cross')
    const background = popupRecall.querySelector('.popup-background')

    cross.addEventListener('click', () => {
        popupRecall.classList.add('d-none')
        document.body.classList.remove('overflow-hidden')
        document.body.style.paddingRight = `0px`;

        if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
            document.querySelector('.headers').style.paddingRight = `0px`;
        }
    })

    background.addEventListener('click', () => {
        popupRecall.classList.add('d-none')
        document.body.classList.remove('overflow-hidden')
        document.body.style.paddingRight = `0px`;

        if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
            document.querySelector('.headers').style.paddingRight = `0px`;
        }
    })

    const openPopupRecall = document.querySelectorAll('.open-popup-recall')

    openPopupRecall.forEach(item => {
        item.addEventListener('click', () => {
            popupRecall.classList.remove('d-none')
            document.body.classList.add('overflow-hidden')
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
                document.querySelector('.headers').style.paddingRight = `${scrollbarWidth}px`;
            }
        })
    })
}
// popup book s-th

const popupBook = document.querySelector('.popup-book')

if (popupBook) {

    const crossBook = popupBook.querySelector('.popup-cross')
    const backgroundBook = popupBook.querySelector('.popup-background')

    crossBook.addEventListener('click', () => {
        popupBook.classList.add('d-none')
        document.body.classList.remove('overflow-hidden')
        document.body.style.paddingRight = `0px`;
    })

    backgroundBook.addEventListener('click', () => {
        popupBook.classList.add('d-none')
        document.body.classList.remove('overflow-hidden')
        document.body.style.paddingRight = `0px`;

        if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
            document.querySelector('.headers').style.paddingRight = `${0}px`;
        }
    })

    const openPopupBook = document.querySelectorAll('.open-popup-book')

    openPopupBook.forEach(item => {
        item.addEventListener('click', () => {
            popupBook.classList.remove('d-none')
            document.body.classList.add('overflow-hidden')
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            if (document.querySelector('.headers').style.position !== 'static' && document.querySelector('.headers').style.position !== '') {
                document.querySelector('.headers').style.paddingRight = `${scrollbarWidth}px`;
            }
        })
    })
}

try {
    const resumeWrapper = document.querySelector('.resume-overlay__wrapper')
    if (resumeWrapper) {
        const resumeOverlay = document.querySelector('.resume-overlay')
        const resumeCross = resumeOverlay.querySelector('.cross-place')
        const resumeButton = document.querySelectorAll('.resume-show-popup')

        resumeButton.forEach(btn => {
            btn.addEventListener('click', () => {
                resumeWrapper.classList.add('active')
                resumeOverlay.classList.add('active')
                document.body.classList.add('overflow-hidden')
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            })
        })

        resumeWrapper.addEventListener('click', () => {
            resumeWrapper.classList.remove('active')
            resumeOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })

        resumeCross.addEventListener('click', () => {
            resumeWrapper.classList.remove('active')
            resumeOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })
    }
} catch (e) {
    console.warn('error')
}

const fileInput = document.getElementById('pdf-upload');
const fileNameDisplay = document.getElementById('file-name');

if (fileInput) {
    fileInput.addEventListener('change', function (e) {
        if (this.files.length > 0) {
            const file = this.files[0];

            // Проверка типа файла
            if (file.type !== 'application/pdf') {
                alert('Пожалуйста, выберите файл в формате PDF.');
                this.value = '';
                fileNameDisplay.textContent = '';
                return;
            }

            // Проверка размера файла (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Файл слишком большой. Максимальный размер: 5MB.');
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

    fileInputLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileInputLabel.style.borderColor = '#3366FF';
    });

    fileInputLabel.addEventListener('dragleave', () => {
        fileInputLabel.style.borderColor = '#e7e9eb';
    });

    fileInputLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        fileInputLabel.style.borderColor = '#e7e9eb';

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
}

const vacanciesCards = document.querySelectorAll('.vacancies-card')

if (vacanciesCards) {
    vacanciesCards.forEach(item => {
        item.addEventListener('click', e => {
            if (e.target.classList.contains('btn')) {
                e.preventDefault();
                e.stopPropagation()
            }
        })
    })
}

const reviewsFilterButtons = document.querySelector('.reviews-page__filters')

if (reviewsFilterButtons) {
    reviewsFilterButtons.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', () => {
            reviewsFilterButtons.querySelectorAll('button').forEach(elem => elem.classList.remove('active'))
            item.classList.add('active')

            // для страницы товара
            const filtersObjects = document.querySelectorAll('[data-filter]')
            const podborka = document.querySelector('.podborki')

            if (item.dataset.category === 'about_product') {
                filtersObjects.forEach(filter => {
                    if (filter.dataset.filter === 'about_product') {
                        filter.classList.remove('d-none')
                    } else {
                        filter.classList.add('d-none')
                    }
                })

                podborka.classList.remove('d-none')
            } else if (item.dataset.category === 'reviews') {
                filtersObjects.forEach(filter => {
                    if (filter.dataset.filter === 'reviews') {
                        filter.classList.remove('d-none')
                    } else {
                        filter.classList.add('d-none')
                    }
                })

                podborka.classList.add('d-none')
            }
        })
    })
}

// highlight links in header

const categoryLink = document.body.dataset.category;

if (categoryLink) {
    const links = headerWrapper.querySelectorAll('[data-category]')

    links.forEach(link => {
        if (link.dataset.category === categoryLink) {
            link.classList.add('active')
        }
    })
}

// для аккордеонов добавляем класс active к открытому accordion-item

const accordionItems = document.querySelectorAll(".accordion-item");

if (accordionItems) {
    accordionItems.forEach((item) => {
        const collapse = item.querySelector(".accordion-collapse");

        // когда аккордеон открывается
        collapse.addEventListener("show.bs.collapse", () => {
            item.classList.add("active");
        });

        // когда аккордеон закрывается
        collapse.addEventListener("hide.bs.collapse", () => {
            item.classList.remove("active");
        });
    });
}

// for calcs

function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// пример использования
const static_button = document.querySelector(".calculator__result-button");
const dynamic_block = document.querySelector(".calculator__result");

function showDynamicBlock() {
    if (static_button && dynamic_block) {
        if (isInViewport(static_button)) {
            dynamic_block.classList.add("d-none")
        } else {
            dynamic_block.classList.remove('d-none')
        }
    }
}

if (static_button && dynamic_block) {
    window.onscroll = () => {
        showDynamicBlock()
    };

    showDynamicBlock()
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
    }, 300)
}

function thumbHover(imageNumber) {
    //Find the slider element
    const sliderElement = document.getElementById('pgallery');
    //Slide to he right image
    swiffyslider.slideTo(sliderElement, imageNumber)
}

const productGallery = document.getElementById('productGallery')

if (productGallery) {
    const mainSlider = document.getElementById('pgallery')
    const smallSlider = document.getElementById('pgallerythumbs')

    mainSlider.querySelectorAll('img').forEach((img, idx) => {
        img.addEventListener('click', () => {
            imageClick(idx)
        })
    })

    smallSlider.querySelectorAll('img').forEach((img, idx) => {
        img.addEventListener('click', () => {
            thumbHover(idx)
        })
    })

    const prevBtn = document.querySelector(".buy-page__prev-arrow");
    const nextBtn = document.querySelector(".buy-page__next-arrow");

    // функция проверки позиции
    function checkArrows() {
        const scrollTop = smallSlider.scrollTop;
        const scrollHeight = smallSlider.scrollHeight;
        const clientHeight = smallSlider.clientHeight;

        // верх
        if (scrollTop <= 0) {
            prevBtn.classList.add('hide')
        } else {
            prevBtn.classList.remove('hide')
        }

        // низ
        if (scrollTop + clientHeight >= scrollHeight) {
            nextBtn.classList.add('hide')
        } else {
            nextBtn.classList.remove('hide')
        }
    }

    checkArrows()

    // слушаем прокрутку
    smallSlider.addEventListener("scroll", checkArrows);

    document.querySelector(".buy-page__prev-arrow").addEventListener("click", () => {
        smallSlider.scrollBy({ top: -82, behavior: "smooth" });
    });

    document.querySelector(".buy-page__next-arrow").addEventListener("click", () => {
        smallSlider.scrollBy({ top: 82, behavior: "smooth" });
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
    if (fade) fade.style.top = `${collapsedHeight - 80}px`

    button.addEventListener('click', function () {
        const expanded = wrapper.classList.toggle('expanded');
        button.classList.toggle('expanded', expanded);

        if (expanded) {
            wrapper.style.maxHeight = content.scrollHeight + 'px';
            if (fade) {
                fade.style.top = `${content.scrollHeight}px`
                setTimeout(() => {
                    fade.classList.add('hidden')
                }, 300);
            }

            button.innerHTML = openText
        } else {
            wrapper.style.maxHeight = collapsedHeight + 'px';
            if (fade) {
                fade.classList.remove('hidden');
                fade.style.top = `${collapsedHeight - 80}px`
            };

            button.innerHTML = closeText
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

const buyPageDesc = document.querySelectorAll('.buy-page__description')
if (buyPageDesc[1]) {
    const minHeight = buyPageDesc[0].clientHeight + buyPageDesc[1].clientHeight

    initReadMore({
        wrapper: document.querySelector('.product1__wrapper'),
        content: document.querySelector('.product1__content'),
        button: document.querySelector('.product1__read-more'),
        fade: document.querySelector('.product1__fade'),
        height: minHeight, // либо height: 100,
    });
}


// читать далее для отзывов на мобильном

const swiffyReviewsSlider = document.querySelector('.swiffy-reviews')

if (swiffyReviewsSlider) {
    const allSwiffyReviews = swiffyReviewsSlider.querySelectorAll('li')

    allSwiffyReviews.forEach(item => {
        initReadMore({
            wrapper: item.querySelector('.swiffy-content__wrapper'),
            content: item.querySelector('.swiffy-content__content'),
            button: item.querySelector('.swiffy-content__read-more'),
            fade: item.querySelector('.swiffy-content__fade'),
            height: 160, // либо height: 100
            closeText: 'Читать полностью'
        });
    })
}

// Инициализация всех tooltip'ов
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el, {
        placement: 'top',    // пытается сверху
        fallbackPlacements: ['bottom'], // если не влезает — снизу
        trigger: 'hover focus'     // показывается при наведении
    })
})

const slider = document.querySelector('.swiffy-slider.swiffy-reviews');

if (slider) {
    const container = slider.querySelector('.slider-container');
    const slides = Array.from(container.querySelectorAll('li > div'));

    function setHeightForElement(el) {
        if (!el) return;
        container.style.height = Math.ceil(el.getBoundingClientRect().height) + 'px';

        setTimeout(() => {
            container.style.transition = 'height 0s ease';
        }, 300)
    }

    // initial
    setHeightForElement(slides[0]);

    // IntersectionObserver: выбираем слайд с наибольшей видимостью
    const io = new IntersectionObserver((entries) => {
        let best = null;
        for (const e of entries) {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.isIntersecting) {
            container.style.transition = 'height .3s ease';
            setHeightForElement(best.target);
        }
    }, {
        root: container,
        threshold: [0.5]
    });

    slides.forEach(s => io.observe(s));

    // ResizeObserver — пересчитать если внутри слайда изменился контент (read-more)
    const ro = new ResizeObserver(() => {
        // ищем .slide-visible если есть, иначе ближайший к центру контейнера
        const visible = container.querySelector('.slide-visible');
        if (visible) return setHeightForElement(visible);

        // fallback: по центру
        const contRect = container.getBoundingClientRect();
        const centerX = contRect.left + contRect.width / 2;
        let bestSlide = slides[0], bestDist = Infinity;
        slides.forEach(s => {
            const r = s.getBoundingClientRect();
            const sCenter = r.left + r.width / 2;
            const dist = Math.abs(sCenter - centerX);
            if (dist < bestDist) { bestDist = dist; bestSlide = s; }
        });

        setHeightForElement(bestSlide);
    });

    slides.forEach(s => ro.observe(s));

    // если есть кнопки "Читать полностью" — пересчитать после клика (если расширяется)
    slider.querySelectorAll('.swiffy-content__read-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const visible = container.querySelector('.slide-visible') || slides[0];
            setHeightForElement(visible);
        });
    });

    // на ресайзе окна — пересчитать
    window.addEventListener('resize', () => {
        const visible = container.querySelector('.slide-visible') || slides[0];
        setHeightForElement(visible);
    });
}

//
const sliderCatalog = document.getElementById('slider-catalog');
const sliderCatalogPrev = document.querySelector('.slider-catalog__prev-arrow');
const sliderCatalogNext = document.querySelector('.slider-catalog__next-arrow');
const slideCatalogWidth = sliderCatalog.querySelector('.slider-catalog__slide').offsetWidth + 16; // ширина + gap

sliderCatalogPrev.addEventListener('click', () => {
    sliderCatalog.scrollBy({ left: -slideCatalogWidth, behavior: 'smooth' });
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
    sliderCatalog.scrollBy({ left: slideCatalogWidth, behavior: 'smooth' });
});

sliderCatalog.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons);

// при загрузке страницы
updateButtons();

// для фильтров
const wrapper = document.querySelectorAll('#checkboxWrapper');
if (wrapper) {
    wrapper.forEach(item => {
        const btn = item.parentNode.querySelector('#toggleBtn');
        let expanded = false;
        let btnInitialValue = ''

        btn.addEventListener('click', () => {
            if (!btnInitialValue) btnInitialValue = btn.querySelector('span').innerHTML

            expanded = !expanded;
            item.classList.toggle('expanded', expanded);

            if (expanded) {
                item.classList.remove('pe-1')
            } else {
                item.classList.add('pe-1')
                item.scroll({ top: 0, behavior: 'smooth' });
            }

            btn.querySelector('.default-icon-arrow').style.transform = expanded ? 'rotate(-90deg)' : 'rotate(90deg)'
            btn.querySelector('span').textContent = expanded ? 'Свернуть' : btnInitialValue;
        });
    })
}


// nouislider

let nouisliders = document.querySelectorAll('#nouislider');

if (nouisliders) {
    nouisliders.forEach(slider => {
        const sliderRange = noUiSlider.create(slider, {
            start: [+slider.dataset.min, +slider.dataset.max],
            connect: true,
            range: {
                'min': +slider.dataset.min,
                'max': +slider.dataset.max
            }
        });

        sliderRange.on('update', (vals) => {
            const parentWrapper = slider.parentNode

            parentWrapper.querySelector('.min-input').value = Math.round(+vals[0])
            parentWrapper.querySelector('.max-input').value = Math.round(+vals[1])
        })
    })
}

if (document.body.clientWidth < 768) {
    // filters overlay
    try {
        const filtersWrapper = document.querySelector('.filters-overlay__wrapper')
        const filtersOverlay = document.querySelector('.filters-overlay')
        const filtersCross = filtersOverlay.querySelector('.cross-place')
        const filtersButton = document.querySelectorAll('.filters-show-popup')

        filtersButton.forEach(btn => {
            btn.addEventListener('click', () => {
                filtersWrapper.classList.add('active')
                filtersOverlay.classList.add('active')
                document.body.classList.add('overflow-hidden')
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            })
        })

        filtersWrapper.addEventListener('click', () => {
            filtersWrapper.classList.remove('active')
            filtersOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })

        filtersCross.addEventListener('click', () => {
            filtersWrapper.classList.remove('active')
            filtersOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })

        // cloning node
        const pcFilters = document.querySelector('.catalog-order__main-content > div:first-child');
        const popupPlace = document.querySelector(".filters-popup__filters");

        while (pcFilters.firstChild) {
            if (pcFilters.firstElementChild.classList.contains('btn')) break;

            popupPlace.insertAdjacentElement("beforeend", pcFilters.firstElementChild);
        }
    } catch (e) {
        console.warn('error')
    }

    try {
        const sortWrapper = document.querySelector('.sort-overlay__wrapper')
        const sortOverlay = document.querySelector('.sort-overlay')
        const sortCross = sortOverlay.querySelector('.cross-place')
        const sortButton = document.querySelectorAll('.sort-show-popup')

        sortButton.forEach(btn => {
            btn.addEventListener('click', () => {
                sortWrapper.classList.add('active')
                sortOverlay.classList.add('active')
                document.body.classList.add('overflow-hidden')
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            })
        })

        sortWrapper.addEventListener('click', () => {
            sortWrapper.classList.remove('active')
            sortOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })

        sortCross.addEventListener('click', () => {
            sortWrapper.classList.remove('active')
            sortOverlay.classList.remove('active')
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = `${0}px`;
        })
    } catch (e) {
        console.warn('error')
    }

    // sort filters

    const sortGoodsPage = document.querySelectorAll(".sort-overlay__amount")

    sortGoodsPage.forEach(item => {
        item.addEventListener('click', () => {
            sortGoodsPage.forEach(elem => elem.classList.remove('active'))
            item.classList.add('active')
        })
    })
}
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

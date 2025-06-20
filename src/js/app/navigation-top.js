const mobileTrigger = document.getElementById(
    'navigation__mobile-menu-trigger',
);
const list = document.querySelector('.navigation--top .navigation__list');

function toggleMobileMenu() {
    this.classList.toggle('closed');
    this.classList.toggle('opened');

    if (this.classList.contains('closed')) {
        list.classList.add('navigation__list--mobile-closed');
        list.classList.remove('navigation__list--mobile-opened');
    } else {
        list.classList.remove('navigation__list--mobile-closed');
        list.classList.add('navigation__list--mobile-opened');
    }
}

mobileTrigger.addEventListener('click', toggleMobileMenu);

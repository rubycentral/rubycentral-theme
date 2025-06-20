const mobileTrigger = document.getElementById(
    'navigation__mobile-menu-trigger',
);

function toggleMobileMenu() {
    this.classList.toggle('closed');
    this.classList.toggle('opened');
}

mobileTrigger.addEventListener('click', toggleMobileMenu);

(function () {
  "use strict";

  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const topNav   = document.querySelector('nav');

  function openNav() {
    topNav.classList.add('open');
    topNav.classList.remove('closed')
  }

  function closeNav() {
    topNav.classList.remove('open');
    topNav.classList.add('closed')
  }

  menuIconOpen.addEventListener('click', (e)=> {
    e.preventDefault();
    openNav();
  })

  menuIconClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeNav();
  })
}());

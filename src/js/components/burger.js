const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.nav__list');

burger.addEventListener('click', () => {
  burgerMenu.classList.toggle('nav__list--open');
});

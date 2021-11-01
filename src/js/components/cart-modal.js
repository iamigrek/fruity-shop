const cartBtn = document.querySelector('.cart-open');
const cartModalWrapper = document.querySelector('.cart-wrapper');
const cartModal = document.querySelector('.cart');
const cartClose = document.querySelector('.cart-close');

cartBtn.addEventListener('click', cart);
cartModalWrapper.addEventListener('click', cart);
cartModal.addEventListener('click', cart);
cartClose.addEventListener('click', cart);

function cart() {
  cartModalWrapper.classList.toggle('cart-wrapper--visible');
  cartModal.classList.toggle('cart--visible');
  document.body.classList.toggle('dis-scroll');
}

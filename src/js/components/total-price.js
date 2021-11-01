document.addEventListener('DOMContentLoaded', totalPrice);

function totalPrice() {
  const cartItem = document.querySelectorAll('.cart__item');
  const cartTotal = document.querySelector('.total__price');
  cartTotal.textContent = '0';

  if (cartList.length == 0) {
    cartTotal.textContent = '0';
  } else {
    cartItem.forEach(item => {
      let totalItem = item.querySelector('.cart__item-price').textContent;
      cartTotal.textContent = (
        parseFloat(cartTotal.textContent) + parseFloat(totalItem)
      ).toFixed(2);
    });
  }
}

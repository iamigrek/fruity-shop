const cartWrapper = document.querySelector('.cart__list');
let cartList = [];

if (localStorage.getItem('cart')) {
  cartList = JSON.parse(localStorage.getItem('cart'));
}

document.addEventListener('DOMContentLoaded', createCartItems);

function createCartItems() {
  cartWrapper.innerHTML = '';

  if (cartList.length != 0) {
    cartList.forEach(item => {
      let CartItem = `
					<li data-id="${item.id}" class="cart__item">
						<div class="cart__item-left">
							<button class="cart__del btn btn--del"></button>
							<div style="background-color: ${item.imgWrapper}" class="cart__img-wrapper">
								<img src="${item.imgSrc}" alt="Banana" class="cart__img">
							</div>
							<h3 class="cart__item-title title title--card">${item.title}</h3>
						</div>
						<div class="cart__item-right">
							<div class="cart__weight">
								<button class="cart__weight-plus btn btn--calculator">+</button>
								<input  class="cart__weight-value" type="number" value='${item.weight}'>
								<button class="cart__weight-minus btn btn--calculator">-</button>
							</div>
							<div class="cart__item-price-wrapper">
								<span class="cart__item-currency">$</span>
								<span class="cart__item-price">${item.price}</span>
							</div>
						</div>
					</li>
		`;

      cartWrapper.innerHTML += CartItem;

      const cartDel = document.querySelectorAll('.cart__del');

      cartDel.forEach(item => {
        item.addEventListener('click', () => {
          const cartItemId = item.closest('li').getAttribute('data-id');
          cartList = cartList.filter(function (obj) {
            return obj.id !== cartItemId;
          });
          createCartItems();
          localStorage.setItem('cart', JSON.stringify(cartList));
          productsList.forEach(el => {
            if (el.id == cartItemId) {
              el.inCart = !el.inCart;
              createProducts();
              localStorage.setItem('products', JSON.stringify(productsList));
            }
          });
          displayPrice();
          totalPrice();
        });
      });
      displayPrice();
      counter();
    });
  } else {
    let CartItem = `
					<h2 class="cart__status title">cart is empty...</h2>
		`;
    cartWrapper.innerHTML += CartItem;
  }
}

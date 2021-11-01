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

const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.nav__list');

burger.addEventListener('click', () => {
  burgerMenu.classList.toggle('nav__list--open');
});

document.addEventListener('DOMContentLoaded', displayPrice);

function displayPrice() {
  const cartItem = document.querySelectorAll('.cart__item');

  cartItem.forEach(item => {
    let counterPrice = item.querySelector('.cart__item-price');
    let counterItemId = item.getAttribute('data-id');
    let dis = item.querySelector('.cart__weight-value');

    cartList.forEach(el => {
      if (counterItemId == el.id) {
        counterPrice.textContent = (
          (dis.value / 500) *
          parseFloat(el.price)
        ).toFixed(2);
      }
    });
    totalPrice();
  });
}

function counter() {
  const counterBtnPlus = document.querySelectorAll('.cart__weight-plus');
  const counterBtnMinus = document.querySelectorAll('.cart__weight-minus');
  const counterWeightValue = document.querySelectorAll('.cart__weight-value');

  counterWeightValue.forEach(item => {
    item.addEventListener('change', () => {
      priceUpdate(item, item);
    });
  });

  counterBtnPlus.forEach(function (item) {
    item.addEventListener('click', function () {
      let dis = item.parentElement.querySelector('.cart__weight-value');
      dis.value = parseInt(dis.value) + 500;

      priceUpdate(item, dis);
    });
  });

  counterBtnMinus.forEach(function (item) {
    item.addEventListener('click', function () {
      let dis = item.parentElement.querySelector('.cart__weight-value');
      if (dis.value > 500) {
        dis.value = parseInt(dis.value) - 500;

        priceUpdate(item, dis);
      }
    });
  });
}

function priceUpdate(item, dis) {
  let counterPrice =
    item.parentNode.parentNode.querySelector('.cart__item-price');
  let counterItemId =
    item.parentNode.parentNode.parentNode.getAttribute('data-id');
  cartList.forEach(el => {
    if (counterItemId == el.id) {
      counterPrice.textContent = (
        (dis.value / 500) *
        parseFloat(el.price)
      ).toFixed(2);
      el.weight = dis.value;
      localStorage.setItem('cart', JSON.stringify(cartList));
    }
  });
  totalPrice();
}

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

const randomId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

let productsList = [
  {
    id: randomId(),
    title: 'Ripe Yellow Banana',
    imgSrc: './images/products/product-1.png',
    imgWrapper: '#ffd400',
    weight: 500,
    price: 2.89,
    inCart: false,
  },
  {
    id: randomId(),
    title: 'Red Pomegranate',
    imgSrc: './images/products/product-2.png',
    imgWrapper: '#FFE3E2',
    weight: 500,
    price: 2.89,
    inCart: false,
  },
  {
    id: randomId(),
    title: 'Sweet Orange',
    imgSrc: './images/products/product-3.png',
    imgWrapper: '#F5BC5B',
    weight: 500,
    price: 2.89,
    inCart: false,
  },
  {
    id: randomId(),
    title: 'Tasty Avocado',
    imgSrc: './images/products/product-4.png',
    imgWrapper: '#EDF2F5',
    weight: 500,
    price: 3.89,
    inCart: false,
  },
];

const productsWrapper = document.querySelector('.products__list');

if (
  !localStorage.getItem('products') ||
  JSON.parse(localStorage.getItem('products')).length != productsList.length
) {
  localStorage.clear();
} else if (localStorage.getItem('products')) {
  productsList = JSON.parse(localStorage.getItem('products'));
}
document.addEventListener('DOMContentLoaded', createProducts);

function createProducts() {
  productsWrapper.innerHTML = '';
  productsList.forEach(item => {
    let productItem = `
			<li data-id="${item.id}" class="products__item card">
				<div style="background-color:${item.imgWrapper}" class="card__img-wrapper">
					<img src="${item.imgSrc}" alt="Banana" class="card__img">
				</div>
				<div class="card__info">
					<h3 class="card__title title title--card">${item.title}</h3>
					<div class="card__price">
						<span class="card__price-currency">$</span>
						<span class="card__price-value">${item.price}</span>
					</div>
				</div>

				<div class="card__bottom">
        <div class="card__weight">
        	<span class="card__weight-value">${item.weight}</span>
					<span class="card__weight-type">g</span>
        </div>
					<button class="card__buy btn btn--buy ${item.inCart && 'btn--buy-incart'}">${
      item.inCart ? 'In cart' : 'Buy'
    }</button>
				</div> 
			</li>
		`;
    productsWrapper.innerHTML += productItem;

    const cartAdd = document.querySelectorAll('.card__buy');

    cartAdd.forEach(item => {
      item.addEventListener('click', function () {
        const itemId = item.closest('li').getAttribute('data-id');
        console.log(itemId);
        productsList.forEach(el => {
          if (el.id == itemId) {
            if (item.classList.contains('btn--buy-incart')) {
              el.inCart = !el.inCart;
              localStorage.setItem('products', JSON.stringify(productsList));
              cartList = cartList.filter(obj => {
                return obj.id !== el.id;
              });
              localStorage.setItem('cart', JSON.stringify(cartList));
            } else {
              el.inCart = !el.inCart;
              localStorage.setItem('products', JSON.stringify(productsList));
              cartList.push(el);
              localStorage.setItem('cart', JSON.stringify(cartList));
            }
          }
        });
        createProducts();
        createCartItems();
        totalPrice();
      });
    });
  });
}

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

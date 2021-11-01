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
    imgSrc: '../images/products/product-1.png',
    imgWrapper: '#ffd400',
    weight: 500,
    price: 2.89,
    inCart: false,
  },
  {
    id: randomId(),
    title: 'Red Pomegranate',
    imgSrc: '../images/products/product-2.png',
    imgWrapper: '#FFE3E2',
    weight: 500,
    price: 2.89,
    inCart: false,
  },
  {
    id: randomId(),
    title: 'Sweet Orange',
    imgSrc: '../images/products/product-3.png',
    imgWrapper: '#F5BC5B',
    weight: 500,
    price: 2.89,
    inCart: false,
  },
  {
    id: randomId(),
    title: 'Tasty Avocado',
    imgSrc: '../images/products/product-4.png',
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

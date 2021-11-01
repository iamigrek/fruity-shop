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

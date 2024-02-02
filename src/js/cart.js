import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  // Check if there are items in the cart
  if  (cartItems.length > 0) {
    // Show the cart footer
    document.querySelector('.cart-footer').classList.toggle('hide');

    // Calculate total
    var total = 0;
    cartItems.forEach(function(item){
      total += item.FinalPrice;
    });
    console.log(total);

    // Insert total into HTML element
    document.getElementById('totalAmount').innerText = '$' + total.toFixed(2);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
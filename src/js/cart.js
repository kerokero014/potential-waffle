import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { renderHeader, renderFooter } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  const productList = document.querySelector('.product-list');
  productList.innerHTML = htmlItems.join('');

  if (cartItems.length === 0) {
    productList.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  }

  // Check if there are items in the cart
  if (cartItems.length > 0) {
    // Show the cart footer
    document.querySelector('.cart-footer').classList.remove('hide');

    // Calculate total
    var total = 0;
    cartItems.forEach(function (item) {
      total += item.FinalPrice;
    });

    // Insert total into HTML element
    document.getElementById('totalAmount').innerText = '$' + total.toFixed(2);

    // Show or hide counterdot based on cart items
    //const counterdot = document.getElementById('counterdot');

  }
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <button class="remove-item" data-index="${index}">X</button>
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
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
// Function to remove an item from the cart
function removeFromCart(index) {
  const cartItems = getLocalStorage('so-cart'); // Get the cart items from local storage
  cartItems.splice(index, 1); // Remove item at the specified index from the array
  setLocalStorage('so-cart', cartItems); // Update local storage
  renderCartContents(); // Re-render the cart contents

  // If the cart is empty, hide the cart footer
  if (cartItems.length === 0) {
    document.querySelector('.cart-footer').classList.add('hide');
  }
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-item')) {
    const index = parseInt(event.target.getAttribute('data-index'));
    removeFromCart(index);
  }
});

renderCartContents();
renderHeader();
renderFooter();

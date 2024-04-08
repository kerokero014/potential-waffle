import { findProductById } from './productData.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { cartCount } from './stores.mjs';

let product = {};

export default async function productDetails(productId, selector) {
  try {
    // get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productId);

    // once we have the product details we can render out the HTML
    const el = document.querySelector(selector);
    el.insertAdjacentHTML('afterBegin', productDetailsTemplate(product));

    // once the HTML is rendered we can add a listener to Add to Cart button
    document.getElementById('addToCart').addEventListener('click', addToCart);

    // Add event listener to Wishlist button
    document.getElementById('wishlistBtn').addEventListener('click', toggleWishlist);
  } catch (error) {
    console.log('An error occurred while fetching or processing product details:', error);
  }
}

function addToCart() {
  let cartContents = getLocalStorage('so-cart');
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }

  // add quantity input
  let Quantity = document.getElementById('quantityInput');
  product.Quantity = Quantity.value;

  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage('so-cart', cartContents);

  // Add the 'added' class to the cart icon
  const cartIcon = document.querySelector('.cart');
  cartIcon.classList.add('added');

  // Remove the 'added' class after a delay (you can adjust the delay as needed)
  setTimeout(() => {
    cartIcon.classList.remove('added');
  }, 1000); // 1000 milliseconds = 1 second
  // update the visible cartCount
  cartCount.set(cartContents.length);
}

function productDetailsTemplate(product) {
  try {
    // Check if product is defined
    if (!product) {
      console.log('Product is undefined or null');
      return `<h1>An error occurred while fetching or processing product details</h1>`;
    }
    // Check if Colors array is defined and has at least one color
    const colorNames =
    product.Colors && product.Colors.length > 0
      ? product.Colors.map(color => `<span class="color-name">${color.ColorName}</span>`).join(', ')
      : 'No colors available';

    // Check if Brand is defined
    if (!product.Brand || !product.Brand.Name) {
      console.log('Product brand or brand name is undefined');
      return `<h1>An error occurred while fetching or processing product details</h1>`;
    }

    let discountPercentage = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
    );

    // Construct carousel HTML
    let carouselImages = `<img src="${product.Images.PrimaryExtraLarge}" alt="${product.Name}" />`;

    if (product.Images && product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
      carouselImages += product.Images.ExtraImages.map(
        (image) => `
        <img src="${image.Src}" alt="${product.Name}" />
      `
      ).join('');
    }

    return `
      <div class="carousel">
        ${carouselImages}
      </div>
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
      <span class="discount-indicator">-${discountPercentage}%</span>
      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>
      <p class="product__colors">Available colors: ${colorNames}</p>
      <div class="product-detail__add">
        <span>Quantity:</span>
        <input id="quantityInput" type="number" min="1" value="1"/>
      </div>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
      
      <!-- Wishlist button -->
      <button id="wishlistBtn" class="wishlist ${
        isProductInWishlist(product.Id) ? 'added' : ''
      }">Add to Wishlist</button>
    `;
  } catch (error) {
    console.log('An error occurred while fetching or processing product details:', error);
    return `<h1>An error occurred while fetching or processing product details</h1>`;
  }
}

function addToWishlist(productId) {
  // Get current wishlist items from local storage
  let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Add the productId to the wishlist if it's not already there
  if (!wishlistItems.includes(productId)) {
    wishlistItems.push(productId);
    // Update the wishlist items in local storage
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }
}

function removeFromWishlist(productId) {
  // Get current wishlist items from local storage
  let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Remove the productId from the wishlist
  wishlistItems = wishlistItems.filter((item) => item !== productId);

  // Update the wishlist items in local storage
  localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
}

function toggleWishlist(productId) {
  try {
    const wishlistIcon = document.getElementById('wishlistBtn');
    if (wishlistIcon.classList.contains('added')) {
      // If item is already in wishlist, remove it
      removeFromWishlist(productId);
      wishlistIcon.classList.remove('added');
    } else {
      // If item is not in wishlist, add it
      addToWishlist(productId);
      wishlistIcon.classList.add('added');
    }
    console.log('Updated wishlist items:', getLocalStorage('wishlist'));
  } catch (error) {
    console.log('An error occurred while adding/removing from wishlist:', error);
  }
}

function isProductInWishlist(productId) {
  // Check if the product is in the wishlist
  const wishlistItems = getLocalStorage('wishlist') || [];
  return wishlistItems.includes(productId);
}

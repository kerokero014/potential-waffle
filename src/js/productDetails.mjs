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
      return `<h1>Product details not available</h1>`;
    }

    // Check if Brand is defined
    if (!product.Brand || !product.Brand.Name) {
      console.log('Product brand or brand name is undefined');
      return `<h1>Product brand or brand name is not available</h1>`;
    }

    let discountPercentage = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
    );

    // Create a carousel for product images
    let carouselImages = '';
    if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
      carouselImages = `
        <div class="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${
                product.Images.PrimaryExtraLarge
              }" class="d-block w-100" alt="Primary Image">
            </div>
            ${product.Images.ExtraImages.map(
              (image, index) => `
              <div class="carousel-item">
                <img src="${image.Src}" class="d-block w-100" alt="${image.Title}">
              </div>
            `
            ).join('')}
          </div>
          <a class="carousel-control-prev" onclick="prevSlide()" href="#">❮</a>
          <a class="carousel-control-next" onclick="nextSlide()" href="#">❯</a>
        </div>
      `;
    } else {
      carouselImages = `
        <img
          class="divider"
          src="${product.Images.PrimaryExtraLarge}"
          alt="${product.Name}"
        />
      `;
    }

    // Return the HTML template
    return `
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      ${carouselImages}
      <p class="product-card__price">$${product.FinalPrice}</p>
      <span class="discount-indicator">-${discountPercentage}%</span>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>
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

let slideIndex = 0;

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-item');
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[slideIndex].classList.add('active');
}

function nextSlide() {
  showSlide(slideIndex += 1);
}

function prevSlide() {
  showSlide(slideIndex -= 1);
}


function toggleWishlist() {
  try {
    const wishlistIcon = document.getElementById('wishlistBtn');
    if (wishlistIcon.classList.contains('added')) {
      // If item is already in wishlist, remove it
      removeFromWishlist(product.id);
      wishlistIcon.classList.remove('added');
    } else {
      // If item is not in wishlist, add it
      addToWishlist(product.id);
      wishlistIcon.classList.add('added');
    }
  } catch (error) {
    console.log('An error occurred while adding/removing from wishlist:', error);
  }
}

function isProductInWishlist(productId) {
  // Check if the product is in the wishlist
  const wishlistItems = getLocalStorage('wishlist') || [];
  return wishlistItems.includes(productId);
}

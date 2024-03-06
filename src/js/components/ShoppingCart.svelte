<script>
  import { getLocalStorage, setLocalStorage } from '../utils.mjs';
  import { onDestroy } from 'svelte';

  // Define removeFromCart function
  function removeFromCart(index) {
    // Remove item at the specified index from the cartItems array
    cartItems = cartItems.filter((_, i) => i !== index);
    // Update local storage
    setLocalStorage('so-cart', cartItems);
    // If the cart is empty, hide the cart footer
    if (cartItems.length === 0) {
      document.querySelector('.cart-footer').classList.add('hide');
    }
  }

  // Load cartItems from local storage
  let cartItems = getLocalStorage('so-cart');
  let total = 0;
  console.log(cartItems);
  // Calculate total price
  $: {
    total = cartItems.reduce((acc, item) => acc + item.FinalPrice * item.Quantity, 0);
  }

  // Watch for changes in cartItems and update local storage accordingly
  $: {
    setLocalStorage('so-cart', cartItems);
  }

  // Clean up event listener on component destruction
  onDestroy(() => {
    document.removeEventListener('click', handleRemoveItemClick);
  });

  // Function to handle remove item button click
  function handleRemoveItemClick(event) {
    if (event.target.classList.contains('remove-item')) {
      const index = parseInt(event.target.getAttribute('data-index'));
      removeFromCart(index);
    }
  }

  // Add event listener to handle remove item button click
  document.addEventListener('click', handleRemoveItemClick);
</script>

<h2>My Cart</h2>

{#if cartItems.length === 0}
  <p class="empty-cart">Your cart is empty</p>
{:else}
  <ul class="product-list">
    {#each cartItems as item, index (item.Id)}
      <li class="cart-card divider">
        <button class="remove-item" data-index={index}>X</button>
        <a href="/product_pages/index.html?productid={item.Id}" class="cart-card__image">
          <img src={item.Images.PrimaryExtraLarge} alt={item.Name} />
        </a>
        <div>
          <h2 class="card__name">{item.Name}</h2>
        </div>
        <p class="cart-card__color">{item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">{item.Quantity}</p>
        <p class="cart-card__price">${item.FinalPrice}</p>
      </li>
    {/each}
  </ul>
  <div class="cart-footer">
    Total: ${total.toFixed(2)}
  </div>
{/if}

<style>
  .remove-item {
    background-color: tomato;
    border: none;
    color: white;
    padding: 7px 7px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition-duration: 0.4s; /* Transition */
  }

  .remove-item:hover {
    background-color: #3c1616; /* Darker red on hover */
    color: rgba(255, 255, 255, 0.514);
  }
</style>
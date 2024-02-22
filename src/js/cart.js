import { renderHeader, renderFooter } from './utils.mjs';
import shoppingCart from './components/ShoppingCart.svelte';

renderHeader();
renderFooter();

new shoppingCart({
  target: document.querySelector('.products')
});

//renderCartContents();

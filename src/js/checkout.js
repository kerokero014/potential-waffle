import { renderHeader, renderFooter } from './utils.mjs';
import CheckoutForm from './components/CheckoutForm.svelte';

renderHeader();
renderFooter();

new CheckoutForm({
  target: document.querySelector('.checkout-form'),
  props: { key: 'so-cart' }
});

import { renderHeader, renderFooter, getParam } from './utils.mjs';
import ProductList from './components/ProductList.svelte';

renderHeader();
renderFooter();

const category = getParam('category');

new ProductList({
  target: document.querySelector('.products'),
  props: { category: category }
});

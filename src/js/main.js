import BannerView from './components/BannerView.svelte';
import { renderHeader, renderFooter } from './utils.mjs';

const app = new BannerView({
  target: document.getElementById('app')
});

renderHeader();
renderFooter();

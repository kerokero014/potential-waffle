import BannerView from './components/BannerView.svelte';
import { renderHeader, renderFooter } from './utils.mjs';
import { renderAlerts } from './alert.js'; 

const app = new BannerView({
  target: document.getElementById('app')
});

renderHeader();
renderFooter();

// Render alerts
const alertsContainer = document.getElementById('alerts');
alertsContainer.appendChild(await renderAlerts()); 

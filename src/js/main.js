import BannerView from './components/BannerView.svelte';
import { renderHeader, renderFooter,getUserName } from './utils.mjs';
import { renderAlerts } from './alert.js';

const app = new BannerView({
  target: document.getElementById('app')
});

renderHeader();
renderFooter();
getUserName();
//displayUserName();

// Render alerts
const alertsContainer = document.getElementById('alerts');
alertsContainer.appendChild(await renderAlerts());
// Get form and success message elements
const form = document.getElementById('myForm');
const successMessage = document.getElementById('successMessage');

// Function to show success message
function showSuccessMessage() {
  successMessage.style.display = 'block';
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior
  // Here you can add code to send form data to server if needed
  // For this example, we're just showing the success message
  showSuccessMessage();
}

// Add event listener to form submit event
form.addEventListener('submit', handleSubmit);

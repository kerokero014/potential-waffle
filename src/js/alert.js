// alert.js

// Function to render alerts
export async function renderAlerts() {
  const alertsSection = document.createElement('section');
  alertsSection.classList.add('alert-list');

  try {
    const response = await fetch('alerts.json'); // Corrected file name to 'alerts.json'
    const alerts = await response.json();

    alerts.forEach((alert) => {
      const { message, background, color } = alert;
      const alertElement = document.createElement('p');
      alertElement.textContent = message;
      alertElement.style.backgroundColor = background;
      alertElement.style.color = color;
      alertsSection.appendChild(alertElement);
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }

  return alertsSection;
}

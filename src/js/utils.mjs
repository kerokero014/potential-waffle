import MainHeader from './components/MainHeader.svelte';
import MainFooter from  './components/MainFooter.svelte';
import Alert from './components/Alert.svelte';

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function getCartCount() {
  const cart = getLocalStorage('so-cart');
  const count = cart && cart.length > 0 ? cart.length : 0;
  return count;
}

// render out the header and footer components to the correct elements when called
export function renderHeader() {
  new MainHeader({
    target: document.querySelector('#main-header'),
    props: {carCount: getCartCount()}
  });
}

export function renderFooter() {
  new MainFooter({
    target: document.querySelector('#main-footer')
  });
}
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
 
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  
 
  return convertedJSON;
}
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = new Alert({
      target: document.querySelector("body"),
      anchor: document.querySelector("main"),
      props: {
      message,
      },
  });
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
  
  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   alert.$destroy();
  // }, duration);
  };
  export function removeAllAlerts() {
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach((alert) => alert.remove());
  };
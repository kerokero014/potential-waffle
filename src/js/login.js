import { login } from './auth.mjs';
import { renderHeader, renderFooter, getParam } from './utils.mjs';

renderHeader();
renderFooter();

const redirect = getParam('redirect');

let loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  login({ username, password }, redirect);
});

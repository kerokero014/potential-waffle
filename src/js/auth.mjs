import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

const tokenKey = "so-token";
export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        // because of the default arg provided above...if no redirect is provided send them Home.
        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
}

function isTokenValid() {

}

export function checkLogin() {

}
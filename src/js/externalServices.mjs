const baseURL = import.meta.env.VITE_SERVER_URL;
async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    //throw new Error('Bad Response');
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}
export async function checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  return await fetch(baseURL + 'checkout/', options).then(convertToJson);
}

export function loginRequest(user) {
  console.log(user);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  const response = fetch(baseURL + 'login', options).then(convertToJson);
  return response.accessToken;
}

// make a request to the server for the current orders
// requires: a valid token
// returns: a list of orders
export async function getOrders(token) {
  const options = {
    method: "GET",
    // the server will reject our request if we don't include the Authorization header with a valid token!
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}

//request items by name autocomplete
export async function getItemsByName(name) {
  const response = await fetch(baseURL + `products/search/${name}`);
  const data = await convertToJson(response);
  return data.Result;
}


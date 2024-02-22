<script>
  import { getLocalStorage, formDataToJSON } from '../utils.mjs';
  import { checkout } from "../externalServices.mjs"

  // props
  export let key = '';

  // state vars
  let list = [];
  let itemTotal = 0;
  let shipping = 0;
  let tax = 0;
  let orderTotal = 0;

  // initial setup
  const init = function () {
    list = getLocalStorage(key);
    calculateItemSummary();
  };
  // calculate order subtotal from the cart items
  const calculateItemSummary = function () {
  if (list.length > 0) {
    // calculate the total of all the items in the cart
    const amounts = list.map((item) => item.FinalPrice);
    itemTotal = amounts.reduce((sum, item) => sum + item, 0); // Provide an initial value of 0
  } else {
    itemTotal = 0; // Set itemTotal to 0 if list is empty
  }
};

  // calculate the shipping, tax, and orderTotal
  const calculateOrdertotal = function () {
    shipping = 10 + (list.length - 1) * 2;
    tax = (itemTotal * 0.06).toFixed(2);
    console.log(tax)
    orderTotal = (
      parseFloat(itemTotal) +
      parseFloat(shipping) +
      parseFloat(tax)
    ).toFixed(2);
  };
  // transform the current cart contents to a simpler format keeping just the things we need to send to checkout
  const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1
      };
    });
    return simplifiedItems;
  };
  const handleSubmit = async function (e) {
    const json = formDataToJSON(this);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = orderTotal;
    json.tax = tax;
    json.shipping = shipping;
    json.items = packageItems(list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  // initial setup
  init();
</script>

<form id="checkoutForm" on:submit|preventDefault={handleSubmit}>
  <fieldset class="checkout-summary">
    <legend>Shipping Address</legend>
    <label for="customerName">Customer Name:</label>
    <input type="text" id="customerName" name="customerName" required />
    <label for="address">Street:</label> <input type="text" id="street" name="street" required />
    <label for="address">City:</label> <input type="text" id="city" name="city" required />
    <label for="address">State:</label> <input type="text" id="state" name="state" required />
    <label for="address">Zip Code:</label>
    <input type="text" id="zip" name="zip" required on:blur={calculateOrdertotal} />
  </fieldset>
  <fieldset class="checkout-summary">
    <legend>Payment</legend>
    <label for="creditCardNumber">Credit Card Number:</label>
    <input type="text" id="creditCardNumber" name="creditCardNumber" required />
    <label for="expirationDate">Expiration Date:</label>
    <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YYYY" required />
    <label for="securityCode">Security Code:</label>
    <input type="text" id="securityCode" name="securityCode" maxlength="3" required />
    <input type="submit" value="Submit" />
  </fieldset>
  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <ul>
      <li>
        <label for="cartTotal">Item Subtotal({list.length})</label>
        <p name="cartTotal" id="cartTotal">${itemTotal}</p>
      </li>
      <li>
        <label for="shipping">Shipping Estimate</label>
        <p id="shipping">${shipping}</p>
      </li>
      <li>
        <label for="tax">Tax</label>
        <p id="tax">${tax}</p>
      </li>
      <li>
        <label for="orderTotal"><b>Order Total</b></label>;
        <p id="orderTotal">${orderTotal}</p>
      </li>
    </ul>
  </fieldset>
  <button id="checkoutSubmit" type="submit">Checkout</button>
</form>

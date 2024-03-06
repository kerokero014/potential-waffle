<script>
  export let product = {};
</script>

<div class="quick-view-overlay">
  <div class="view-content">
    <img src={product.Images.PrimaryExtraLarge} alt="Image of {product.Name}" />
    <h3 class="card__brand">{product.Brand.Name}</h3>
    <h2 class="card__name">{product.NameWithoutBrand}</h2>
    <p class="discount">${product.FinalPrice}</p>
    <p class="strikethrough">${product.SuggestedRetailPrice}</p>
    <!--<button id="addToCart" data-id="${product.Id}">Add to Cart</button>-->
  </div>
</div>

<style>
  .view-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
  }

  .view-content img {
    width: auto;
    max-width: 300px;
    margin: 0 auto;
  }
</style>

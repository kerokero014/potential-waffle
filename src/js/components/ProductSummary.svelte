<script>
  import ProductOverlay from './ProductOverlay.svelte';

  export let product = {};

  // Calculate discount percentage
  $: discountPercentage = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
  
    );

  let overlayVisible = false;

  function handleQuickView() {
    overlayVisible = true;
  }

  function handleClose() {
    overlayVisible = false;
  }
</script>

<section class="product">
  <a href="/product_pages/index.html?product={product.Id}">
    <img src={product.Images.PrimaryMedium} alt="Image of {product.Name}" />
    <h3 class="card__brand">{product.Brand.Name}</h3>
    <h2 class="card__name">{product.NameWithoutBrand}</h2>
    {#if product.FinalPrice < product.SuggestedRetailPrice}
      <p class="discount">${product.FinalPrice}</p>
      <p class="strikethrough">${product.SuggestedRetailPrice}</p>
      <span class="discount-indicator">-{discountPercentage}%</span>
    {:else}
      <p>${product.SuggestedRetailPrice}</p>
    {/if}
  </a>
  <button class="qb quick-view-btn" on:click={handleQuickView}>Quick View</button>
  <div class="quick-view-overlay" style="display: {overlayVisible ? 'block' : 'none'};">
    <button class="close-btn" on:click={handleClose}>&times;</button>
    <svelte:component this={ProductOverlay} {product} />
  </div>
</section>

<style>
  .product {
    padding: 10px;
    margin: 10px;
    width: 200px;
    text-align: center;
  }

  .quick-view-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background-color: tomato;
    padding: 10px 15px;
    z-index: 1;
  }

  .product img {
    width: 100%;
    max-width: 150px;
  }

  .card__name {
    font-size: 16px;
    margin-top: 10px;
  }
  .quick-view-btn {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #636e76;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>

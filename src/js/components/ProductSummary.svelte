<script>
    export let product = {};

     // Calculate discount percentage
  $: discountPercentage = Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
</script>
  
  <section>
    <a href="product_pages/index.html?product={product.Id}">
      <img src={product.Image} alt="Image of {product.Name}" />
      <h3 class="card__brand">{product.Brand.Name}</h3>
      <h2 class="card__name">{product.NameWithoutBrand}</h2>
      <!-- <p class="product-card__price">${product.FinalPrice}</p> -->
      {#if product.FinalPrice < product.SuggestedRetailPrice}
        <p class="discount">${product.FinalPrice}</p>
        <p class="strikethrough">${product.SuggestedRetailPrice}</p>
        <span class="discount-indicator">-{discountPercentage}%</span>
      {:else}
        <p>${product.SuggestedRetailPrice}</p>
      {/if}
    </a>
  </section>
<script>
  import ProductSummary from './ProductSummary.svelte';
  import { getData } from '../productData.mjs';
  import { onMount } from 'svelte';

  export let category;

  let promise = getData(category);

  let productList = [];
  let sortedProductList = [];
  let sortBy = '';

  async function getProducts() {
    productList = await getData(category);
  }

  function sortProducts() {
    // Sort products array based on sortBy criteria
    if (sortBy === 'name') {
        sortedProductList  = productList.sort((a, b) => {return a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)});
        // console.log(sortedProductList);
        // return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        sortedProductList = productList.sort((a, b) => {return a.FinalPrice - b.FinalPrice});
        // console.log(sortedProductList);
        // return a.price - b.price;
      }
  }

  onMount(getProducts);
</script>

<h2>Top Products: {category}</h2>
<p>Sort {category} by:</p>
<select id="sortOptions" bind:value={sortBy} on:change={sortProducts}>
  <option value="" selected disabled hidden>Select</option>
  <option value="name">Name</option>
  <option value="price">Price</option>
</select>
{#if sortedProductList.length}
  <ul class="product-list">
    {#each sortedProductList as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>
{:else}
  <ul class="product-list">
    {#each productList as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>
{/if}
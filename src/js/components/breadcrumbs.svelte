<script>
  export let items = [];
</script>

<nav class="breadcrumb">
  {#each items as item, index}
    <li>
      {#if index === items.length - 1}
        {item.text}
      {:else}
        <a href={item.href}>{item.text}</a>
      {/if}
    </li>
  {/each}
</nav>

<style>
  .breadcrumb {
    list-style: none;
    padding: 8px 16px;
    margin-bottom: 0;
    background-color: #eee;
  }

  .breadcrumb li {
    display: inline-block;
    font-size: 14px;
  }

  .breadcrumb li + li:before {
    padding: 8px;
    color: black;
    content: '/';
  }

  .breadcrumb a {
    color: #0275d8;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: #01447e;
    text-decoration: underline;
  }
</style>

<script>
  export let crumbs = [];
</script>

<nav>
  {#each crumbs as { name, url }, index}
    <a href={url}>{name}</a>
    {#if index < crumbs.length - 1}
      /
    {/if}
  {/each}
</nav>

<style>
  nav {
    font-size: 1em;
    color: #333;
  }
  nav a {
    color: #333;
    text-decoration: none;
  }
  nav a:hover {
    color: #0077cc;
  }
</style>

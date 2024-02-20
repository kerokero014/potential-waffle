<script>
  let bannerVisible = true; // Define bannerVisible

  function handleBannerClose() { // Define handleBannerClose
    bannerVisible = false;
  }

  function handleRegister() { // Define handleRegister
    alert('You have successfully registered! Enjoy the giveaway and exclusive offers!');
    bannerVisible = false;
  }

  // Move the DOMContentLoaded event listener inside onMount lifecycle hook
  import { onMount } from 'svelte';

  onMount(() => {
    const welcomeModal = document.getElementById('welcomeModal');
    const closeBtn = document.querySelector('.close-btn');
    const registerBtn = document.getElementById('registerBtn');

    // Show the modal when the page loads
    welcomeModal.style.display = 'block';

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', function() {
      welcomeModal.style.display = 'none';
    });

    // Simulate registration process when register button is clicked
    registerBtn.addEventListener('click', function() {
      alert('You have successfully registered! Enjoy the giveaway and exclusive offers!');
      welcomeModal.style.display = 'none';
    });
  });
</script>

{#if bannerVisible}
  <div id="welcomeModal" class="modal">
    <div class="modal-content">
      <button class="close-btn" on:click={handleBannerClose} on:keydown={handleBannerClose}
        >&times;</button
      >
      <h2>Welcome to Sleep Outside!⛰️</h2>
      <p>Register now to participate in our giveaway and receive exclusive offers!</p>
      <button id="registerBtn" on:click={handleRegister}>Register Now</button>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal-content {
    background-color: white;
    margin: 20% auto;
    padding: 20px;
    border: 1px solid #0b0b0b;
    width: 60%;
    text-align: center;
    border-radius: 15px;
  }

  .close-btn {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
    background-color: tomato;
    padding: 5px 10px;

  }
  .close-btn:hover,
  .close-btn:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  #registerBtn {
    background-color:#135d66;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
  }

  #registerBtn:hover {
    background-color: #3673b4;
  }

</style>

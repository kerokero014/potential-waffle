<script>
  // Function to handle quick view button clicks
  function handleQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const overlays = document.querySelectorAll('.quick-view-overlay');

    quickViewBtns.forEach(function(btn, index) {
      btn.addEventListener('click', function() {
        overlays[index].style.display = 'block';
      });
    });
  }

  // Function to handle closing quick view overlays
  function handleCloseOverlay() {
    const closeBtns = document.querySelectorAll('.close-btn');

    closeBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        btn.parentElement.parentElement.style.display = 'none';
      });
    });
  }

  // Call the functions when the component is mounted
  onMount(() => {
    handleQuickView();
    handleCloseOverlay();
  });
</script>

<button class="qb quick-view-btn">Quick View</button>
<div class="quick-view-overlay" style="display: none;">
    <!-- Overlay content -->
    <button class="close-btn">Close</button>
</div>
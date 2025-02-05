document.addEventListener("DOMContentLoaded", () => {
  // Preorder form handler (only attach if the form exists)
  const preorderForm = document.querySelector('#preorder-form');
  if (preorderForm) {
    preorderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Retrieve and trim input values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const quantity = document.getElementById('quantity').value.trim();
      const comments = document.getElementById('comments').value.trim();

      if (name && email && quantity) {
        alert(`Thank you, ${name}! Your preorder for ${quantity} AquaSpectra™ unit(s) has been received.`);
        preorderForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
});

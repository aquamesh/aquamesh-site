document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Handle Cookie Banner (if present)
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.style.display = 'block';
    }
    document.getElementById('accept-cookies').addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  // Preorder form handler (only attach if the form exists)
  const preorderForm = document.getElementById('preorder-form');
  if (preorderForm) {
    preorderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Retrieve and trim input values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const quantity = document.getElementById('quantity').value.trim();
      const comments = document.getElementById('comments').value.trim();

      // Debug log (optional)
      console.log("Captured Values:", { name, email, quantity, comments });

      if (name && email && quantity) {
        alert(`Thank you, ${name}! Your preorder for ${quantity} AquaSpectra™ unit(s) has been received.`);
        preorderForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
});

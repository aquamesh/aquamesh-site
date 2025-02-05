document.addEventListener("DOMContentLoaded", () => {
  // Set the current year in the footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Handle the Cookie Banner
  const cookieBanner = document.getElementById("cookie-banner");
  if (cookieBanner) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.style.display = 'block';
    }
    const acceptCookiesButton = document.getElementById("accept-cookies");
    if (acceptCookiesButton) {
      acceptCookiesButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
      });
    }
  }

  // Preorder Form Handler
  const preorderForm = document.getElementById("preorder-form");
  if (preorderForm) {
    preorderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Retrieve and trim the input values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const comments = document.getElementById("comments").value.trim();

      if (name && email && quantity) {
        alert(`Thank you, ${name}! Your preorder for ${quantity} AquaSpectra™ unit(s) has been received.`);
        preorderForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }
});

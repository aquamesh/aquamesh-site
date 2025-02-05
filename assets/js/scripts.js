// Log to confirm the JS file is loaded
console.log("scripts.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Set current year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  } else {
    console.error("Year element not found");
  }

  // Handle Cookie Banner
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
    } else {
      console.error("Accept Cookies button not found");
    }
  } else {
    console.error("Cookie banner not found");
  }

  // Preorder Form Handler
  const preorderForm = document.getElementById("preorder-form");
  if (preorderForm) {
    preorderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Preorder form submitted");

      // Retrieve form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const comments = document.getElementById("comments").value.trim();

      console.log("Captured Values:", { name, email, quantity, comments });

      if (name && email && quantity) {
        alert(`Thank you, ${name}! Your preorder for ${quantity} AquaSpectra™ unit(s) has been received.`);
        preorderForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  } else {
    console.error("Preorder form not found");
  }
});

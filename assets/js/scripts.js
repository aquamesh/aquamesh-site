document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and external script is executing.");

  // Set the current year in the footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
    console.log("Footer year set to:", yearElement.textContent);
  } else {
    console.error("Year element not found.");
  }

  // Handle the Cookie Banner
  const cookieBanner = document.getElementById("cookie-banner");
  if (cookieBanner) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.style.display = 'block';
      console.log("Cookie banner displayed.");
    }
    const acceptCookiesButton = document.getElementById("accept-cookies");
    if (acceptCookiesButton) {
      acceptCookiesButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
        console.log("Cookies accepted. Cookie banner hidden.");
      });
    } else {
      console.error("Accept Cookies button not found.");
    }
  } else {
    console.error("Cookie banner not found.");
  }

  // Preorder Form Handler
  const preorderForm = document.getElementById("preorder-form");
  if (preorderForm) {
    console.log("Preorder form found. Attaching submit event listener.");
    preorderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Preorder form submitted.");

      // Retrieve and trim the input values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const comments = document.getElementById("comments").value.trim();

      console.log("Captured Values:", { name, email, quantity, comments });

      if (name && email && quantity) {
        alert(`Thank you, ${name}! Your preorder for ${quantity} AquaSpectra™ unit(s) has been received.`);
        preorderForm.reset();
        console.log("Form reset after successful submission.");
      } else {
        alert('Please fill in all required fields.');
        console.log("Form submission blocked: missing required fields.");
      }
    });
  } else {
    console.error("Preorder form not found.");
  }
});

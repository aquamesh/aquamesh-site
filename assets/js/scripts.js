// Quick fix: If the URL ends with success.html or cancel.html, redirect to preorder.html.
if (window.location.pathname.endsWith("success.html") || window.location.pathname.endsWith("cancel.html")) {
  window.location.href = "preorder.html";
}

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

  // Preorder Form Handler with Stripe Checkout Integration
  const preorderForm = document.getElementById("preorder-form");
  if (preorderForm) {
    console.log("Preorder form found. Attaching submit event listener.");
    preorderForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Preorder form submitted.");

      // Retrieve and trim the input values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const comments = document.getElementById("comments").value.trim();

      console.log("Captured Values:", { name, email, quantity, comments });

      if (name && email && quantity) {
        // Optionally, show a loading message:
        document.getElementById("loading-message").style.display = "block";

        // Build the payload
        const payload = { name, email, quantity, comments };

        try {
          // Call your backend endpoint that creates a Stripe checkout session
          const response = await fetch("https://wwrg1xdnr2.execute-api.us-west-1.amazonaws.com/live/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Failed to create checkout session.");
          }

          const data = await response.json();
          console.log("Response data:", data);

          // Optionally hide the loading message
          document.getElementById("loading-message").style.display = "none";

          if (data.url) {
            // Redirect to Stripe Checkout
            console.log("Redirecting to Stripe Checkout:", data.url);
            window.location.href = data.url;
          } else {
            alert("Unexpected response: no checkout URL returned.");
            console.error("No checkout URL returned in response.");
          }
        } catch (error) {
          // Optionally hide the loading message
          document.getElementById("loading-message").style.display = "none";
          alert("Error processing your order: " + error.message);
          console.error("Error:", error);
        }
      } else {
        alert('Please fill in all required fields.');
        console.log("Form submission blocked: missing required fields.");
      }
    });
  } else {
    console.error("Preorder form not found.");
  }
});

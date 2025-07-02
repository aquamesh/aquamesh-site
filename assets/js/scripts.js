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

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const quantity = document.getElementById("quantity").value.trim();
      const comments = document.getElementById("comments").value.trim();

      console.log("Captured Values:", { name, email, quantity, comments });

      if (name && email && quantity) {
        document.getElementById("loading-message").style.display = "block";
        const payload = { name, email, quantity, comments };

        try {
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

          document.getElementById("loading-message").style.display = "none";

          if (data.url) {
            console.log("Redirecting to Stripe Checkout:", data.url);
            window.location.href = data.url;
          } else {
            alert("Unexpected response: no checkout URL returned.");
            console.error("No checkout URL returned in response.");
          }
        } catch (error) {
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


document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === 'undefined') {
      console.error("GSAP is not loaded. Please ensure gsap.min.js is included before this script.");
      return;
  }
  if (typeof MotionPathPlugin === 'undefined') {
      console.error("MotionPathPlugin is not loaded. Please ensure MotionPathPlugin.min.js is included.");
      return;
  }

  gsap.registerPlugin(MotionPathPlugin);

  // Initial state: hide elements
  gsap.set("#aquamesh-svg", { autoAlpha: 0 }); 
  gsap.set(".sensor-icon", { autoAlpha: 0, scale: 0.8 });
  gsap.set("#gateway", { autoAlpha: 0, scale: 0.8 });
  gsap.set("#cloud-group", { autoAlpha: 0, scale: 0.8 });
  gsap.set("#dashboard", { autoAlpha: 0, scale: 0.8 });

  // Set lines initial dash offset (drawSVG-like)
  document.querySelectorAll("#mesh-lines path, #gateway-lines path").forEach(path => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 0 });
  });

  gsap.set("#dot1, #cloud-dot", { autoAlpha: 0 });

  // Timeline paused until play button clicked
  const mainTimeline = gsap.timeline({ paused: true });

  mainTimeline.to("#aquamesh-svg", { autoAlpha: 1, duration: 0.5 }, 0)

    .to(".sensor-icon", {
        scale: 1, autoAlpha: 1,
        stagger: 0.15, ease: "back.out(1.7)", duration: 0.8,
        onStart: () => console.log("Animating sensors")
    }, "+=0.1")

    .to("#gateway", {
        scale: 1, autoAlpha: 1,
        ease: "back.out(1.7)", duration: 0.8,
        onStart: () => console.log("Animating gateway")
    }, ">")

    .to("#cloud-group", {
        scale: 1, autoAlpha: 1,
        ease: "back.out(1.7)", duration: 0.8
    }, ">")

    .to("#dashboard", {
        scale: 1, autoAlpha: 1,
        ease: "back.out(1.7)", duration: 0.8
    }, ">")

    .to("#mesh-lines path", {
        strokeDashoffset: 0, autoAlpha: 1,
        stagger: 0.08, duration: 1.5, ease: "power2.inOut"
    }, "+=0.1")

    .to("#gateway-lines path", {
        strokeDashoffset: 0, autoAlpha: 1,
        stagger: 0.1, duration: 1.5, ease: "power2.inOut"
    }, "+=0.1");

  const playButton = document.getElementById("playAnimationBtn");
  if (playButton) {
    playButton.addEventListener("click", () => {
      console.log("Play Animation button clicked");
      mainTimeline.restart();
    });
  } else {
    console.error("Play Animation button (#playAnimationBtn) not found.");
  }
});

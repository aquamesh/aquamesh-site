document.addEventListener("DOMContentLoaded", () => {
  // Uncomment and update the following line with your actual authentication URL
  // authenticateUser();

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

// Function to authenticate the user (update the URL before enabling)
/*function authenticateUser() {
  // Replace the placeholder URL with your actual authentication endpoint URL
  const authUrl = 'https://your-authentication-endpoint.example.com/authenticate';

  fetch(authUrl, {
    method: 'GET',
    credentials: 'include', // include cookies/credentials in the request
    headers: {
      'Content-Type': 'application/json',
      // Uncomment and set your Authorization header if needed:
      // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
  })
  .then(response => {
    if (response.status === 401) {
      console.error('Authentication failed: Unauthorized (401). Please check your credentials or login status.');
    }
    return response.json();
  })
  .then(data => {
    console.log('Authentication data:', data);
    // You can add further handling here if needed.
  })
  .catch(error => {
    console.error('Authentication fetch error:', error);
  });
}*/

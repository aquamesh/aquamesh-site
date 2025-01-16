// Form Submission Handler
document.querySelector('#preorder-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const quantity = document.getElementById('quantity').value;
    const comments = document.getElementById('comments').value;

    if (name && email && quantity) {
        alert(`Thank you, ${name}! Your preorder for ${quantity} AquaSpectra™ unit(s) has been received.`);
        // Reset form
        document.getElementById('preorder-form').reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

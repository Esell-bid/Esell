
function fetchUserDetails() {
  var userEmail = localStorage.getItem("userEmail"); // Replace with the actual user email address

  return fetch(`http://localhost:8080/user/${encodeURIComponent(userEmail)}`)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error: ' + response.status);
    })
    .then(function(user) {
      // Access the user details and update the HTML elements
      document.querySelector('.name p').textContent = user.firstName + ' ' + user.lastName;
      document.querySelector('.number p').textContent = user.phoneNumber;
      document.querySelector('.mail p').textContent = user.email;
      document.querySelector('.accinfo p').textContent = user.bankDetails.accountNumber;
      document.querySelector('.ifsc p').textContent = user.bankDetails.ifscCode;
    })
    .catch(function(error) {
      console.error(error);
    });
}

// Call the function to fetch and display user details
fetchUserDetails();
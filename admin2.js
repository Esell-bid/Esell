fetch('http://localhost:8080/admin2/users')
  .then(response => response.json())
  .then(users => {
    const userTableBody = document.querySelector('#userTable ');

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.isDisabled}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.password}</td>
        <td>
            <button onclick="deleteUser('${user._id}')">Delete</button>
            <button class="block-btn" data-user-id="${user._id}">Block</button>
        </td>
        
        
      `;
      userTableBody.appendChild(row);
    });
  })

  
  .catch(error => {
    console.error('Error fetching users:', error);
  });

  function deleteUser() {
    // Logic to delete user
    console.log("User deleted.");
}

function blockUser() {
    // Logic to block user
    console.log("User blocked.");
}



function deleteUser(id) {
    fetch(`http://localhost:8080/admin2/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('User deleted.');
          // Refresh the user table or update UI accordingly
        } else {
          console.error('Failed to delete user:', response.status);
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }

  // document.addEventListener("DOMContentLoaded", function () {
  //   // Retrieve the table and attach a click event listener to it
  //   const userTable = document.getElementById("userTable");
  //   userTable.addEventListener("click", handleTableClick);
  
  //   function handleTableClick(event) {
  //     // Check if the clicked element is the "Block" button
  //     if (event.target.classList.contains("block-btn")) {
  //       const row = event.target.parentNode.parentNode; // Get the parent row of the clicked button
  //       const userId = row.getAttribute("data-user-id"); // Retrieve the user ID from the row's attribute
  
  //       // Send a POST request to the server to block the user
  //       fetch(`/admin2/users/${userId}/block`, { method: "POST" })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log(data); // Display the response from the server
  //           // Handle any UI updates or display success messages
  //         })
  //         .catch((error) => {
  //           console.error("Error blocking user:", error);
  //           // Handle errors or display error messages
  //         });
  //     }
  //   }
  // });

  // Block user function
function blockUserRequest(userId) {
  fetch(`/admin2/users/${userId}/block`, {
    method: 'POST',
  })
    .then(response => {
      if (response.ok) {
        console.log('User blocked.');
        // Refresh the user table or update UI accordingly
      } else {
        console.error('Failed to block user:', response.status);
      }
    })
    .catch(error => {
      console.error('Error blocking user:', error);
    });
}
  

  // Attach click event listeners to block buttons
const blockButtons = document.querySelectorAll(".block-btn");

blockButtons.forEach(button => {
  button.addEventListener("click", () => {
    const userId = button.getAttribute("data-user-id");
    blockUserRequest(userId);
  });
});

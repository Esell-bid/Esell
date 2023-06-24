fetch('http://localhost:3000/admin2/users')
  .then(response => response.json())
  .then(users => {
    const userTableBody = document.querySelector('#userTable ');

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
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
    fetch(`http://localhost:3000/admin2/users/${id}`, {
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
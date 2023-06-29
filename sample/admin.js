// admin.js
// Fetch user data from the server
fetch('http://localhost:8080/admin/users')
  .then(response => response.json())
  .then(users => {
    const userTableBody = document.querySelector('#userTable tbody');

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        

      
      `;
      userTableBody.appendChild(row);
    });
  })

  
  .catch(error => {
    console.error('Error fetching users:', error);
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const userId = button.getAttribute('data-user-id');
    deleteUserData(userId);
  });
});

const deleteUserData = async (id) => {
  try {
    const response = await fetch(`/admin/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('User deleted successfully');
      // Perform any necessary UI updates after successful deletion
    } else {
      console.error('Error deleting user:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

  
  
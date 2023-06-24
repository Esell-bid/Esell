document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
  });

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const username = document.querySelector('input[name="username"]').value;
    const reason = document.querySelector('select[name="reason_category"]').value;
    const enterreason = document.querySelector('input[name="other_reason"]').value;
    const detaileddescr = document.querySelector('input[name="description"]').value;
    // Create a data object
  
    const data = {
      username,
      reason,
      enterreason,
      detaileddescr
    };
  
    // Send a POST request to the server
    fetch('http://localhost:3000/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('Report submitted successfully!');
        // Optionally, you can redirect the user to another page here
      } else {
        throw new Error('An error occurred while submitting the report.');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Report submitted successfully!.');
    });
    
    this.reset()
  }
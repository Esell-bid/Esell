document.getElementById('myform').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var category = document.getElementById('category').value;
  var description = document.getElementById('description').value;
  var quantity = document.getElementById('numb').value;
  var price = document.getElementById('price').value;
  var currentBid = document.getElementById('price').value;
  var date = document.getElementById('startDate').value;
  var email = localStorage.getItem('userEmail');
  var images = document.getElementById('image').files; // Get the selected image files

  var formData = new FormData();
  formData.append('name', name);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('quantity', quantity);
  formData.append('price', price);
  formData.append('currentBid', currentBid);
  formData.append('date', date);
  formData.append('email', email);

  // Append each selected image file to the FormData
  for (var i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  fetch('http://localhost:3000/submit-form', {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    if (response.ok) {
      alert("Product submitted successfully and under verification");
      console.log('Form submitted successfully');
      // Reset the form
      document.getElementById('myform').reset();
    } else {
      throw new Error('Error submitting form');
    }
  })
  .catch(function(error) {
    console.error('Error:', error.message);
  });
});
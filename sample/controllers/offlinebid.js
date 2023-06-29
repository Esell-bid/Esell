function submitForm() {
    // Access the form element using the form name
    const form = document.forms.myForm;
  
    // Get the values of the form fields
    const place = form.place.value;
    const startTime = form.startTime.value;
    const endTime = form.endTime.value;
    const location = form.location.value;
    const date = form.date.value;
    const product = form.product.value;
  
    // Do something with the form data
    console.log('place:', place);
    console.log('startTime:', startTime);
    console.log('endTime:', endTime);
    console.log('location:', location);
    console.log('date:', date);
    console.log('product:', product);
  
    // You can also submit the form to a server using AJAX or other methods
  
  
  
    const biddingDetails = {
      place: place,
    startTime: startTime,
    endTime: endTime,
    location: location,
    date: date,
    product: product,
    };
  
    fetch('http://localhost:8080/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(biddingDetails),
    })
      .then(response => response.json())
      .then(data => {
        // Handle response from server, if needed
      })
      .catch(error => {
        console.error('Error submitting bidding details', error);
      });
  }

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('product-body');

  fetch('http://localhost:8080/product-approval/products')
  
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    
    })
    
    .then(products => {
      products.forEach(product => {
        const row = document.createElement('tr');
        console.log(products)
        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.category;
        row.appendChild(categoryCell);

        const idCell = document.createElement('td');
        idCell.textContent = product._id;
        row.appendChild(idCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;
        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        // const currentbidCell = document.createElement('td');
        // currentbidCell.textContent = product.currentbid;
        // row.appendChild(currentbidCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = product.date;
        row.appendChild(dateCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = product.email;
        row.appendChild(emailCell);

        // const imageCell = document.createElement('td');
        // imageCell.textContent = product.images.url;
        // row.appendChild(imageCell);

        const actionsCell = document.createElement('td');
        const acceptBtn = document.createElement('button');
        acceptBtn.textContent = 'Accept';
        acceptBtn.classList.add('btn', 'accept');
        actionsCell.appendChild(acceptBtn);

        const rejectBtn = document.createElement('button');
        rejectBtn.textContent = 'Reject';
        rejectBtn.classList.add('btn', 'reject');
        actionsCell.appendChild(rejectBtn);

        row.appendChild(actionsCell);

        tableBody.appendChild(row);

        acceptBtn.addEventListener('click', () => {
          // Add the product to the accepted products collection
          addAcceptedProduct(product._id)
            .then(() => {
              // Remove the product from the table
              row.remove();
            })
            .catch(error => {
              console.error('Error adding accepted product:', error);
            });
        });
        rejectBtn.addEventListener('click', () => {
          // Send a request to reject the product
          rejectProduct(product._id)
            .then(() => {
              // Remove the product from the table
              row.remove();
              // Send email to the user
      sendRejectionEmail(product.email)
      .then(() => {
        console.log('Rejection email sent');
      })
      .catch(error => {
        console.error('Error sending rejection email:', error);
      });
  })
  .catch(error => {
    console.error('Error rejecting product:', error);
  });
});
      });
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
});

const addAcceptedProduct = async (productId) => {
  try {
    console.log(productId)
    const response = await fetch(`http://localhost:8080/product-approval/accept/${productId}`, {
      method: 'POST',
    });

    const data = await response.json();
    // Handle response from server, if needed
  } catch (error) {
    console.error('Error submitting bidding details', error);
  }
};

const rejectProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:8080/product-approval/reject/${productId}`, {
      method: 'POST',
    });

    const data = await response.json();
    // Handle response from server, if needed
  } catch (error) {
    console.error('Error rejecting product:', error);
  }
};

const sendRejectionEmail = async (email) => {
  try {
    const response = await fetch('http://localhost:8080/product-approval/send-rejection-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    // Handle response from server, if needed
  } catch (error) {
    console.error('Error sending rejection email:', error);
  }
};


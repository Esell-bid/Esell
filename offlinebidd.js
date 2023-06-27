// Fetch the data from the server
document.addEventListener('DOMContentLoaded', () => {
fetch('http://localhost:3000/offlinebidd')
  .then(response => response.json())
  .then(data => {
    const cardContainer = document.getElementById('card-container');

    // Clear existing content
    cardContainer.innerHTML = '';

    // Check if there is data available
    if (data.length > 0) {
      // Sort the data by date in ascending order
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Iterate through the data and create card elements
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        // const itemName = document.createElement('h3');
        // itemName.textContent = item.name;

        const itemPlace = document.createElement('p');
        itemPlace.textContent = `Place: ${item.place}`;

        const itemStartTime = document.createElement('p');
        itemStartTime.textContent = `Start Time: ${item.startTime}`;

        const itemEndTime = document.createElement('p');
        itemEndTime.textContent = `End Time: ${item.endTime}`;

        const itemLocation = document.createElement('p');
        itemLocation.textContent = `Location: ${item.location}`;

        const itemDate = document.createElement('p');
        itemDate.textContent = `Date: ${item.date}`;

        const itemProduct = document.createElement('p');
        itemProduct.textContent = `Product: ${item.product}`;

        // cardContent.appendChild(itemName);
        cardContent.appendChild(itemPlace);
        cardContent.appendChild(itemStartTime);
        cardContent.appendChild(itemEndTime);
        cardContent.appendChild(itemLocation);
        cardContent.appendChild(itemDate);
        cardContent.appendChild(itemProduct);

        card.appendChild(cardContent);
        cardContainer.appendChild(card);
      });
    } else {
      // Display a message if no data is available
      const noDataItem = document.createElement('p');
      noDataItem.textContent = 'No data available.';
      cardContainer.appendChild(noDataItem);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    const errorItem = document.createElement('p');
    errorItem.textContent = 'Error fetching data.';
    cardContainer.appendChild(errorItem);
  });



  // Get the search input element
const categorySearchInput = document.getElementById('category-search');

// Add an event listener to the search input
categorySearchInput.addEventListener('input', () => {
  const searchTerm = categorySearchInput.value.toLowerCase();

  // Loop through the cards and show/hide based on the category match
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const category = card.getAttribute('data-category').toLowerCase(); // Retrieve the category attribute
    if (category.includes(searchTerm) || searchTerm === '') {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
});


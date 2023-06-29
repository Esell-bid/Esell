// controllers/biddingController.js

const Bidding = require('../models/bidding');

exports.submitData = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new bidding entry
    const bidding = new Bidding({
      title,
      description,
      // ...
    });

    // Save the bidding entry to the database
    await bidding.save();

    res.status(201).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error submitting data', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Function to create a table row with the provided data
function createTableRow(bidding) {
    const { place, startTime, endTime, location, date, product } = bidding;
  
    const tableRow = document.createElement('tr');
  
    const placeCell = document.createElement('td');
    placeCell.textContent = place;
    tableRow.appendChild(placeCell);
  
    const startTimeCell = document.createElement('td');
    startTimeCell.textContent = startTime;
    tableRow.appendChild(startTimeCell);
  
    const endTimeCell = document.createElement('td');
    endTimeCell.textContent = endTime;
    tableRow.appendChild(endTimeCell);
  
    const locationCell = document.createElement('td');
    locationCell.textContent = location;
    tableRow.appendChild(locationCell);
  
    const dateCell = document.createElement('td');
    dateCell.textContent = date;
    tableRow.appendChild(dateCell);
  
    const productCell = document.createElement('td');
    productCell.textContent = product;
    tableRow.appendChild(productCell);
  
    return tableRow;
  }
  
  // Function to fetch the bidding details and populate the table
  async function fetchBiddingDetails() {
    try {
      const response = await fetch('/biddings');
      const data = await response.json();
  
      const biddingTable = document.querySelector('#biddingTable tbody');
  
      // Clear existing table rows
      biddingTable.innerHTML = '';
  
      // Populate the table with retrieved data
      data.forEach((bidding) => {
        const tableRow = createTableRow(bidding);
        biddingTable.appendChild(tableRow);
      });
    } catch (error) {
      console.error('Error fetching bidding details', error);
      // Handle the error
    }
  }
  
  // Call the function to fetch and populate the table on page load
  fetchBiddingDetails();
  
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const CONNECT_URL = "mongodb+srv://jibbinjacob:jibbin2002@cluster0.gq0orgc.mongodb.net/esell2024?retryWrites=true&w=majority" 
mongoose
.connect(CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
console.log("connected")
    app.listen(process.env.PORT || 8080);
})
.catch((error) => {
console.log(error);
});


// Create a schema for the bidding details
const biddingSchema = new mongoose.Schema({
    place: String,
    startTime: String,
    endTime: String,
    location: String,
    date: String,
    product: String,
  });
  
  // Create a model for the bidding details
  const Bidding = mongoose.model('Bidding', biddingSchema);
  
  app.use(express.json());

  // Handle the form submission
app.post('/submit', (req, res) => {
    const { place, startTime, endTime, location, date, product } = req.body;
  
    // Create a new bidding document
    const bidding = new Bidding({
      place: place,
      startTime: startTime,
      endTime: endTime,
      location: location,
      date: date,
      product: product,
    });

    // Save the bidding document to the database
  bidding.save()
  .then(() => {
    res.status(200).json({ message: 'Bidding details saved successfully' });
  })
  .catch(error => {
    console.error('Error saving bidding details', error);
    res.status(500).json({ error: 'An error occurred' });
  });
});

// Save the document to the database
acceptedProduct.save()
.then(savedProduct => {
  console.log('Accepted product added:', savedProduct);
})
.catch(error => {
  console.error('Error adding accepted product:', error);
});
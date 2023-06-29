const mongoose = require('mongoose');

const acceptedProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  // Other fields as needed
});

const AcceptedProduct = mongoose.model('AcceptedProduct', acceptedProductSchema);

module.exports = { AcceptedProduct };

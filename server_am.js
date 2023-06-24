const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connection URL and database name
const url = 'mongodb+srv://jibbinjacob:jibbin2002@cluster0.gq0orgc.mongodb.net/esell2024?retryWrites=true&w=majority';
const dbName = 'esell2024'; // Replace with your actual database name

// Connect to MongoDB
mongoose.connect(`${url}/${dbName}`,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  const reportSchema = new mongoose.Schema({
    username: String,
    reason: String,
    otherReason: String,
    detailedDescription: String,
  });

  const Report = mongoose.model('Report', reportSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static('public'));

// Define the route for form submission
app.post('/reports', function (req, res) {
  // Get the form data from the request body
  const { username, reason, enterreason, detaileddescr } = req.body;

  // Create a new product instance
  const report = new Report({
    username,
    reason,
    otherReason: enterreason,
    detailedDescription: detaileddescr,
  });

  // Save the product to the database
  report.save()
    .then(() => {
      console.log('reported successfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error reporting:', error);
      res.status(500).send('Error saving product to the database');
    });
});

/////////////////////////////////////////////////////////////////////
// Define a user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  mobile: String,
  email: String,
  accountno: String,
  ifsc: String,
});

const User = mongoose.model('users', userSchema);

// Set up API endpoint to fetch user profile data
app.get('/api/profile', (req, res) => {
  User.findOne({}, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!user) {
      res.status(404).json({ error: 'User profile not found' });
    } else {
      res.json(user);
    }
  });
});


// Start the server
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

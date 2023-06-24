//SING UP FORM
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors =require('cors');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const async = require('hbs/lib/async');
// Connect to MongoDB
mongoose.connect('mongodb+srv://jibbinjacob:jibbin2002@cluster0.gq0orgc.mongodb.net/esell2024', { useNewUrlParser: true, useUnifiedTopology: true,family:4 })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for the user collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isDisabled:{
    type:Boolean
  },
  address: {
    streetAddress1: {
      type: String,
      required: true
    },
    streetAddress2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: true
    },
    ifscCode: {
      type: String,
      required: true
    },
    upiId: {
      type: String,
      required: true
    }
  }
});
// Create a user model based on the schema
const User = mongoose.model('User', userSchema);
app.use(cors(
  {
    origin: '*'
  }
))
app.use(express.json());
app.use(express.static(__dirname + '/forgotpass')); 
app.use(express.urlencoded({ extended: true }));
// // Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});



//EMAIL FOR SIGNUP
app.post('/signup', async (req, res) => {
  // Extract the form data from the request
   const { username, password, email, phonenumber, firstname, lastname, isDisabled, addressLine1, addressLine2, accountNumber, ifscCode, upiId, state, Country, pincode, city } = req.body;
  const bankDetails = {
    accountNumber,
    ifscCode,
    upiId
  }
  const address = {
    streetAddress1: addressLine1,
    streetAddress2: addressLine2,
    country: Country,
    state,
    pincode,
    city,
  }
  // Create a new user instance
 try{ const newUser = new User({
    username,
    password,
    email,
    phoneNumber: phonenumber,
    firstName: firstname,
    lastName: lastname,
    isDisabled,
    address,
    bankDetails,
  });
// Save the user to the database
    await newUser.save();
// Send registration email to the user
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'esellbid@gmail.com',
        pass: 'xydtsjpmirtyjkwo',
      },
    });

    const mailOptions = {
      from: 'esellbid@gmail.com',
      to: email,
      subject: 'Welcome to Our Website',
      text: 'Thank you for registering on our website!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: error });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'User created successfully. Registration email sent.' });
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});


// LoGIN FORM

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      // Successful login
      res.json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




//LOGIN 


// Middleware to parse JSON data
app.use(express.json());

// Serve static files (HTML, CSS, images)
app.use(express.static('public'));

// Route to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  User.findOne({ username })
    .then(user => {
      if (user) {
        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password)
          .then(match => {
            if (match) {
              // Passwords match, user is authenticated
              res.json({ message: 'Login successful' });
            } else {
              // Passwords don't match, authentication failed
              res.status(401).json({ message: 'Invalid username or password' });
            }
          });
      } else {
        // User not found
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Error finding user' });
    });
});

//PROFILE UPDATE

// Route to handle the update profile request


// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes
app.post('/update-profile', (req, res) => {
  // Get the form data from the request body
  const { phoneNumber, addressLine1, addressLine2, city, state, pincode, accountNumber, ifscCode, upiId } = req.body;

  // Find the user by their unique identifier (e.g., user ID) and update their profile
  User.findOneAndUpdate(
    {username: 'llllllll' }, // Replace 'USER_ID' with the actual user's ID
    { phoneNumber, addressLine1, addressLine2, city, state, pincode, accountNumber, ifscCode, upiId },
    { new: true } // Return the updated document
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({ message: 'Profile updated successfully', user: updatedUser });
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
      return res.status(500).json({ message: 'Failed to update profile' });
    });
});

//forgot password

app.post('/forgor-password', async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'esellbid@gmail.com',
      pass: 'xydtsjpmirtyjkwo',
    },
  });

  const mailOptions = {
    from: 'esellbid@gmail.com',
    to: email,
    subject: 'Forgot Password',
    text: ' To reset password click this link \n http://127.0.0.1:5500/project/forgotpass/link.html',
  };

  // Create reusable transporter object using the default SMTP transport

 var user = await User.findOne({ email });
 console.log(user);
    if (user) {
      console.log(email);
      console.log(user.email);
      // Compare the provided password with the stored hashed password
      var match = email === user.email;
        console.log(match);
          if (match) {
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error(error)
                res.status(500).json({ error: error });
              } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Password reset email sent successfully' });
              }
            });
            // Passwords match, user is authenticated
          } else {
            // Passwords don't match, authentication failed
            res.status(401).json({ message: 'Email not registered' });
          }
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  })


//ADMIN CONFIRMATION

app.get('/admin2/users', (req, res) => {
    
  User.find({}, 'firstName email username')
    .exec()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Serve the admin.html page
app.get('/admin2', (req, res) => {
res.sendFile(path.join(__dirname, 'admin2.html'));
});



// Route for deleting a user
app.delete('/admin2/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user by ID and remove it from the database
    const user = await User.findByIdAndRemove(id).select('email');

    // Send email notification to the user
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'esellbid@gmail.com',
        pass: 'xydtsjpmirtyjkwo',
      },
    });

    const mailOptions = {
      from: 'esellbid@gmail.com',
      to: user.email, // Change this to the admin's email address
      subject: 'User Deleted',
      text: 'A user has been deleted by the admin.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.post("/admin2/users/:id/block", async (req, res) => {
const id = req.params.id;

try {
  // Find the user by ID and update their blocked status
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { blocked: true, blockedUntil: Date.now() + 7 * 24 * 60 * 60 * 1000 } },
    { new: true }
  );

  res.status(200).json({ message: "User blocked successfully", user });
} catch (error) {
  console.error("Error blocking user:", error);
  res.status(500).json({ error: "An error occurred" });
}
});

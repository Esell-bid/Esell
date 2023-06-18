//SING UP FORM

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors =require('cors');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const async = require('hbs/lib/async');
// Connect to MongoDB
mongoose.connect('mongodb+srv://jibbinjacob:jibbin2002@cluster0.gq0orgc.mongodb.net/esell2024?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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
// Create a route for handling the signup form submission
app.post('/signup', (req, res) => {
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
  const newUser = new User({
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

  console.log(newUser);


   //Save the user to the database
  User.create(newUser)
   .then(() => {
    res.send('User created successfully');
  })
 .catch((error) => {
     console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
   });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
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



// //UPDATE PROFILE


// app.use(bodyParser.json());

// // Serve static files (HTML, CSS, images)
// app.use(express.static('public'));

// // Route to handle the update profile request
// app.post('/update-profile', (req, res) => {
//   const formData = req.body;

//   // Find the user in the database and update their details
//   User.findOneAndUpdate({}, formData, { new: true })
//     .then(updatedUser => {
//       if (updatedUser) {
//         console.log('User details updated:', updatedUser);
//         res.json({ message: 'User details updated successfully' });
//       } else {
//         console.log('User not found');
//         res.status(404).json({ message: 'User not found' });
//       }
//     })
//     .catch(error => {
//       console.error('Error updating user details:', error);
//       res.status(500).json({ message: 'Error updating user details' });
//     });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


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

const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('./env')

/** send mail from testing account */
const signup = async (req, res) => {

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

/** send mail from real gmail account */
const getbill = (req, res) => {

    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


module.exports = {
    signup,
    getbill
}
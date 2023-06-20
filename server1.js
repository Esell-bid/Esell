const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


const app = express();
const port = 3000;

// Cloudinary configuration
cloudinary.config({
  cloud_name: "djrhsrorn",
  api_key: "449643457296112",
  api_secret: "QD0dFwLZ8QbI7aXgx_e8ClbbzOw"
});

// Connection URL and database name
const url = 'mongodb+srv://jibbinjacob:jibbin2002@cluster0.gq0orgc.mongodb.net';
const dbName = 'esell2024'; // Replace with your actual database name

// Connect to MongoDB
mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
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
// Define a schema for the product
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  quantity: Number,
  price: Number,
  currentBid: Number,
  date: Date,
  email: String,
  images: [String], // Store an array of image URLs
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Define a model for the product using the schema
const Product = mongoose.model('Product', productSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

// Multer upload instance
const upload = multer({ storage: storage });

// ...

// Define the route for form submission
app.post('/submit-form', upload.array('images', 5), async (req, res) => {
  // Get the form data from the request body
  const { name, category, description, quantity, price, currentBid, date, email } = req.body;
  const images = req.files.map(file => file.path); // Store an array of Cloudinary URL paths

  try {
    // Find the user in the MongoDB collection based on the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new product instance
    const product = new Product({
      name,
      category,
      description,
      quantity,
      price,
      currentBid,
      date,
      email,
      images,
      user: user._id // Assign the user ID to the product
    });

    // Save the product to the database
    product.save()
      .then(() => {
        console.log('Product saved successfully');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error('Error saving product:', error);
        res.status(500).send('Error saving product to the database');
      });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...


// Rest of your code...




// ...Rest of the code remains the same...


////////////////////--display pro---////////////////////////////////////
// Set up route to retrieve product details
// Set up route to retrieve product details
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (error) {
    console.error('Error retrieving product details from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Fetch a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/////////// pro details display///////////////////
app.post('/update-bid', async (req, res) => {
  const { productId, bidAmount } = req.body;

  if (!productId || !bidAmount) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Update the currentBid value in the database
    const updatedProduct = await Product.findByIdAndUpdate(productId, { currentBid: bidAmount }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json({ message: 'Bid updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating bid:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define the route for generating multiple pages
app.get('/generate-pages', async (req, res) => {
  try {
    // Fetch the product data from MongoDB
    const products = await Product.find();

    // Render the 'product-details' template for each product
    products.forEach(product => {
      res.render('product-details', { product });
    });
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
///// login/////




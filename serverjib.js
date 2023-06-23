const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const methodOverride = require("method-override");
const { Console } = require('console');

// Create the Express app
const app = express();

app.use(cors(
    {
        origin: '*'
    }
  ))

  
  app.use(methodOverride("_method"));


  // Parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));


// Connect to MongoDB
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

// const url = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'esell2024';
const formDataCollectionName = 'formdatas';
const userCollectionName = 'users';
const productsName= 'products';

// // Create a new MongoClient
// const client = new MongoClient(CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the form data
const formDataSchema = new mongoose.Schema({
    place: String,
    startTime: String,
    endTime: String,
    location: String,
    date: Date,
    product: String,
  // Add more fields as needed
});

const userSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  username: String,
});

// Define a Product schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  id: String,
  description: String,
});


// Define a schema for the accepted products
const acceptedProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  quantity: String,
  price: String,
  currentbid: String,
  date: Date,
  
  
  // id: String,
  // Add more fields as needed
});

const productApprovalSchema = new mongoose.Schema({
  // Define the schema fields for product approval
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  // Add any other fields relevant to product approval
});

// Create a model for the form data
const FormData = mongoose.model('FormData', formDataSchema, formDataCollectionName);
const User = mongoose.model('User', userSchema, userCollectionName);
const Product = mongoose.model('Products', productSchema, productsName);
const AcceptedProduct = mongoose.model('AcceptedProduct', acceptedProductSchema);
const ProductApproval = mongoose.model('ProductApproval', productApprovalSchema);



// Handle form submission
app.post('/submit', async(req, res) => {
    // console.log(req.body);

    const { place, startTime, endTime, location, date, product } = req.body;

    // await formDataSchema.biddings.insertOne(req.body)
//   const { place,startTime,endTime,location,date,product } = req.body;

  // Create a new form data document
  const formData = new FormData({
    place,
    startTime,
    endTime,
    location,
    date,
    product,
  });


  // FormData.create(formData)
  // .then(savedData => {
  //   console.log('Document saved:', savedData);
  //   // Handle the success case
  // })
  // .catch(error => {
  //   console.error('Error saving document:', error);
  //   // Handle the error case
  // });

// FormData.save(function(err,result){
//     if (err){
//         console.log(err);
//     }
//     else{
//         // console.log(result)
//     }
// })

  // Save the form data document to the database
  formData.save()
    .then(() => {
      res.status(200).json({ message: 'Form data saved successfully' });
    })
    .catch((error) => {
      console.error('Error saving form data', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Route for fetching data from the MongoDB collection
app.get('/offlinebidd', async (req, res) => {
  // try {
  //   // Connect to the MongoDB server
  //   const client = new MongoClient(CONNECT_URL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   await client.connect();

  //   // Access the database and collection
  //   const db = client.db("esell2024");
  //   const collection = db.collection("formdata");

  //   // Fetch data from the collection
  //   const data = await FormData.find({}).exec(); 
    // {
    // //   if (err) {
    // //     console.error('Error fetching data from the collection:', err);
    // //     return;
    // //   }
  // })
    FormData.find({})
    .then((data) => {

    // Send the data as JSON
    res.json(data);
  } )
  .catch((error) => {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  });
});


// Route for serving the offlinebidd.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'offlinebidd.html'));
});

app.get('/offlinebidd', async (req, res) => {
  try {
    // Fetch data from the collection based on the place field
    const data = await FormData.find({ place: place }).exec();

    // Send the data as JSON
    res.json(data);
    // const searchTerm = req.query.category.toLowerCase(); // Retrieve the search term from the query parameter

    // let data;
    // if (searchTerm) {
    //   // Filter the data based on the category search term
    //   data = await FormData.find({ place: { $regex: searchTerm, $options: 'i' } }).exec();
    // } else {
    //   // Fetch all data if no search term is provided
    //   data = await FormData.find({}).exec();
    // }
    // res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
  });

 
  
 
  
  
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
  
// // Route for deleting a form data document
// app.delete('/offlinebidd/:id', async (req, res) => {
//   const id = req.params.id;

//   try {
//     // Find the form data document by ID and remove it from the database
//     await FormData.findByIdAndRemove(id);
//     res.status(200).json({ message: 'Form data deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting form data:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// Route for deleting a user
app.delete('/admin2/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user by ID and remove it from the database
    await User.findByIdAndRemove(id);
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


// Define a route to fetch product data
app.get('/product-approval/products', async(req, res) => {
  // Find all products in the database
  Product.find({})
    .then(products => {
      res.json(products);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// app.get('/product-approval/products', (req, res) => {   
//   User.find({}, 'name category')
//     .exec()
//     .then((products) => {
//       res.json(products);
//     })
//     .catch((error) => {
//       console.error('Error fetching users:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

app.get('/product-approval', (req, res) => {
  res.sendFile(path.join(__dirname, 'product-approval.html'));
});




// Route to handle the POST request and save the accepted product
// const ObjectId = mongoose.Types.ObjectId;

app.post('/product-approval/accept/:productId', async (req, res) => {
  const productId = req.params.productId;
  console.log(productId)

  try {
    console.log('hello')
    // Check if the provided productId is a valid ObjectI
console.log('hi')
    // Find the product by its ID in the Product collection
    const product = await Product.findById({_id:productId});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log(product.name)
    const { name, category, description, quantity, price, currentbid, date, time } = product;

    // Create a new accepted product based on the found product
    const acceptedProduct = new AcceptedProduct({
      name,
      category,
      description,
      quantity,
      price,
      currentbid,
      date,
      time,
      // Add other fields as needed
    });

    await acceptedProduct.save();

    // Remove the product from the Product collection
    await Product.findByIdAndRemove(productId);

    res.status(200).json({ message: 'Product accepted and moved to accepted products' });
  } catch (error) {
    console.error('Error accepting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







// Start the server
app.listen(3000, () => {
  console.log('Server started on port 8080');
});



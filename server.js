const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose'); // Import mongoose

const app = express();
const port = 3000;

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a schema and model for storing form submissions
const formSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});

const Form = mongoose.model('Form', formSchema);

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, phone, email } = req.body;

  // Create a new form submission document
  const newForm = new Form({
    name,
    phone,
    email
  });

  // Save the form submission to MongoDB
  newForm.save((err) => {
    if (err) {
      console.error('Error saving form data:', err);
      return res.status(500).send('Internal Server Error');
    }
    // Send a response
    res.send('Thank you for submitting your information!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

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
    // Process the form data (e.g., save to a database, etc.)
    console.log(`Name: ${name}`);
    console.log(`Phone Number: ${phone}`);
    console.log(`Gmail ID: ${email}`);
    // Send a response
    res.send('Thank you for submitting your information!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

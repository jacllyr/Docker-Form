const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Add CORS middleware

const config = {
    server: 'DESKTOP-J8MA77Q',
    database: 'master'
};

// API route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        // Connect to the database
        await sql.connect(config);
        console.log('Connected to the database successfully!'); // Log successful connection
        const { field1, field2 } = req.body;
        const query = `INSERT INTO customer (field1, field2) VALUES ('${field1}', '${field2}')`;
        await sql.query(query);
        res.status(200).send('Form submitted successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting form');
    } finally {
        // Close the database connection
        sql.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

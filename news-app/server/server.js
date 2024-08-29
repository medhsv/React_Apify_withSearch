const express = require('express'); // Import Express
const { ApifyClient } = require('apify-client'); // Import ApifyClient
const cors = require('cors'); // Import CORS

const app = express(); // Initialize Express Application
app.use(cors()); // Enable CORS Middleware
app.use(express.json()); // Enable JSON Parsing Middleware

const client = new ApifyClient({
    token: 'apify_api_YaPMcnbQB4HTnzRUpWo3PImwqX1MEh4xmQ3E', // Replace with your actual API token
});

// Define the /news route
app.get('/news', async (req, res) => {
    try {
        const query = req.query.query;
        console.log('Received query:', query);  // Log the query

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const input = {
            query: query,
            language: "US:en",
            maxItems: 100,
            extractImages: true,
            proxyConfiguration: {
                useApifyProxy: true
            }
        };

        const run = await client.actor("eWUEW5YpCaCBAa0Zs").call(input);
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        res.json(items);
    } catch (error) {
        console.error('Server error:', error);  // Log server-side errors
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

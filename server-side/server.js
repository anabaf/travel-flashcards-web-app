const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 

const apiKey = process.env.API_KEY;

app.get('/get-api-key', (req, res) => {
    if (!apiKey) {
        res.status(500).json({ error: 'API key is not available' });
    } else {
        res.json({ apiKey });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


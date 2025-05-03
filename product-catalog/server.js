const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Products API endpoint
app.get('/api/products', (req, res) => {
  fs.readFile(path.join(__dirname, 'products.json'), (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load products' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Employee API endpoint
app.get('/api/employees', (req, res) => {
  fs.readFile(path.join(__dirname, 'employees.json'), (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading employee data' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
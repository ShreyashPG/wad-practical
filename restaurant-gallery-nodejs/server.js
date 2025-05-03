// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Set view engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// // Routes
// app.get('/', (req, res) => res.render('index'));
// app.get('/menu', (req, res) => res.render('menu'));
// app.get('/gallery', (req, res) => res.render('gallery'));
// app.get('/contact', (req, res) => res.render('contact'));

// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

const express = require('express');
const path    = require('path');
const ejs     = require('ejs');
const app     = express();
const port    = 3000;

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));  // register static assets :contentReference[oaicite:8]{index=8}   

// Map .html to EJS
app.engine('html', ejs.renderFile);    // register .html engine :contentReference[oaicite:9]{index=9}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Routes
app.get('/',        (req, res) => res.render('index',   { title: 'Home'    }));
app.get('/menu',    (req, res) => res.render('menu',    { title: 'Menu'    }));
app.get('/gallery', (req, res) => res.render('gallery', { title: 'Gallery' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact' }));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));  

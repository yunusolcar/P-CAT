const express = require('express');
const path = require('path');
const port = 3000;
const app = express();

//Template
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require('express');
const path = require('path');
const port = 3000;
const app = express();

//Template
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
     res.render('index');
});
app.get('/about', (req, res) => {
     res.render('about');
});
app.get('/add', (req, res) => {
     res.render('add');
});
app.post('/photos', (req, res) => {
     console.log(req.body);
     res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

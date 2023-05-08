const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Photo = require('./models/Photo');

//Connect Db
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

const port = 3000;
//Template
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
     const photos = await Photo.find({});
     res.render('index', {
          photos,
     });
});
app.get('/about', (req, res) => {
     res.render('about');
});
app.get('/add', (req, res) => {
     res.render('add');
});
app.post('/photos', async (req, res) => {
     await Photo.create(req.body);
     res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

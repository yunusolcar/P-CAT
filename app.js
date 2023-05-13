const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const fs = require('fs');

//Connect Db
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

//Routers
app.get('/', async (req, res) => {
     const photos = await Photo.find({}).sort('-dateCreated');
     res.render('index', {
          photos,
     });
});

app.get('/photos/:id', async (req, res) => {
     const photo = await Photo.findById(req.params.id);
     res.render('photo', {
          photo,
     });
});

app.get('/photos/edit/:id', async (req, res) => {
     const photo = await Photo.findOne({ _id: req.params.id });
     res.render('edit', {
          photo,
     });
});

app.get('/about', (req, res) => {
     res.render('about');
});

app.get('/add', (req, res) => {
     res.render('add');
});

app.post('/photos', async (req, res) => {
     const uploadDir = 'public/uploads';
     if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
     }

     let uploadedImage = req.files.image;
     let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
     uploadedImage.mv(uploadPath, async () => {
          await Photo.create({
               ...req.body,
               image: '/uploads/' + uploadedImage.name,
          });
          res.redirect('/');
     });
});

app.put('/photos/:id', async (req, res) => {
     const photo = await Photo.findOne({ _id: req.params.id });
     photo.title = req.body.title;
     photo.description = req.body.description;
     photo.save();
     res.redirect(`/photos/${req.params.id}`);
});

//Port
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

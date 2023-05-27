const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

const app = express();


mongoose
     .connect(
          "mongodb+srv://Cluster0:jdkpmwQmdqgI13eh@cluster0.xerjh0h.mongodb.net/pcat-dbx?retryWrites=true&w=majority", {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          }
     )
     .then(() => {
          console.log('DB CONNECTED!');
     })
     .catch((err) => {
          console.error(err);
     });
//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({
     extended: true
}));
app.use(express.json());
app.use(fileUpload());
app.use(
     methodOverride('_method', {
          methods: ['POST', 'GET'],
     })
);

//Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
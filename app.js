const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
require('dotenv').config();
const pageRoute = require('./routes/pageRoute')

const app = express();

//DB Connection
mongoose.connect(process.env.mongokey)
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
app.use('/', pageRoute);

//Port
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
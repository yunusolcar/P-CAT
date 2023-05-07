const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Connect Db
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//Create Schema
const PhotoSchema = new Schema({
     title: String,
     description: String,
});
const Photo = mongoose.model('Photo', PhotoSchema);

//Create a Photo
Photo.create({
     title: 'Photo Title 1',
     description: 'Lorem ipsum dolor',
});


//Read Photo
Photo.find({}).then((data) => console.log(data));
 

//Update Photo
Photo.findByIdAndUpdate(
     id,
     {
          title: 'Photo Title 1 Updated',
          description: 'Photo 1 Description Updated',
     },
     { new: true }
)
     .then((updatedPhoto) => {
          console.log('Updated Photo: ', updatedPhoto);
     })
     .catch((err) => {
          console.log(err);
     });


//Delete Photos
const id = '64578d32209d29e16b4b68cf';
Photo.findByIdAndDelete(id)
     .then((removedPhoto) => {
          console.log('Photo is deleted:', removedPhoto);
     })
     .catch((err) => {
          console.log(err);
     });

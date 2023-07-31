const express = require('express');
const pageController = require('../controllers/pageControllers');
const photoController = require('../controllers/photoControllers');

const router = express.Router();

router.route('/about').get(pageController.getAboutPage);
router.route('/add').get(pageController.getAddPage);
router.route('photos/edit/:id').get(pageController.getEditPage);

router.route('/').get(photoController.getAllPhotos);
router.route('/photos/:id').get(photoController.getPhoto);
router.route('/photos').post(photoController.createPhoto);
router.route('/photos/:id').put(photoController.updatePhoto)
router.route('/photos/:id').delete(photoController.deletePhoto)

module.exports = router;
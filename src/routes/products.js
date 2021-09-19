// ************ Require's ************
const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/* configuración de multer */
const storage = multer.diskStorage({
    destination : (req,file,callaback) => {
        callaback(null,'./public/images/products')
    },
    filename : (req,file,callaback) => {
        callaback(null,'img-product-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage
});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;

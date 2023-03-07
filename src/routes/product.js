const router = require('express').Router();
const productController = require('../controllers/productController');
const middleWareController = require('../controllers/middleWareController');
router.get('/',productController.getProducts);


router.post('/create',middleWareController.verifyAdmin,productController.createProduct);

router.put('/update/:slug',middleWareController.verifyAdmin,productController.updateProduct);

router.delete('/delete/:slug',middleWareController.verifyAdmin,productController.deleteProduct);

router.get('/:slug',productController.getOne);

module.exports = router;
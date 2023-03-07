const router = require('express').Router();
const commentController = require('../controllers/commentComtroller');
const middleWareController = require('../controllers/middleWareController');


router.delete('/delete/:id',middleWareController.verify,commentController.deleteComment);

router.put('/update/:id',middleWareController.verify,commentController.updateComment);

router.get('/:slug',commentController.getComment);


module.exports = router;
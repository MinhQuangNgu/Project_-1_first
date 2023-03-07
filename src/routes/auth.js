const router = require('express').Router();
const authController = require('../controllers/authController');
const middleWareController = require('../controllers/middleWareController');
router.post("/register",authController.register);

router.post("/login",authController.login);

router.get("/me",middleWareController.verify,authController.getInfor);

router.post("/activity/:active",authController.activeAccount);

router.post("/add/:id",middleWareController.verify,authController.addCart);

router.get("/cart",middleWareController.verify,authController.getCart);

router.post("/unadd/:id",middleWareController.verify,authController.deleteCart);

router.post("/logout",middleWareController.verify,authController.logOut);

router.post("/refresh",authController.refresh);

router.post("/uploadavatar",middleWareController.verify,authController.uploadAvatar);





module.exports = router;
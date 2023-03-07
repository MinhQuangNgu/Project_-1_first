const authRouter = require('./auth');
const productRouter = require('../routes/product');
const commentRouter = require('./comment');
function router(app){
    app.use('/auth',authRouter);
    app.use('/product',productRouter);
    app.use('/comment',commentRouter);
}

module.exports = router;
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const productSchema = new schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        slug:"title"
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    categary:{
        type:String,
        required:true
    },
    sold:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

productSchema.index({title:"text",categary:"text"});
const product = mongoose.model("Product",productSchema);
product.createIndexes({title:"text",categary:"text"});
module.exports = product;
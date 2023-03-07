const Product = require('../models/productModel');

class apiFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    sorting(){
        const sort = this.queryString.sort || '-createdAt';
        this.query = this.query.sort(sort);
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 12;
        const skip = limit * (page - 1);
        this.query = this.query.limit(limit).skip(skip);
        return this;
    }

    searching(){
        const search = this.queryString.search;
        if(search){
            this.query = this.query.find({
                $text:{
                    $search:search
                }
            })
        }
        else{
            this.query = this.query.find();
        }
        return this;
    }

    filtering(){
        const obj = {...this.queryString};
        const exclueField = ['page','limit','search','sort'];
        exclueField.forEach(el => delete(obj[el]));

        let objStr =JSON.stringify(obj);

        objStr = objStr.replace(/\b(regex|lte|lt|gte|gt)\b/g,match => '$' + match);
        this.query = this.query.find(JSON.parse(objStr));
        return this;
    }
}

class productController{
    async getProducts(req,res){
        try{
            const fearture = new apiFeatures(Product.find(),req.query).sorting().paginating().filtering().searching();
            const result = await Promise.allSettled([
                fearture.query,
                Product.countDocuments()
            ]);
            const total = await Product.count(fearture.query.skip(0).limit(null))
            const products = result[0].status === "fulfilled" ? result[0].value : [];
            const count = result[1].status === "fulfilled" ? result[1].value : 0;
            res.status(200).json({products,count,total});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async createProduct(req,res){
        try{
            const {title,image,description,price,sold,categary} = req.body;
            const product =new Product({
                title,image,description,price,sold,categary
            });
            await product.save();
            res.status(200).json({msg:"Create product success."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async updateProduct(req,res){
        try{
            const {title,image,description,price,sold,categary} = req.body;
            const product = await Product.findOne({slug:req.params.slug});
            if(!product){
                return res.status(400).json({msg:"Product is not exist."});
            }
            await Product.findOneAndUpdate({slug:req.params.slug},{
                title,image,description,price,sold,categary
            });
            return res.status(200).json({msg:`Update ${title} sucessfully.`});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async deleteProduct(req,res){
        try{
            const product = await Product.findOne({slug:req.params.slug});
            if(!product){
                return req.status(400).json({msg:"Product is not exist."});
            }
            await Product.findOneAndDelete({slug:req.params.slug});
            return res.status(200).json({msg:`Delete ${product.title} sucessfully.`});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async getOne(req,res){
        try{
            const product = await Product.findOne({slug:req.params.slug});
            if(!product){
                return res.status(400).json({msg:"Product is not exist."});
            }
            res.status(200).json({product});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
}

module.exports = new productController;
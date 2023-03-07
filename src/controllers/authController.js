const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const Product = require('../models/productModel');

const url = "http://localhost:3000"
class authController{
    async register(req,res){
        try{
            const {email,name,password} = req.body;
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({msg:"User is already exist."});
            }
            if(!name || !email || !password){
                return res.status(400).json({msg:"Please fill in all fields."});
            }
            if(password.length < 6){
                return res.status(400).json({msg:"Password need more than 6 characters."});
            }
            const hashed = await bcrypt.hash(password,10);
            const activeToken = createActiveToken({email,name,password:hashed});
            const newURl = `${url}/active/${activeToken}`
            sendMail(email,newURl,"Active Email");
            return res.status(200).json({msg:"Please check your email"});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async login(req,res){
        try{
            const {email,password} = req.body;
            if(!email || !password){
                return res.status(400).json({msg:"Please fill in all fields."});
            }
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:"User is not exist."});
            }
            const validPassword = await bcrypt.compare(password,user.password);
            if(!validPassword){
                return res.status(400).json({msg:"Password is not correct."});
            }
            const accessToken = createAccessToken(user);
            const refreshToken = createRefreshToken(user);
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:true,
                path:"/",
                sameSite:"Strict"
            });
            res.status(200).json({accessToken,msg:"Login success."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async activeAccount(req,res){
        try{
            const {active} = req.params;
            jwt.verify(active,process.env.ACTIVETOKEN,async (err,user) => {
                if(err) return res.status(400).json({msg:"Token is not valid."});

                const newUser = new User({
                    name:user.name,
                    password:user.password,
                    email:user.email
                });

                await newUser.save();
                res.status(200).json({msg:"Active account success."});
            })
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async forgotPassword(req,res){
        try{
            const {email} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:"Account is not exist."});
            }
            const accessToken = createAccessToken(user);
            const refreshToken = createRefreshToken(user);
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:true,
                path:"/",
                sameSite:"Strict"
            });
            res.status(200).json({accessToken});

        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async changePassword(req,res){
        try{
            const {password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);

            User.findOneAndUpdate(req.user.id,{
                password:hashedPassword
            });
            return res.status(200).json({msg:"Change password successfully."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async logOut(req,res){
        try{
            res.clearCookie("refreshToken");
            res.status(200).json({msg:"Log Out Successfully."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
    
    async refresh(req,res){
        try{
            const refreshToken = req.cookies.refreshToken;

            jwt.verify(refreshToken,process.env.REFRESHTOKEN,async (err,user) => {
                if(err){
                    return res.status(400).json({msg:"Please login."});
                }
                const newUser = await User.findById(user.id);
                const newAccessToken = createAccessToken(newUser);
                const newRefreshToken = createRefreshToken(newUser);
                
                res.cookie("refreshToken",newRefreshToken,{
                    httpOnly:true,
                    secure:true,
                    path:"/",
                    sameSite:"Strict"
                });
                res.status(200).json({accessToken:newAccessToken});
            })

        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async uploadAvatar(req,res){
        try{
            const {avatar} = req.body;
            await User.findByIdAndUpdate(req.user.id,{avatar});
            res.status(200).json({msg:"Upload Avatar Sucessfully."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async getInfor(req,res){
        try{
            const user = await User.findById(req.user.id).select('-password');
            res.status(200).json({user});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async addCart(req,res){
        try{
            const user = await User.findById(req.user.id);
            if(!user){
                return res.status(400).json({msg:"Please login."});
            }
            const product = await Product.findById(req.params.id);
            if(!product){
                return res.status(400).json({msg:"Product is not exist, please login."});
            }
            
            const check = user.cart.filter(item => item._id.toString() === product._id.toString());
            
            if(check.length > 0){
                return res.status(400).json({msg:"This product is already in your cart."});
            }

            user.cart.push(product);
            await User.findByIdAndUpdate(user._id,{
                cart:user.cart
            })
            res.status(200).json({msg:"Add this product successfully."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async deleteCart(req,res){
        try{
            const user = await User.findById(req.user.id);
            if(!user){
                return res.status(400).json({msg:"Please login."});
            }
            user.cart = user.cart.filter(item => item._id.toString() !== req.params.id.toString());
            await User.findByIdAndUpdate(user._id,{cart:user.cart});
            return res.status(200).json({msg:"Remove success."});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async getCart(req,res){
        try{
            const user = await User.findById(req.user.id);
            if(!user){
                return res.status(400).json({msg:"User is not exist."});
            }
            res.status(200).json({cart:user.cart});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

}

function createActiveToken(user){
    return jwt.sign(user,process.env.ACTIVETOKEN,{expiresIn:"5m"});
}
function createAccessToken(user){
    return jwt.sign({id:user._id},process.env.ACCESSTOKEN,{expiresIn:"1d"});
}
function createRefreshToken(user){
    return jwt.sign({id:user._id},process.env.REFRESHTOKEN,{expiresIn:"7d"});
}
module.exports = new authController;
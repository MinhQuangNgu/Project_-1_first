const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
class middleWareController{
    verify(req,res,next){
        try{
            const token = req.headers.token;
            if(!token){
                return res.status(400).json({msg:"Please login."});
            }
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken,process.env.ACCESSTOKEN,(err,user) => {
                if(err){
                    return res.status(400).json({msg:"Please login."});
                }
                req.user = user;
                next();
            })
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
    verifyAdmin(req,res,next){
        try{
            const token = req.headers.token;
            if(!token){
                return res.status(400).json({msg:"Please login."});
            }
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken,process.env.ACCESSTOKEN,async (err,user) => {
                if(err){
                    return res.status(400).json({msg:"Please login."});
                }
                const newUser = await User.findById(user.id);
                if(newUser.rule ===1){
                    return next();
                }
                return res.status(500).json({msg:"Admin resources."});
            })
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
}

module.exports = new middleWareController;
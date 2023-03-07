const Comment = require('../models/commentModel');
const User = require('../models/userModel');
class commentController{
    async deleteComment(req,res){
        try{
            const comment = await Comment.findById(req.params.id);
            const user = await User.findById(req.user.id);
            if(comment.userid == user._id || user.rule === 1){
                await Comment.findByIdAndDelete(comment._id);
                return res.status(200).json({msg:"Delete success."});
            }
            return res.status(400).json({msg:"This comment is not yours"});
            
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
    async updateComment(req,res){
        try{
            const {content} = req.body;
            const comment = await Comment.findById(req.params.id);
            if(!comment){
                return res.status(400).json({msg:"Comment is not exist,Please reload your page."});
            }
            const user = await User.findOne(req.user.id);
            if(comment.userid === user._id){
                await Comment.findByIdAndUpdate(comment._id,{
                    content
                });
                return res.status(200).json({msg:"Update success."});
            }
            return res.status(400).json({msg:"This comment is not yours"});
            
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }

    async getComment(req,res){
        try{
            const {slug} = req.params;
            const comment = await Comment.find({slug}).sort('-createdAt');
            res.status(200).json({comment});
        }
        catch(err){
            return res.status(500).json({msg:err.message});
        }
    }
}

module.exports = new commentController;
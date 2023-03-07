const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentModel = new schema({
    username:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    reply:{
        type:Array,
        default:[]
    },
    userid:{
        type:String,
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Comments",commentModel);
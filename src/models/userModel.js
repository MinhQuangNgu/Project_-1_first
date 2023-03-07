const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6 
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dqbrxkux1/image/upload/v1647656350/Avatar/l4tfoct4j4ixe9bhn9cu.jpg"
    },
    rule:{
        type:Number,
        default:0  
    },
    cart:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
});

const user = mongoose.model("users",userSchema);

module.exports = user;
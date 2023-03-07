const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const router = require('./routes/index');

const Comment = require('./models/commentModel');
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const io = require('socket.io')(http);


let users = [];
io.on("connection",socket => {

    socket.on("joinRoom",id => {

        const user = {userid:socket.id,room:id.id};

        const check = users.every(user => user.userid !== socket.id);
        if(check){
            users.push(user);
            socket.join(user.room);
        }
        else{
            users.map(user => {
                if(user.userid === socket.id){
                    if(user.room !== id.id){
                        socket.leave(user.room);
                        socket.join(id.id);
                        user.room = id.id;
                    }
                }
            })
        }
    });


    socket.on("createComment",async data => {
        try{
            const comment = new Comment({
                userid:data.userid,
                slug:data.slug,
                username:data.username,
                avatar:data.avatar,
                content:data.content
            });
            await comment.save();
            io.to(data.product_id).emit("sendCommentToUser",{comment});
        }
        catch(err){
            console.log(err);
        }
    })


    socket.on("disconnect",() =>{
        console.log("Disconnected");
    })
})


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})   
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(`Your error:${err}`));

const PORT = process.env.PORT || 5000;
router(app);
http.listen(PORT , () =>console.log(`Your website listen in port:${PORT}`));
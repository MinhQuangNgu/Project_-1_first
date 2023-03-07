import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import UserComment from './UserComment';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'react-toastify';
const CommentOverAll = ({socket,slug,product_id}) => {
    
    const [comment,setComment] = useState();

    useEffect(() => {
        let here = true;
        axios.get(`/comment/${slug}`)
            .then(res => {
                if(!here){
                    return;
                }
                setComment(res.data.comment);
            })
            .catch(err => {
                if(!here){
                    return;
                }
                toast.error(err.response.data.msg);
            })
        return () => {
            here=false;
        }
    },[]);

    useEffect(() => {
        if(socket){
            socket.on("sendCommentToUser",data => {
                setComment([data.comment,...comment]);
            })
            return () => {
                socket.off("sendCommentToUser");
            }
        }
    },[comment,socket]);
    const auth = useSelector(state => state.auth);
    return (
    <>
        {auth.infor ? (<Comment product_id={product_id} socket={socket} slug={slug} image={auth.infor?.user.avatar} user={auth.infor?.user} />):
        <div className='login_comment'>
            <h1>Đăng Nhập để bình luận</h1>
        </div>
        }
        <UserComment  socket={socket} comments={comment} />
    </>
  )
}

export default CommentOverAll
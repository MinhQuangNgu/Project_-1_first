import React, { useState } from 'react'
import moment from 'moment';
import './Commentdot.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {createJWT} from '../utils/AxiosJWT';
import {isFail, isLoading, isLogin, isSucess} from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
const Comments = ({comment}) => {

  const [deletcomment,setDeleteComment] = useState(false);
  
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosjwt = createJWT(dispatch,auth.user?.accessToken,isLogin);
  const handleDeleteComment =async () => {
   if(auth.user){
    dispatch(isLoading());
    try{
      const res = await axiosjwt.delete(`/comment/delete/${comment._id}`,{
        headers:
          {
            token:`Bearer ${auth.user?.accessToken}`
          }
      });
      toast.success(res.data.msg);
      dispatch(isSucess());
    }
    catch(err){
      toast.error(err.response.data.msg);
      console.log(err.response.data)
      dispatch(isFail());
    }
   }
   else{
     return toast.error("Please login.");
   }
  }
  return (
    <div className='comment_form'>
        <img src={comment.avatar}/>
        <div className='content_form'>
            <h1>{comment.username}</h1>
            <h3>
              {moment(comment.createdAt).fromNow()}
            </h3>
            <span>
              {comment.content}
            </span>
        </div>
        <div onClick={() => setDeleteComment(!deletcomment)} className='dot_comment'>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
        {deletcomment && (
          <div onClick={handleDeleteComment} className='delete_form'>
          Xóa
        </div>
        )}
    </div>
  )
}

export default Comments
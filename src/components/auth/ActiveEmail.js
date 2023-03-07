import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { isFail, isLoading, isSucess } from '../redux/slices/authSlice';

let time = false;
const ActiveEmail  = () => {
    const {token} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(time === false){
            const activeemail = async () =>{
                dispatch(isLoading());
                try{
                    const res = await axios.post(`/auth/activity/${token}`,"");
                    toast.success(res.data.msg);
                    dispatch(isSucess());   
                }
                catch(err){
                    dispatch(isFail());
                    return toast.error(err.response.data.msg);
                }
            }
            activeemail();
            navigate('/login');
        }
        return () => time = true;
    },[]);
  return (
    <div></div>
  )
}

export default ActiveEmail
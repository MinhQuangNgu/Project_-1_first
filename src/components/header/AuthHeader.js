import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOtter,faHippo } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AuthHeader.css';
import {createJWT} from '../utils/AxiosJWT';
import { isFail, isLoading, islogOut } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
const AuthHeader = () => {

    const auth = useSelector(state => state.auth);
    const [user,setUser] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if(auth.infor){
            setUser(auth.infor.user);
        }
        else{
            setUser(false);
        }
    },[auth.infor]);

    const handleLogOut = async () => {
        const axiosjwt = createJWT(dispatch,auth.user.accessToken,islogOut);
        dispatch(isLoading());
        try{
            const res = await axiosjwt.post("/auth/logout","",{
                headers:{
                    token:`Bearer ${auth.user.accessToken}`
                }
            });
            toast.success(res.data.msg);
            dispatch(islogOut());
        }
        catch(err){
            toast.error(err.response?.data.msg);
            dispatch(isFail());
        }
        navigate('/login');
    }   
  return (
    <>
        {user ? (<>
            <ul className='infor_user'>
                <li style={{cursor:"default"}} className='user_avatar_img'>
                    <img className='user_avatar' src={user?.avatar}/>
                </li>
                <li className='user_avatar_name'>{user?.name}</li>
                <div className='infor_table'>
                    <ul id="infor_ul">
                        <li>Thông Tin</li>
                        <li>Đổi Mật Khẩu</li>
                        <li onClick={handleLogOut}>Đăng Xuất</li>
                    </ul>
                </div>
            </ul>
        </>):
        (
            <ul>
                <Link to="/login" className='Link'>
                    <li className='icon'>
                    <FontAwesomeIcon style={{marginRight:"0.2rem"}} icon={faOtter} /> Đăng Nhập
                    </li>
                </Link>
                <Link to="/register" className='Link'>
                    <li className='icon'>
                        <FontAwesomeIcon style={{marginRight:"0.2rem"}} icon={faHippo} />
                        Đăng Ký
                    </li>
                </Link>
            </ul>
        )}
    </>
  )
}

export default AuthHeader
import React, { useRef } from 'react'
import './login.css';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {getInfor, isFail,isLoading,isLogin} from '../redux/slices/authSlice';
import axios from 'axios';
const Login = () => {

    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let erro = false;
    let infor;

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email:email.current.value,
            password:password.current.value
        }
        if(!user.email || !user.password){
            return toast.error("Please fill in all fields.");
        }

        const loginuser = async () => {
            dispatch(isLoading());
            try{
                const res = await axios.post("/auth/login",{
                    email:user.email,
                    password:user.password
                });
                toast.success(res.data.msg);
                dispatch(isLogin(res.data));
                infor = res.data.accessToken;
            }
            catch(err){
                toast.error(err.response.data.msg);
                dispatch(isFail());
                erro = true;
            }
        }
        await loginuser();
        if(!erro){
            const getData = async () => {
                try{
                    const res = await axios.get('/auth/me',{
                        headers:{
                            token:`Bearer ${infor}`
                        }
                    });
                    dispatch(getInfor(res.data));
                }
                catch(err){
                    
                    toast.error(err.response?.data.msg);
                }
            }
            await getData();
            navigate('/');
        }
    }
    
  return (
    <div className='grid wide'>
        <div className='row'>
            <div className='col c-10 l-8 m-8 c-o-1 l-o-2 m-o-2'>
                <div className='auth_user_container'>
                    <div className='auth_head'>
                        <h1>Đăng Nhập</h1>
                        <Link to="/" className='Link'>
                            <img src='https://res.cloudinary.com/dqbrxkux1/image/upload/v1649118378/ProductImage/o0t7cufwdncgvfa9wzye.png' />
                        </Link>
                        <Link to="/register" className='Link'>
                            <h1 style={{color:"black"}}>Đăng Ký</h1>
                        </Link>
                    </div>
                    <form onSubmit={handleLogin} className='input_form'>
                        <div className='input_con'>
                            <input ref={email} type="email" placeholder='Email'/>
                        </div>
                        <div className='input_con'>
                            <input ref={password} type="password" placeholder='Mật Khẩu'/>
                        </div>
                        <div className='button_container'>
                            <button type="submit">Đăng Nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
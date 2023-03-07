import React, { useRef } from 'react'
import './Register.css';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {isSucess,isLoading,isFail} from '../redux/slices/authSlice';
import axios from 'axios';
const Register = () => {

    const email = useRef("");
    const password = useRef("");
    const name = useRef("");
    const re_password = useRef("");
    const dispatch = useDispatch();
    const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const user = {
            email:email.current.value,
            password:password.current.value,
            name:name.current.value,
        }
        if(!user.email || !user.password || !user.name){
            return toast.error("Please fill in all fields.");
        }
        if(!validateEmail(user.email)){
            return toast.error("Email is not valid.");
        }
        if(user.password.length < 6){
            return toast.error("Password need more than 6 characters.");
        }
        if(user.password !== re_password.current.value){
            return toast.error("Password is not the same.");
        }

        const registerUser = async () => {
            dispatch(isLoading());
            try{
                const res = await axios.post('/auth/register',{
                    email:user.email,
                    password:user.password,
                    name:user.name
                })
                toast.success(res.data.msg);
                dispatch(isSucess());
            }
            catch(err){
                dispatch(isFail());
                return toast.error(err.response.data.msg);
            }
        }

        registerUser();

        email.current.value = "";
        password.current.value = "";
        name.current.value = "";
        re_password.current.value = "";

    }
    return (
    <div className='grid wide'>
        <div className='row'>
            <div className='col c-10 l-8 m-8 c-o-1 l-o-2 m-o-2'>
                <div className='auth_user_container'>
                    <div className='auth_head'>
                        <h1>Đăng Ký</h1>
                        <Link to="/" className='Link'>
                            <img src='https://res.cloudinary.com/dqbrxkux1/image/upload/v1649118378/ProductImage/o0t7cufwdncgvfa9wzye.png' />
                        </Link>
                        <Link to="/login" className='Link'>
                            <h1 style={{color:"black"}}>Đăng Nhập</h1>
                        </Link>
                    </div>
                    <form onSubmit={handleRegister} className='input_form'>
                        <div className='input_con'>
                            <input defaultValue={email.current.value} ref={email} type="email" placeholder='Email'/>
                        </div>
                        <div className='input_con'>
                            <input defaultValue={name.current.value} ref={name} type="text" placeholder='Name'/>
                        </div>
                        <div className='input_con'>
                            <input defaultValue={password.current.value} ref={password} type="password" placeholder='Mật Khẩu'/>
                        </div>
                        <div className='input_con'>
                            <input defaultValue={re_password.current.value} ref={re_password} type="password" placeholder='Nhập Lại Mật Khẩu'/>
                        </div>
                        <div className='button_container'>
                            <button type="submit">Đăng Ký</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
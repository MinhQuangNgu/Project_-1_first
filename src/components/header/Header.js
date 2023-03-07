import React, { useState } from 'react'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthHeader from './AuthHeader';
import SeachingInput from './SeachingInput';
const Header = () => {
    const [navbar,setNavBar] = useState(false);

    const handleHiddlen =() =>{
        setNavBar(false);
    }

    const handleNavabar = () =>{
        setNavBar(true);
    }


     return (
    <header>
        <div className='grid wide h_100'>
            <div className='row h_100'>
                <div className='col h_100 l-2 m-2 c-2'>
                    <div className='brand_container'>
                        <Link to="/" className='Link'>
                            <img src='https://res.cloudinary.com/dqbrxkux1/image/upload/v1649118378/ProductImage/o0t7cufwdncgvfa9wzye.png' />
                        </Link>
                    </div>
                </div>
                <div className='col c-7 m-7 l-7 h_100'>
                    <SeachingInput />
                </div>
                <div className='col l-3 m-3 c-0 h_100'>
                    <div className='auth_container w_100'>
                        <AuthHeader />
                    </div>
                    <div className='cart_container w_100'>
                    <Link to='/cart' className='Link Link_cart'>
                        <FontAwesomeIcon style={{color:"white"}} className='cart' icon={faCartShopping} />
                    </Link>
                    </div>
                </div>
                <div className='col l-0 m-0 c-3 h_100'>
                    <div className='mobile_container'>
                        <i onClick={handleNavabar} class="fa-solid fa-bars"></i>
                        {navbar && 
                        (<div className='navbar_mobile'>
                            <div className='infor'>
                                <div className='avatar_user'>
                                    <img src="https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-anh-girl-xinh-toc-ngan-de-thuong.jpg" />
                                </div>
                                <div className='cancel'>
                                    <i onClick={handleHiddlen} class="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                            <div className='navbar_m'>
                                <ul>
                                    <li>Giỏ Hàng</li>
                                    <li>Thông Tin</li>
                                    <li>Đổi Mật Khẩu</li>
                                    <li>Đăng Xuất</li>
                                </ul>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
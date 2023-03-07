import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import './ButtonAdd.css';
import {isFail, isLoading, isLogin, isSucess} from '../redux/slices/authSlice';
import {toast} from 'react-toastify';
import {createJWT} from '../utils/AxiosJWT';
const ButtonAdd = ({slug,product_id}) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [del,setDel] = useState(false);
  const axiosjwt = createJWT(dispatch,auth.user?.accessToken,isLogin);

  const handleDelete = async () => {
    dispatch(isLoading());
    try{
      const res = await axiosjwt.delete(`/product/delete/${slug}`,{
        headers:{
          token:`Bearer ${auth.user.accessToken}`
        }
      })
      toast.success(res.data.msg);
      dispatch(isSucess());
    }
    catch(err){
      toast.error(err.response.data.msg);
      dispatch(isFail());
    }
  }

  const handleAddToCart = async () => {
    if(!auth.user){
      toast.error("Please login.");
      return;
    }
    dispatch(isLoading());
    try{
      const res = await axiosjwt.post(`/auth/add/${product_id}`,"",{
        headers:{
          token:`Bearer ${auth.user.accessToken}`
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
  return (
    <div className='button_card'>
        {auth.infor?.user.rule === 1 ? (
        <>
          <Link to={`/edit/${slug}`} className='Link'>
          <button>Sửa</button>
          </Link>
          <button onClick={() => setDel(true)} style={{backgroundColor:"red"}}>Xóa</button>
        </>
        ):
        (<button onClick={handleAddToCart}>Thêm Vào Giỏ Hàng</button>)}
        {auth.infor?.user.rule === 1 && del && (
          <div className='delete_button'> 
            <div className='button_config'>
              <button onClick={() => setDel(false)}>Hủy</button>
              <button onClick={handleDelete} style={{backgroundColor:"red"}}>Xóa</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default ButtonAdd
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './EditProduct.css';
import { createJWT } from '../utils/AxiosJWT';
import { isFail, isLoading, isLogin, isSucess } from '../redux/slices/authSlice';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
const EditProduct = ({cache}) => {

    const {slug} = useParams();
    const [product,setProduct] = useState();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const axiosjwt = createJWT(dispatch,auth.user?.accessToken,isLogin);
    let ref = useRef(0);
    useEffect(()=>{
        let here = true;
        const url = `/product/${slug}`;
        if(cache.current[url]){
            if(!here){
                return;
            }
            return setProduct(cache.current[url]);
        }
        axios.get(url)
            .then(res => {
                if(!here){
                    return;
                }
                cache.current[url] = res.data.product;
                setProduct(res.data.product);
            })
            .catch(err => {
                if(!here){
                    return;
                }
                toast.error(err.response.data.msg);
            })

        return () => {
            here = false;
        }
    },[]);
    const title = useRef("");
    const description = useRef("");
    const categary = useRef("");
    const price = useRef(0);
    const sold = useRef(0);
    const image = useRef("");
    const [avatar,setAvatar] = useState();
    var Image;
    const handleChangeAvatar = (e) => {
    const url = URL.createObjectURL(e[0]);
    setAvatar(url);
  }

    const updateAvatar = async () => {
    const formdata = new FormData();
        formdata.append("file",image.current.files[0]);
        formdata.append("upload_preset","jsczui0i");
        dispatch(isLoading());
        try{
            const res = await axios.post("https://api.cloudinary.com/v1_1/dqbrxkux1/image/upload",formdata);
            dispatch(isSucess());
            Image = res.data.url;
        }
        catch(err){
            dispatch(isFail());
        }
    }

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateAvatar();
    const updateProduct = async () => {
        dispatch(isLoading());
        try{
            const res = await axiosjwt.put(`/product/update/${slug}`,{
                title:title.current.value,
                image:Image,
                description:description.current.value,
                price:price.current.value,
                sold:sold.current.value,
                categary:categary.current.value
            },{
                headers:{
                    token:`bearer ${auth.user.accessToken}`
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
    await updateProduct();
  }

  return (
    <div className='grid wide'>
      <div className='create'>
        <div className='row'>
          <div className='col c-3 m-3 l-3'>
            <div className='image_create'>
              <div className='create_images'>
                  <img src={avatar ? avatar : product?.image} />
                  <div className='button_create'>
                    <div className='button_create-input'>
                      <input onChange={(e) => handleChangeAvatar(e.target.files)} ref={image} type="file" />
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className='col c-8 m-8 l-8'>
            <div className='create_form'>
                <div className='create_head'>
                  <h1>TẠO MỚI</h1>
                </div>
                <form onSubmit={handleEdit} className='create_body'>
                    <div className='create_input_form'>
                      <input defaultValue={product?.title} ref={title} type="text" placeholder='Title'/>
                    </div>
                    <div className='create_input_form'>
                      <textarea defaultValue={product?.description} ref={description} type="text" placeholder='Description'/>
                    </div>
                    <div className='create_input_form'>
                      <input ref={price} defaultValue={product?.price} type="number" placeholder='price'/>
                    </div>
                    <div className='create_input_form'>
                      <input ref={sold} defaultValue={product?.sold} type="number" placeholder='Sold'/>
                    </div>
                    <div className='select_form'>
                      <select ref={categary} className='select_form_option'>
                        <option selected={product?.categary === 'man' ? "selected":''} value="man">Nam</option>
                        <option selected={product?.categary === 'woman' ? "selected":''} value="woman">Nữ</option>
                        <option selected={product?.categary === 'animal' ? "selected":''} value="animal">Động Vật</option>
                      </select>
                    </div>
                    <div className='create_button'>
                      <button type="submit">Tạo</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
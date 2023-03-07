import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { isFail, isLoading, isLogin, isSucess } from '../redux/slices/authSlice';
import './Createproduct.css';
import {createJWT} from '../utils/AxiosJWT';
const Createproduct = () => {

  const title = useRef("");
  const description = useRef("");
  const categary = useRef("");
  const price = useRef(0);
  const sold = useRef(0);
  const image = useRef("");
  const [avatar,setAvatar] = useState();
  const auth = useSelector(state => state.auth);
  var Image;
  const dispatch = useDispatch();
  const axiosjwt = createJWT(dispatch,auth.user.accessToken,isLogin);
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


  const handleCreate = async (e) => {
    e.preventDefault();
    const product = {
      title:title.current.value,
      description:description.current.value,
      price:price.current.value,
      sold:sold.current.value,
      image:image.current.files[0],
      categary:categary.current.value
    }
    if(!product.title || !product.description || ! product.price || !product.sold || !product.image){
      return toast.error("PLease fill in all fields.");
    }
    await updateAvatar();
    const uploadProduct = async () => {
      dispatch(isLoading());
      try{
        const res = await axiosjwt.post("/product/create",{
          title:product.title,
          description:product.description,
          price:product.price,
          sold:product.sold,
          image:Image,
          categary:product.categary
        },{
          headers:{
            token:`Bearer ${auth.user.accessToken}`
          }
        });
        toast.success(res.data.msg);
        dispatch(isSucess());
      }
      catch(err){
        toast.error(err.response.data.msg);
        dispatch(isFail);
      }
    }
    await uploadProduct();

    title.current.value = "";
    description.current.value ="";
    price.current.value = 0;
    sold.current.value = 0;
  }


  return (
    <div className='grid wide'>
      <div className='create'>
        <div className='row'>
          <div className='col c-3 m-3 l-3'>
            <div className='image_create'>
              <div className='create_images'>
                  <img src={avatar} />
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
                <form onSubmit={handleCreate} className='create_body'>
                    <div className='create_input_form'>
                      <input defaultValue={title.current.value} ref={title} type="text" placeholder='Title'/>
                    </div>
                    <div className='create_input_form'>
                      <textarea defaultValue={description.current.value} ref={description} type="text" placeholder='Description'/>
                    </div>
                    <div className='create_input_form'>
                      <input ref={price} defaultValue={0} type="number" placeholder='price'/>
                    </div>
                    <div className='create_input_form'>
                      <input ref={sold} defaultValue={0} type="number" placeholder='Sold'/>
                    </div>
                    <div className='select_form'>
                      <select ref={categary} className='select_form_option'>
                        <option defaultChecked value="man">Nam</option>
                        <option value="woman">Nữ</option>
                        <option value="animal">Động Vật</option>
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

export default Createproduct
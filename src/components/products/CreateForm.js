import React, { useEffect } from 'react'
import './Createproduct.css';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
const CreateForm = () => {

  const auth = useSelector(state => state.auth);
  return (
    <div className='col c-10 c-o-1 m-4 l-3'>
        {auth.infor?.user.rule === 1 && (
          <div className='card'>
            <Link to='/product/create' className='Link'>
                <div style={{color:"black"}} className='create_card'>
                  TẠO PRODUCT
                </div>
            </Link>
          </div>
        )}
    </div>
  )
}

export default CreateForm
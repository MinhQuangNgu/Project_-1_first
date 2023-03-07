import React from 'react'
import './Page.css';
import Paginating from './Paginating';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAnglesLeft,faAnglesRight} from '@fortawesome/free-solid-svg-icons';
const Page = ({total}) => {

    
    const {page,prev,next,jump,pageTotal,active} = Paginating({total});
    const newArray = [...Array(pageTotal ? pageTotal : 1)].map((i,_i) => _i+1);

  return (
    <div className='page_container'>
        <div onClick={() => prev()} className='page_detail'>
            <FontAwesomeIcon icon={faAnglesLeft}/>
        </div>
        {newArray?.map(item => (
            <div onClick={() => jump(item)} key={item} className={`page_detail ${active(item)}`}>
                {item}
            </div>
        ))}
        <div onClick={() => next()} className='page_detail'>
            <FontAwesomeIcon icon={faAnglesRight}/>
        </div>
    </div>
  )
}

export default Page
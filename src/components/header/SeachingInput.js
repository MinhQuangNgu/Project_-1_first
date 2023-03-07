import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SeachingInput.css';
import { useNavigate } from 'react-router-dom';
const SeachingInput = () => {

    const navigate = useNavigate();
    const handleInput =(e) => {
        if(!e){
            return navigate('/');
        }
        navigate(`?search=${e}`);
    }
  return (
    <div className='input_container'>
        <div className='input_container_form'>
            <input onChange={(e) => handleInput(e.target.value)} type="text" />
            <div className='search_container'>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    </div>
  )
}

export default SeachingInput
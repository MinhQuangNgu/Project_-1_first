import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Searching = () => {
    const {search} = useLocation();

    const navigate = useNavigate();
    let page = new URLSearchParams(search).get("page");
    let count = useRef(0);
    const sort = new URLSearchParams(search).get("sort");

    const [searching,setSearching] = useState("");
    useEffect(() => {
        if(count.current === 1){
            page = null;
            count.current = 0;
        }
        if(searching && searching !== 'all'){
            navigate(`${page ? (sort ? `?page=${page}&sort=${sort}&search=${searching}`:`?page=${page}&search=${searching}`):(sort ? `?sort=${sort}&search=${searching}`:`?search=${searching}`)}`)
        }
        if(searching === 'all'){
            navigate(`${page ? (sort ? `?page=${page}&sort=${sort}`:`?page=${page}`):(sort ? `?sort=${sort}`:`/`)}`)
        }
        return () => {
            count.current++;
        }
    },[searching]);

  return (
    <select onChange={e => setSearching(e.target.value)}>
        <option value="all">Categary</option>
        <option value="man">Nam</option>
        <option value="woman">Nữ</option>
        <option value="animal">Động Vật</option>
    </select>
  )
}

export default Searching
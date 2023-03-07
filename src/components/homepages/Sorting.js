import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Sorting = () => {

    const {search} = useLocation();

    const [sort,setSort] = useState();
    const navigate = useNavigate();

    const page = new URLSearchParams(search).get('page');
    const searching = new URLSearchParams(search).get(`search`);

    useEffect(() => {
        if(sort){
            navigate(`${page ? (searching ? `?page=${page}&sort=${sort}&search=${searching}`: `?page=${page}$sort=${sort}`):(searching ? `?sort=${sort}&search=${searching}` : `?sort=${sort}`)}`)
        }
    },[sort]);

  return (
    <select onChange={e => setSort(e.target.value)}>
        <option value="-createdAt">Mới Nhất</option>
        <option value="createdAt">Cũ Nhất</option>
        <option value="price">Giá Thấp</option>
        <option value="-price">Giá Cao</option>
    </select>
  )
}

export default Sorting
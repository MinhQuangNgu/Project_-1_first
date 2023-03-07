import { useEffect, useRef, useState } from 'react';
import './Paginating.css';
import {useLocation, useNavigate} from 'react-router-dom';
const Paginating = ({total}) => {

    const {search} = useLocation();

    const sort = new URLSearchParams(search).get("sort");
    const searching = new URLSearchParams(search).get('search');
    const navigate = useNavigate();
    const pageTotal = Math.ceil(total / 12);
    const [page,setPage] = useState(1);

    const prev = () => {
        const newPage = Math.max(1,page - 1);
        return setPage(newPage);
    }

    const next =  () => {
        const newPage = Math.min(page + 1,pageTotal);
        return setPage(newPage);
    }

    const active = (pa) => {
        if(pa === page){
            return "activepage";
        }
    }

    const jump = (pa) => {
        if(pa === page){
            return;
        }
        setPage(pa);
    }
    let count = useRef(0);
    useEffect(() => {
        if(count.current === 0 || count.current === 1){
            count.current++;
            return;
        }
        if(page === 1){
            return navigate(`/${searching ? `?search=${searching}`:``}${sort ? `${searching ? `&sort=${sort}`:`?sort=${sort}`}`:``}`);
        }
        navigate(`?page=${page}${searching ? `&search=${searching}`:``}${sort ? `&sort=${sort}`:``}`);
    },[page]);

  return {page,prev,next,jump,pageTotal,active}
}

export default Paginating
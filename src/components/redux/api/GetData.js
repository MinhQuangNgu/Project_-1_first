import { toast } from "react-toastify";
import { isFail, isLoading, isSucess } from "../slices/authSlice"
import axios from 'axios';

export const GetData = async (url,dispatch) =>{
    dispatch(isLoading());
    try{    
        const res = await axios.get(url);
        dispatch(isSucess());
        return res.data;
    }
    catch(err){
        toast.error(err.response.data.msg);
        dispatch(isFail());
    }
}
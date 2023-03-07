import decode_jwt from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
const refresh = async () => {
    try{
        const res = await axios.post("/auth/refresh","",{
            withCredentials:true
        });
        return res.data;
    }
    catch(err){
        toast.error(err.response?.data.msg);
    }
}

export const createJWT = (dispatch,token,stateSuccess) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decoded = decode_jwt(token);
            if(decoded.exp < date.getTime() / 1000){
                const data = await refresh();
                dispatch(stateSuccess({accessToken:data.accessToken}));
                config.headers['token'] = `Bearer ${data.accessToken}`;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    )
    return axiosInstance;
    
}
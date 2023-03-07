import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        fail:false,
        user:null,
        infor:null,
        product:null
    },
    reducers:{
        isLoading:(state) => {
            state.loading = true;
            state.fail = false;
        },
        isSucess:(state) => {
            state.fail = false;
            state.loading = false;
        },
        isFail:(state) => {
            state.fail = true;
            state.loading = false;
        },
        isLogin:(state,action) => {
            state.user = action.payload;
            state.fail = false;
            state.loading = false;
        },
        islogOut:(state) => {
            state.fail = false;
            state.loading = false;
            state.user = null;
            state.infor = null;
        },
        getInfor:(state,action) => {
            state.fail = false;
            state.loading = false;
            state.infor = action.payload;
        },
        getProduct:(state,action) => {
            state.fail = false;
            state.loading = false;
            state.product = action.payload;
        }
    }
})

export const {isFail,isLoading,isSucess,isLogin,islogOut,getInfor,getProduct} = authSlice.actions;
export default authSlice.reducer;
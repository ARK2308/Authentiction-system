import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginApi, registerApi } from "../../../Api/UserApis/userApi";

// user registerSlice
export const UserRegister = createAsyncThunk("UserRegister",async(data)=>{
    try {
        const response = await registerApi(data.data, data.config);

        if(response.status == 200){
            toast.success("User Succesfully Registerd!")
            
            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// userlogin  Slice
export const userlogin = createAsyncThunk("userlogin",async(data)=>{
    try {
        const response = await loginApi(data);
        

        if(response.status == 200){
            localStorage.setItem("usertoken",response.data.token);
            toast.success("User Succesfully Login!")
            
            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// uselogoutfun  Slice
export const uselogoutfun = createAsyncThunk("uselogoutfun",async(thunkApi)=>{
    try {
        const response = await userLogoutApi();
        

        if(response.status == 200){
            toast.success("User Logout Done")
            localStorage.removeItem("usertoken")
            return response.data
        }else{
            toast.success("User Logout Done")
            localStorage.removeItem("usertoken")
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});








export const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        registeruser:[],
        loginuser:[],
        UserLogout:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        // user register
        builder.addCase(UserRegister.pending,(state)=>{
            state.loading = true;
        })
        .addCase(UserRegister.fulfilled,(state,action)=>{
            state.loading = false;
            state.registeruser = action.payload;
        })
        .addCase(UserRegister.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
           // user login
           .addCase(userlogin.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userlogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.loginuser = action.payload;
        })
        .addCase(userlogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
            
        // uselogoutfun Api
        .addCase(uselogoutfun.pending,(state)=>{
            state.loading = true;
        })
        .addCase(uselogoutfun.fulfilled,(state,action)=>{
            state.loading = false;
            state.UserLogout = [action.payload];
            state.UserLoggedIn = [];
            state.userCartData = [];
        })
        .addCase(uselogoutfun.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})




export default UserSlice.reducer
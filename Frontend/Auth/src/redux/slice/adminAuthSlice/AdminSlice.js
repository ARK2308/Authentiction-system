import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminLoginApi, AdminLogoutApi } from "../../../Api/AdminApis/adminapi";
import { toast } from "react-toastify";

// Admin Login 
export const AdminAuthLogin = createAsyncThunk("AdminLogin", async (data) => {
    try {
        const response = await AdminLoginApi(data);

        if (response.status == 200) {
            toast.success("Admin Logged In")
            localStorage.setItem("admintoken", response.data.token);
            return response.data;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Admin Logout Slice
export const AdminLogout = createAsyncThunk("AdminLogout", async (thunkApi) => {
    try {
        const response = await AdminLogoutApi();

        if (response.status == 200) {
            toast.success("Admin Logout Done");
            localStorage.removeItem("admintoken");
            return response.data;
        } else {
            toast.success("Admin Logout Done");
            localStorage.removeItem("admintoken");
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});







export const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState: {
        adminlogin: [],
        adminLogoutData: [],
        loading: false,
        error: null,

    },
    extraReducers: (builder) => {
        // Admin Login
        builder
            .addCase(AdminAuthLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminAuthLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.adminlogin = action.payload;
            })
            .addCase(AdminAuthLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Admin Logout
            .addCase(AdminLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(AdminLogout.fulfilled, (state, action) => {
                state.loading = false;
                state.adminLogoutData = [action.payload];
            })
            .addCase(AdminLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }

})


export default AdminSlice.reducer

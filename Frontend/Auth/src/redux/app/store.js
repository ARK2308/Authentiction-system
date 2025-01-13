import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "../slice/adminAuthSlice/AdminSlice";
import UserSlice from "../slice/userAuthSlice/userAuthSlice";

export const store = configureStore({
    reducer: {
        Admin: AdminSlice, // Access the `reducer` property
        User: UserSlice,
    },
});

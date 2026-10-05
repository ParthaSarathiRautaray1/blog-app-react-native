import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
    
    [api.reducerPath]: api.reducer,
    // registering the authReducer
    auth: authReducer,
});

export default rootReducer;

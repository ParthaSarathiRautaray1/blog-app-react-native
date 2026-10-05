// authSlice = logged-in user and its authentication state

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";
import * as SecureStore from "expo-secure-store";


interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: User;
                token: string;
            }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            // securely store like tokens
            SecureStore.setItemAsync(
                "auth_token",
                action.payload.token
            );

            SecureStore.setItemAsync(
                "auth_user",
                JSON.stringify(action.payload.user)
            );
            
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // while logout delete those token 
            SecureStore.deleteItemAsync("auth_token");
            SecureStore.deleteItemAsync("auth_user");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
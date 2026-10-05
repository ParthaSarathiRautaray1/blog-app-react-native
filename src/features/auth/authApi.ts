// authApi = laravel login / register api
import { api } from "../../services/api";
import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from "./types";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),

        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi;
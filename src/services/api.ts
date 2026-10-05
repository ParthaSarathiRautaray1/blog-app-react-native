import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL,
        
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string | null } }).auth.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                
            }
            headers.set("Accept", "application/json");

            return headers;
        },
    }),

    tagTypes: [
        "Posts",
        "Categories",
        "Comments",
        "Likes",
        "Bookmarks",
        "Follows",
        "Tags",
    ],

    endpoints: () => ({}),
});

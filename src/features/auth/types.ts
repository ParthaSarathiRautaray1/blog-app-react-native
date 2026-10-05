export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthResponse {
    status: boolean;
    message: string;
    user: User;
    token: string;
    
}



// authApi.ts
//     ↓
// Laravel login/register API

// authSlice.ts
//     ↓
// Logged-in user + authentication state

// types.ts
//     ↓
// TypeScript types
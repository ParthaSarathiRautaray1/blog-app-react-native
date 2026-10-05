import StoreProvider from "@/store/StoreProvider";
import { Stack } from "expo-router";


export default function RootLayout() {
    return (
        <StoreProvider>
            <Stack />
        </StoreProvider>
    );
}


// Expo Router
//     ↓
// app/_layout.tsx
//     ↓
// StoreProvider
//     ↓
// Redux Store
//     ↓
// All screens
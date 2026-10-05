// app/(tabs)/profile.tsx

import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { authStorage } from "@/features/auth/authStorage";
import { logout } from "@/features/auth/authSlice";



export default function Profile() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = async () => {
        await authStorage.clear();

        dispatch(logout());

        router.replace("/login");
    };

    return (
        <View>
            <Text>Profile Screen</Text>

            <Text>{user?.name}</Text>
            <Text>{user?.email}</Text>

            <Button
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
}


// The complete authentication lifecycle is now:

// LOGIN
//  ↓
// Laravel
//   ↓
// token + user
//   ↓
// SecureStore
//   ↓
// Redux
//   ↓
// Protected Tabs



//  On app restart:
// SecureStore
//   ↓
// Auth Initialization
//   ↓
// Redux
//   ↓
// Protected Tabs


// Logout:


// Logout button
//   ↓
// SecureStore.clear()
//   ↓
// Redux logout()
//   ↓
// isAuthenticated = false
//   ↓
// Tabs blocked
//   ↓
// Login
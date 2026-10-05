import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/hooks/redux";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";


export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await login({
                email,
                password,
            }).unwrap();

            dispatch(
                setCredentials({
                    user: response.user,
                    token: response.token,
                })
            );

            router.replace("/(tabs)");
        } catch (error) {
            console.log("Login failed:", error);
        }
    };

    return (
        <View>
            <Text>Login Screen</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                title={isLoading ? "Logging in..." : "Login"}
                onPress={handleLogin}
                disabled={isLoading}
            />
        </View>
    );
}



// Login Screen
//      ↓
// useLoginMutation()
//      ↓
// POST /api/login
//      ↓
// Laravel
//      ↓
// { user, token }
//      ↓
// dispatch(setCredentials())
//      ↓
// Redux
//      ↓
// auth.user
// auth.token
// isAuthenticated
//      ↓
// router.replace("/(tabs)")
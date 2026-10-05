import { useAuthInitialization } from "@/features/auth/useAuthInitialization";
import { useAppSelector } from "@/hooks/redux";
import StoreProvider from "@/store/StoreProvider";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

function RootNavigation() {
  const { isInitializing } = useAuthInitialization();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isInitializing) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <StoreProvider>
      <RootNavigation />
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

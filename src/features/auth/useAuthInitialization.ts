import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setCredentials } from "./authSlice";
import { authStorage } from "./authStorage";
import type { User } from "./types";

export function useAuthInitialization() {
    const dispatch = useAppDispatch();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = await authStorage.getToken();
                const user = (await authStorage.getUser()) as User | null;

                if (token && user) {
                    dispatch(
                        setCredentials({
                            token,
                            user,
                        })
                    );
                }
            } catch (error) {
                console.log("Auth initialization failed:", error);
            } finally {
                setIsInitializing(false);
            }
        };

        initializeAuth();
    }, [dispatch]);

    return { isInitializing };
}
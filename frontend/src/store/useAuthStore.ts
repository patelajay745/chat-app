import { create } from "zustand";
import { api } from "../lib/api";
import { AxiosError } from "axios";

interface AuthStore {
    user: User | null
    isCheckingAuth: boolean
    checkAuth: () => Promise<void>
}

interface User {
    id: string,
    email: string,
    fullName: string
    profilePic?: string
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isCheckingAuth: true,
    checkAuth: async () => {

        try {
            set({ isCheckingAuth: true })
            const res = await api.get("/auth/check")
            console.log(res.data.user)
            set({ user: res.data.user })
        } catch (error) {

            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    set({ user: null })
                }
            }
        } finally {
            set({ isCheckingAuth: false })
        }
    }
}));

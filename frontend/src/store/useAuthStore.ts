
import { create } from "zustand";
import { api } from "../lib/api";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface User {
    id: string,
    email: string,
    fullName: string
    profilePic?: string
    createdAt?: string
}

export type SignUpFormData = {
    fullName: string, email: string, password: string
}

export type SignInFormData = {
    email: string, password: string
}

export type updateProfileType = {
    profilePic?: File | null
}

interface AuthStore {
    user: User | null
    isLoading: boolean
    checkAuth: () => Promise<void>
    logout: () => Promise<void>
    onlineUsers: User[]
    signUp: (data: SignUpFormData) => Promise<void>
    signIn: (data: SignInFormData) => Promise<void>
    updateProfile: (data: updateProfileType) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    onlineUsers: [],
    checkAuth: async () => {

        try {
            set({ isLoading: true })
            const res = await api.get("/auth/check")
            set({ user: res.data.data.user })
        } catch (error) {

            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    set({ user: null })
                }
            }
        } finally {
            set({ isLoading: false })
        }
    },
    signUp: async (data) => {

        try {
            const res = await api.post("/auth/signup", data)
            toast.success("SignUp Successfully")
            set({ user: res.data.data.user })
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Something went wrong"
                : error instanceof Error
                    ? error.message
                    : "Something went wrong";

            toast.error(message);
        }

    },
    signIn: async (data) => {
        try {
            const res = await api.post("/auth/signIn", data)
            toast.success("Login Successfully")

            set({ user: res.data.data.user })
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Something went wrong"
                : error instanceof Error
                    ? error.message
                    : "Something went wrong";

            toast.error(message);
        }
    },
    logout: async () => {
        try {
            set({ isLoading: true })
            await api.post("/auth/logout")
            set({ user: null })
            toast.success("Logout Successfully")
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    set({ user: null })
                }
            }
        } finally {
            set({ isLoading: false })
        }
    },

    updateProfile: async (data) => {
        set({ isLoading: true })
        try {
            const res = await api.patch("/auth/update-profile/", data)
            set({ user: res.data.data.user })
            toast.success("Profile pic updated")
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Something went wrong"
                : error instanceof Error
                    ? error.message
                    : "Something went wrong";

            toast.error(message);
        } finally {
            set({ isLoading: false })
        }
    }
}));

import { create } from "zustand";
import { api } from "../lib/api";
import axios from "axios";
import { toast } from "sonner";

type Message = {
    id: string;
    text: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
};

type User = {
    id: string;
    fullName: string;
    email: string;
    profilePic?: string;
};

export const useChatStore = create<{
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean
    isMessagesLoading: boolean

    setSelectedUser: (user: User | null) => void;
    fetchUsers: () => Promise<void>;
    fetchMessages: (userId: string) => Promise<void>;
}>((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (user) => set({ selectedUser: user }),

    fetchUsers: async () => {
        try {
            set({ isUsersLoading: true });
            const res = await api.get("/message/users");
            set({ users: res.data.data.users, isUsersLoading: false });
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Failed to fetch users"
                : "Something went wrong";
            toast.error(message);
            set({ isUsersLoading: false });
        }
    },

    fetchMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true });
            const res = await api.get(`/message/messages/${userId}`);
            console.log("messages:", res.data.data)
            set({ messages: res.data.data.messages, isMessagesLoading: false });
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || "Failed to fetch messages"
                : "Something went wrong";
            // toast.error(message);
            set({ isMessagesLoading: false });
        }
    },
}))


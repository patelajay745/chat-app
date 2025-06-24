import { create } from "zustand";

export const useThemeStore = create<{
    theme: string;
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
}>((set) => ({
    theme: localStorage.getItem("theme") || "dark",
    setTheme: (theme: string) => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
        set({ theme });
    },
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            document.documentElement.setAttribute("data-theme", newTheme);
            return { theme: newTheme };
        }),
}))
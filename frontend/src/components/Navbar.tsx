import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircle, Moon, Sun, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

export const Navbar = () => {
  const { logout, user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="navbar  border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Let's Chat</h1>
          </Link>
          <div className="flex items-center gap-2 ">
            {user ? (
              <>
                <Link to="/profile">
                  <div className="ml-4 flex gap-2 items-center hover:opacity-80">
                    <User className="size-4" />
                    <span className="sm:inline hidden">Profile</span>
                  </div>
                </Link>

                <button onClick={logout} className="hover:cursor-pointer">
                  <div className=" ml-4 flex gap-2 items-center hover:opacity-80">
                    <LogOut className="size-4" />
                    <span className="sm:inline hidden">Logout</span>
                  </div>
                </button>
              </>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="hover:opacity-80 transition"
            >
              {theme === "dark" ? (
                <Sun className="size-5 text-yellow-400" />
              ) : (
                <Moon className="size-5 text-blue-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

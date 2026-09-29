import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("movieUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to load saved user:", error);
        localStorage.removeItem("movieUser");
      }
    }
  }, []);

  const login = (username, password) => {
    if (!username.trim() || !password.trim()) {
      return {
        success: false,
        message: "Username and password are required.",
      };
    }

    const loggedInUser = {
      username: username.trim(),
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "movieUser",
      JSON.stringify(loggedInUser)
    );

    return {
      success: true,
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("movieUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
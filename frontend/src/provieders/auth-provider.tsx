"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { authService } from "@/services/auth.service";
import { User, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        const storedToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async ({
    userName,
    password,
    rememberMe = false,
  }: {
    userName: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    setIsLoading(true);
    try {
      const res = await authService.login({ userName, password });

      if (res.success) {
        const { accessToken, user } = res.data;
        const userString = JSON.stringify(user);

        setUser(user);

        if (rememberMe) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("user", userString);
        } else {
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("user", userString);
        }

        router.push("/");
      } else {
        throw new Error(typeof res.message === "string" ? res.message : "Đăng nhập thất bại");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    deleteCookie("accessToken");
    deleteCookie("userRole");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

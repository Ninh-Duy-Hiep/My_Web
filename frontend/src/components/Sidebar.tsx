"use client";

import Link from "next/link";
import { Home, Users, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700 font-bold text-xl">My App</div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link href="/" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <Home className="mr-3 h-5 w-5" /> Trang chủ
        </Link>
        <Link href="/users" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <Users className="mr-3 h-5 w-5" /> Quản lý User
        </Link>
        <Link href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <Settings className="mr-3 h-5 w-5" /> Cài đặt
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button onClick={logout} className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-700 rounded">
          <LogOut className="mr-3 h-5 w-5" /> Đăng xuất
        </button>
      </div>
    </div>
  );
}

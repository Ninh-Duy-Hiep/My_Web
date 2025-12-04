"use client";

import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2 } from "lucide-react";
import { ApiResponse } from "@/types/api";

interface UserListProps {
  data?: ApiResponse<User[]>;
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserList({ data, isLoading, onEdit, onDelete }: UserListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return <div className="text-center py-10 text-gray-500">No users found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.data?.map((user) => (
        <div key={user.id} className="p-6 bg-white rounded-lg shadow flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{user.fullName || user.userName}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 rounded-full">{user.role}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

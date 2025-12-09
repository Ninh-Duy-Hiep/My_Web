"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ApiResponse } from "@/types/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Role } from "../types";

interface RoleListProps {
  data?: ApiResponse<Role[]>;
  isLoading: boolean;
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
}

export function RoleList({ data, isLoading, onEdit, onDelete }: RoleListProps) {
  if (data?.data?.length === 0) {
    return <div className="text-center py-10 text-gray-500">No roles found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.data?.map((role) => (
        <Card key={role?.id}>
          <CardHeader className="flex flex-row justify-between items-center gap-4">
            <div>
              {/* <h3 className="font-bold text-lg">{role?.fullName}</h3> */}
              {/* <p className="text-sm text-gray-500">{role?.email}</p> */}
            </div>
            <div className="flex flex-row flex-wrap gap-2 justify-end">
              <Button variant="ghost" size="icon" onClick={() => onEdit(role)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => onDelete(role?.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {/* <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 rounded-full">{role?.role}</span> */}
          </CardHeader>
          <CardContent className="flex gap-2"></CardContent>
        </Card>
      ))}
    </div>
  );
}

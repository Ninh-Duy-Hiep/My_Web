"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Role } from "../types";
import { useRoles } from "../hooks/use-role";
import { RoleList } from "./role-list";

export function RoleView() {
  const { roles, loading, refresh, deleteRole } = useRoles();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

//   const handleCreate = () => {
//     setSelectedRole(null);
//     setIsSheetOpen(true);
//   };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsSheetOpen(true);
  };

//   const handleFormSubmit = async (values: any) => {
//     console.log("Submit:", values);
//     refresh();
//   };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-start ">
        <Button  className="w-full md:w-auto">
          <Plus className="h-5 w-5" /> Add New Role
        </Button>
      </div>

      <RoleList data={roles} isLoading={loading} onEdit={handleEdit} onDelete={deleteRole} />

    </div>
  );
}

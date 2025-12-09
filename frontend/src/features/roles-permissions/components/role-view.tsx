"use client";

import { useState } from "react";
import { Role } from "../types";
import { useRoles } from "../hooks/use-role";
import { RoleList } from "./role-list";
import { RoleFilters } from "./role-filter";
import { RoleFormDialog } from "./role-form-dialog";

export function RoleView() {
  const { roles, loading, filters, setFilter, refresh, deleteRole } = useRoles();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleCreate = () => {
    setSelectedRole(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsSheetOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    console.log("Submit:", values);
    refresh();
  };

  return (
    <div className="space-y-6">
      <RoleFilters filters={filters} onFilterChange={setFilter} onAddClick={handleCreate} />

      <RoleList data={roles} isLoading={loading} onEdit={handleEdit} onDelete={deleteRole} />

      <RoleFormDialog
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        roleToEdit={selectedRole}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useUsers } from "./hooks/use-users";
import { UserList } from "./components/user-list";
import { UserFilters } from "./components/user-filters";
import { User } from "@/types/auth";
import { UserFormDialog } from "./components/user-form-dialog";

export default function UsersManagementPage() {
  const { users, loading, filters, setFilter, refresh, deleteUser } = useUsers();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsSheetOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    console.log("Submit:", values);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage your system users here.</p>
      </div>

      <UserFilters 
        filters={filters} 
        onFilterChange={setFilter} 
        onAddClick={handleCreate} 
      />

      <UserList
        data={users}
        isLoading={loading}
        onEdit={handleEdit}
        onDelete={deleteUser}
      />

      <UserFormDialog
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        userToEdit={selectedUser}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
"use client";

import { useUsers } from "../hooks/use-users";
import { UserList } from "./user-list";
import { UserFormDialog } from "./user-form-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UserFilters } from "./user-filters";

export function UserView() {
  const { users, loading, filters, setFilter, refresh } = useUsers();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users Management</h2>
          <p className="text-muted-foreground">
            Manage your system users and their permissions here.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <UserFilters filters={filters} onFilterChange={setFilter} />

      <UserList 
        data={users} 
        isLoading={loading} 
        onRefresh={refresh}
      />

      <UserFormDialog 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen}
        onSuccess={refresh}
      />
    </div>
  );
}
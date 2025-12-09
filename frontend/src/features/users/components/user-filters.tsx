"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { UserFilter } from "../types";

interface UserFiltersProps {
  filters: UserFilter;
  onFilterChange: (newFilters: Partial<UserFilter>) => void;
  onAddClick: () => void;
}

export function UserFilters({ filters, onFilterChange, onAddClick }: UserFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      
      <div className="flex items-center gap-2 w-full md:w-auto flex-1">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full pl-9"
            value={filters.name || ""}
            onChange={(e) => onFilterChange({ name: e.target.value, page: 1 })} 
          />
        </div>
        
      </div>

      <Button onClick={onAddClick} className="w-full md:w-auto">
        <Plus className="mr-2 h-4 w-4" /> Add User
      </Button>
    </div>
  );
}
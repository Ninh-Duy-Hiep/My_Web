"use client";

import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { RoleFilter } from "../types";
import { Button } from "@/components/ui/button";

interface RoleFiltersProps {
  filters: RoleFilter;
  onFilterChange: (newFilters: Partial<RoleFilter>) => void;
  onAddClick: () => void;
}

export function RoleFilters({ filters, onFilterChange, onAddClick }: RoleFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative flex justify-between items-center gap-2 w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search roles..."
          className="w-full pl-9"
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
        />
      </div>
      <Button onClick={onAddClick} className="w-full md:w-auto">
        <Plus className="h-5 w-5" /> Add New Role
      </Button>
    </div>
  );
}

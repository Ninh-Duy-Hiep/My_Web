"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { Role, RoleFilter } from "../types";
import { rolesPermisionsService } from "../api/roles-permission.service";
import { useDebounce } from "@/hooks/use-debounce";

export function useRoles() {
  const [filters, setFilters] = useState<RoleFilter>({ page: 1, limit: 10, search: "" });
  const [roles, setRoles] = useState<ApiResponse<Role[]>>();
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const debouncedName = useDebounce(filters.search, 500);

  const loadRoles = useCallback(async () => {
    try {
      setLoading(true);

      const apiFilters = {
        page: filters.page,
        limit: filters.limit,
        ...(debouncedName ? { search: debouncedName } : {}),
      };

      const response = await rolesPermisionsService.getRoles(apiFilters);
      setRoles(response || []);
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }, [filters.page, filters.limit, debouncedName, error]);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const getAllRoles = useCallback(async () => {
    try {
      setLoading(true);

      const response = await rolesPermisionsService.getRoles({});
      setRoles(response || []);
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }, [error]);

  const deleteRole = async (id: string) => {
    try {
      success("Deleted", { description: "Role deleted successfully" });
      loadRoles();
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    }
  };

  const setFilter = (newFilter: Partial<RoleFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  return {
    roles,
    loading,
    filters,
    setFilter,
    getAllRoles,
    refresh: loadRoles,
    deleteRole,
  };
}

import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { Permission, Role, RoleFilter } from "../types";

export const rolesPermisionsService = {
  getRoles: async (params: RoleFilter) => {
    const response = await axiosInstance.get<ApiResponse<Role[]>>("/roles", {params});
    return response.data;
  },

  getPermissions: async () => {
    const response = await axiosInstance.get<ApiResponse<Permission[]>>("/roles/permissions")
    return response.data;
  },

  createRole: async (data: Omit<Role, "id">) => {
    const response = await axiosInstance.post<ApiResponse<Role>>("roles", data);
    return response.data;
  },

  updateRole: async (data: Partial<Role>) => {
    const response = await axiosInstance.put<ApiResponse<Role>>(`roles/${data.id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    return await axiosInstance.delete(`roles/${id}`)
  }
};
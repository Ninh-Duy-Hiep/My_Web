import { ApiResponse } from './../types/api';
import axiosInstance from "@/lib/axios";
import { User, UserFilter } from "@/types/auth";

export const usersService = {
  getUsers: async (params: UserFilter) => {
    const response = await axiosInstance.get<ApiResponse<User[]>>("/users", { params });
    return response.data;
  },
};
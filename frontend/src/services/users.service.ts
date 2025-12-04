import axiosInstance from "@/lib/axios";
import { User, UserFilter } from "@/types/auth";

export const usersService = {
  getUsers: async (params: UserFilter) => {
    const response = await axiosInstance.get<User[]>("/users", { params });
    return response.data;
  },
};
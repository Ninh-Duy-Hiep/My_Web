import axiosInstance from '@/lib/axios';
import { ApiSuccessResponse } from '@/types/api';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string | null;
    userName: string;
    role: string;
  };
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export const authService = {
  login: async (payload: LoginRequest) => {
    const response = await axiosInstance.post<ApiSuccessResponse<LoginResponse>>('/auth/login', payload);
    return response.data;
  },
};
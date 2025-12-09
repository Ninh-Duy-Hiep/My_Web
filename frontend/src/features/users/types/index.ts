export interface UserFilter {
  name?: string;
  page?: number;
  limit?: number;
}

export interface User {
  id: string;
  userName: string;
  fullName: string;
  avatar: string;
  permission: string[];
  email: string | null;
  role: string;
}
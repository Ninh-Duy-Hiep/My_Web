export interface User {
  id: string;
  userName: string;
  email: string | null;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (params: { userName: string; password: string; rememberMe?: boolean }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

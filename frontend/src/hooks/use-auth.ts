import { useAuthContext } from "@/provieders/auth-provider";

export const useAuth = () => {
  return useAuthContext();
};

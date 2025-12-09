import { Metadata } from "next";
import { UserView } from "@/features/users";

export const metadata: Metadata = {
  title: "Users Management",
  description: "Manage system users",
};

export default function UsersPage() {
  return <UserView />;
}
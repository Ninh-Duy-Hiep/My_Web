import { RoleView } from "@/features/roles-permissions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roles Management",
  description: "Manage system roles",
};

export default function RolesPage() {
  return <RoleView />;
}
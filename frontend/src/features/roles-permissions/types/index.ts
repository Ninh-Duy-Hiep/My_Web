export interface Permission {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoleFilter {
  search?: string;
  page?: number;
  limit?: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
  _count: {
    users: number;
  };
}

export interface CreateRole {
  id?: string;
  name: string;
  description: string;
  permissionIds: string[];
}

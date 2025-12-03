"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/axios";
import { usersService } from "@/services/users.service";
import { User, UserFilter } from "@/types/auth";
import { useCallback, useEffect, useState } from "react";

export default function UsersManagementPage() {
  const [loading, setLoading] = useState(true);
  const { error } = useToast();
  const [filters, setFilters] = useState<UserFilter>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  const [users, setUsers] = useState<User[]>();
  const debouncedName = useDebounce(filters.name, 500);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      const apiFilters: UserFilter = {
        name: debouncedName,
        page: currentPage,
        limit: pageSize,
      };

      const response = await usersService.getUsers(apiFilters);
      console.log(response);
    } catch (err) {
      error("Error", { description: getErrorMessage(err) || "Lỗi khi lấy dữ liệu" });
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedName, pageSize, error]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return <div></div>;
}

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roleSchema, RoleSchemaType } from "../types/schema";
import { Role } from "../types";
import { Textarea } from "@/components/ui/textarea";

interface RoleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleToEdit?: Role | null;
  onSubmit: (values: RoleSchemaType) => Promise<void>;
}

export function RoleFormDialog({ open, onOpenChange, roleToEdit, onSubmit }: RoleFormDialogProps) {
  const form = useForm<RoleSchemaType>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissionIds: [],
    },
  });

  useEffect(() => {
    if (open) {
      if (roleToEdit) {
        form.reset({
          name: roleToEdit?.name || "",
          description: roleToEdit?.description,
          permissionIds: roleToEdit?.permissions?.map((p) => p.id) || [],
        });
      } else {
        form.reset({ name: "", description: "", permissionIds: [] });
      }
    }
  }, [open, roleToEdit, form]);

  const handleSubmit = async (values: RoleSchemaType) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{roleToEdit ? "Edit User" : "Create New User"}</DialogTitle>
          <DialogDescription>
            {roleToEdit ? "Make changes to role here." : "Add a new role to the system."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Role Name <span className="text-red-500">*</span>
            </Label>
            <Input id="name" {...form.register("name")} placeholder="Enter role name" />
            {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea rows={10} id="description" {...form.register("description")} placeholder="Enter description" />
            {form.formState.errors.description && (
              <p className="text-red-500 text-xs">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

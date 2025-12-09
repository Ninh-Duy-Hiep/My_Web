import * as z from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, { message: "Please enter role name" }),
  description: z.string().optional().nullable(),
  permissionIds: z.array(z.string()).optional(),
});

export type RoleSchemaType = z.infer<typeof roleSchema>;

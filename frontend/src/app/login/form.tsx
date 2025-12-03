import * as z from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, { message: "Vui lòng nhập tên đăng nhập" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  rememberMe: z.boolean().default(false).optional(),
});

export const registerSchema = z.object({
  userName: z.string().min(1, { message: "Vui lòng nhập tên đăng nhập" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
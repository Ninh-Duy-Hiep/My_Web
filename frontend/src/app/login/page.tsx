"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Facebook, Github, Linkedin, Chrome, UserRoundPen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, LoginSchemaType, registerSchema, RegisterSchemaType } from "./form";
import { CustomInput, SocialIcon } from "./ui";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/axios";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useAuth();
  const { success, error } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userName: "", password: "", rememberMe: false },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", userName: "", email: "", password: "" },
  });

  useEffect(() => {
    if (isRegister) {
      registerForm.reset();
    } else {
      loginForm.reset();
    }
  }, [isRegister, loginForm, registerForm]);

  async function onLoginSubmit(values: LoginSchemaType) {
    setIsLoading(true);
    try {
      await login({
        userName: values.userName,
        password: values.password,
        rememberMe: values.rememberMe,
      });
      success("Success", { description: "Login successful!" });
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    } finally {
      setIsLoading(false);
    }
  }

  async function onRegisterSubmit(values: RegisterSchemaType) {
    setIsLoading(true);
    try {
      await register({
        userName: values.userName,
        email: values.email,
        fullName: values.fullName,
        password: values.password,
      });
      success("Success", { description: "Registration successful!" });
      setIsRegister(false);
    } catch (err) {
      error("Error", { description: getErrorMessage(err) });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div
        className={`relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-200
          ${isRegister ? "active" : ""} 
        `}
      >
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-10
            ${isRegister ? "translate-x-full opacity-100 visible" : "left-0 opacity-0 invisible"}
          `}
        >
          <form
            onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
            className="bg-white flex flex-col items-center justify-center h-full px-10 text-center"
            noValidate
          >
            <h1 className="text-4xl font-bold mb-4">Register</h1>

            <div className="w-full space-y-3">
              <CustomInput
                icon={<UserRoundPen className="w-5 h-5" />}
                placeholder="FullName"
                register={registerForm.register("fullName")}
              />
              {registerForm.formState.errors.fullName && (
                <p className="text-red-500 text-sm text-start">{registerForm.formState.errors.fullName.message}</p>
              )}
              <CustomInput
                icon={<User className="w-5 h-5" />}
                placeholder="UserName"
                register={registerForm.register("userName")}
              />
              {registerForm.formState.errors.userName && (
                <p className="text-red-500 text-sm text-start">{registerForm.formState.errors.userName.message}</p>
              )}
              <CustomInput
                icon={<Mail className="w-5 h-5" />}
                placeholder="Email"
                type="email"
                register={registerForm.register("email")}
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-500 text-sm text-start">{registerForm.formState.errors.email.message}</p>
              )}
              <CustomInput
                icon={
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <Eye className="w-5 h-5 cursor-pointer" />
                    )}
                  </div>
                }
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                register={registerForm.register("password")}
              />
              {registerForm.formState.errors.password && (
                <p className="text-red-500 text-sm text-start">{registerForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button className="mt-6 w-full bg-[#512da8] hover:bg-[#5c6bc0] uppercase font-bold tracking-wider cursor-pointer">
              Register
            </Button>

            <div className="flex space-x-3 mt-5">
              <SocialIcon icon={<Chrome className="w-5 h-5" />} />
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Github className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </form>
        </div>

        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ease-in-out z-20
            ${isRegister ? "translate-x-full opacity-0 invisible" : "left-0"}
          `}
        >
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="bg-white flex flex-col items-center justify-center h-full px-10 text-center"
            noValidate
          >
            <h1 className="text-4xl font-bold mb-4">Login</h1>

            <div className="w-full space-y-3">
              <CustomInput
                icon={<User className="w-5 h-5" />}
                placeholder="Username"
                register={loginForm.register("userName")}
              />
              {loginForm.formState.errors.userName && (
                <p className="text-red-500 text-sm text-start">{loginForm.formState.errors.userName.message}</p>
              )}
              <CustomInput
                icon={
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <Eye className="w-5 h-5 cursor-pointer" />
                    )}
                  </div>
                }
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                register={loginForm.register("password")}
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm text-start">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between w-full mt-4 text-xs">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={loginForm.watch("rememberMe")}
                  onCheckedChange={(val) => loginForm.setValue("rememberMe", val as boolean)}
                  className="cursor-pointer"
                />
                <label htmlFor="remember" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              disabled={isLoading}
              className="mt-6 w-full bg-[#512da8] hover:bg-[#5c6bc0] uppercase font-bold tracking-wider cursor-pointer"
            >
              {isLoading ? "Processing..." : "Login"}
            </Button>

            <div className="flex space-x-3 mt-5">
              <SocialIcon icon={<Chrome className="w-5 h-5" />} />
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Github className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </form>
        </div>

        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-1000 ease-in-out z-50 rounded-l-[150px]
            ${isRegister ? "-translate-x-full rounded-l-none rounded-r-[150px]" : ""}
          `}
        >
          <div
            className={`bg-linear-to-r from-[#5c6bc0] to-[#512da8] text-white relative -left-full h-full w-[200%] transform transition-transform duration-1000 ease-in-out
              ${isRegister ? "translate-x-1/2" : "translate-x-0"}
            `}
          >
            <div
              className={`absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-transform duration-1000 ease-in-out
                ${isRegister ? "translate-x-0" : "-translate-x-[200%]"}
              `}
            >
              <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-6">Already have an account?</p>
              <button
                onClick={() => setIsRegister(false)}
                className="cursor-pointer **:bg-transparent border border-white text-white py-2 px-10 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Login
              </button>
            </div>

            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-transform duration-1000 ease-in-out
                ${isRegister ? "translate-x-[200%]" : "translate-x-0"}
              `}
            >
              <h1 className="text-4xl font-bold mb-4">Hello, Welcome!</h1>
              <p className="mb-6">Don&apos;t have an account?</p>
              <button
                onClick={() => setIsRegister(true)}
                className="cursor-pointer bg-transparent border border-white text-white py-2 px-10 rounded-lg font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

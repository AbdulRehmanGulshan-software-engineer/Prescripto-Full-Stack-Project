import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/loginSchema";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";
// const { token } = useAuth();

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),

    mode: "onTouched",

    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit Form
  const onSubmit = async (formData) => {
    try {
      await login(formData);
      toast.success("Login successful!");
      reset();
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-5"
      >
        {/* ================= Header ================= */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

          <p className="mt-1 text-gray-500">Login to continue.</p>
        </div>

        {/* ================= Email ================= */}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="john@gmail.com"
            {...register("email")}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
              errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 focus:ring-2 focus:ring-blue-400"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* ================= Password ================= */}

        <div>
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
              errors.password
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 focus:ring-2 focus:ring-blue-400"
            }`}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ================= Forgot Password ================= */}

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        {/* ================= Submit ================= */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing In..." : "Login"}
        </button>

        {/* ================= Register ================= */}

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Account
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;

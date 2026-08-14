import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import { registerSchema } from "../schemas/registerSchema";
import PasswordStrength from "../components/PasswordStrength";
import { useAuth } from "../context/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { register: registerAccount } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),

    mode: "onTouched",

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Watch Password
  const password = watch("password");

  // ==========================================================
  // Submit Form
  // ==========================================================

  const onSubmit = async (formData) => {
    try {
      // Call register API through AuthContext
      await registerAccount(formData);

      // Show success message
      toast.success("Account created successfully!");

      // Reset form
      reset();

      // ======================================================
      // FUTURE:
      //
      // After successful registration:
      //
      // navigate("/login");
      //
      // Or if registration automatically logs the user in:
      //
      // navigate("/");
      // ======================================================
    } catch (error) {
      console.error("Registration Error:", error);

      // ======================================================
      // Backend response example:
      //
      // {
      //   success: false,
      //   message: "User already exists"
      // }
      //
      // AuthContext throws:
      //
      // new Error(data.message)
      //
      // Therefore error.message will contain the backend
      // message.
      // ======================================================

      toast.error(
        error.message ||
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg"
      >
        {/* ========================= Header ========================= */}

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

          <p className="mt-1 text-gray-500">
            Please sign up to book an appointment.
          </p>
        </div>

        {/* ========================= Name ========================= */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-medium text-gray-700"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
              errors.name
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 focus:ring-2 focus:ring-blue-400"
            }`}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* ========================= Email ========================= */}

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

        {/* ========================= Password ========================= */}

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

          <PasswordStrength password={password} />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ========================= Submit ========================= */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        {/* ========================= Login ========================= */}

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
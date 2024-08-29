import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Inputs = {
  fullName: string;
  userEmail: string;
  password: string;
  telephone: string;
  address: string;
};

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        data
      );
      console.log(response);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-20 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Full Name:
          </label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Full Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Email:
          </label>
          <input
            type="email"
            {...register("userEmail", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.userEmail && (
            <span className="text-red-500">{errors.userEmail.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Telephone:
          </label>
          <input
            type="tel"
            {...register("telephone", { required: "Telephone is required" })}
            placeholder="Telephone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.telephone && (
            <span className="text-red-500">{errors.telephone.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Password:
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4,})(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                message:
                  "Password must contain at least 1 uppercase letter, 1 lowercase letter, 4 numbers, and 1 special character",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Address:
          </label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

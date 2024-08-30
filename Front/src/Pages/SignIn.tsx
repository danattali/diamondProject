import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";

type Inputs = {
  userEmail: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      console.log("Login successful:", result);
    
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10" style={{ minHeight: "63vh" }}>
      <h2 className="text-3xl font-bold text-center mb-10 pt-20">Log In</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Email:
          </label>
          <input
            type="email"
            {...register("userEmail", { required: "Email is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.userEmail && (
            <span className="text-red-500">{errors.userEmail.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

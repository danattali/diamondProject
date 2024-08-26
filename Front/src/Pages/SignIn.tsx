import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../utils/axiosConfig";
import { fetchUserDetails, login } from "../redux/authSlice";
import { AppDispatch } from "../redux/store"; // Make sure the path is correct

type Inputs = {
  email: string;
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

  const handleSignIn: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post("/auth/login", {
        userEmail: data.email,
        password: data.password,
      });

      const userData = response.data;
      if (userData.token) {
        console.log("Token found:", userData.token);

        localStorage.setItem("token", userData.token);
        dispatch(login(userData.user)); // Dispatch the login action with user data
        // Fetch additional user details if necessary
        await dispatch(fetchUserDetails());
        navigate("/"); // Navigate to the dashboard after login
      } else {
        console.log("No token found");
      }
      // Dispatch the login action with user data
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  };

  return (
    <div
      className="max-w-md mx-auto mt-10"
      style={{
        minHeight: "63vh",
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-10 pt-20">Log In</h2>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="mail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

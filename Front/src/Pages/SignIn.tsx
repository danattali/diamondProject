import React from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn: SubmitHandler<Inputs> = async (data) => {
    try {
      ``;
      const response = await axios.post("http://localhost:4000/auth/login", {
        userEmail: data.email, // Updated to match the backend field
        password: data.password,
      });

      if (response.data) {
        const { _id, fullName, email, rules } = response.data.user;
        const user = {
          _id: _id,
          fullName: fullName,
          email: email,
          rules: rules,
        };

        dispatch(login(user));
        localStorage.setItem("login", "true");
        localStorage.setItem("userType", user.rules);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.fullName);
        localStorage.setItem("_id", user._id);
        navigate("/");

        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="max-w-md mx-auto mt-10 "
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
type Inputs = {
  fullName: string;
  userEmail: string;
  password: string;
  telephone: string;
  address: string;
  rules: string;
};
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const response = await axios.post("http://localhost:4000/auth/register", {
        fullName,
        userEmail,
        password,
        telephone,
        address,
        rules,
      });
      console.log(response);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
    }
  };
  return (
    <div className="max-w-md mx-auto pt-20 mt-10 ">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            fullname:{" "}
          </label>
          <input
            type="text"
            {...register("fullName", { required: true })}
            placeholder="FullName"
            onChange={(e) => setFullName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.fullName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            email:{" "}
          </label>
          <input
            type="email"
            {...register("userEmail", { required: true })}
            placeholder="mail"
            onChange={(e) => setUserEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.userEmail && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Telephone:{" "}
          </label>
          <input
            type="string"
            {...register("telephone", { required: true })}
            placeholder="telephone"
            onChange={(e) => setTelephone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.telephone && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Password:{" "}
          </label>

          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Need to have more than 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){4,})(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                message:
                  "Password must contain at least 1 uppercase letter, 1 lowercase letter, 4 numbers, and 1 special character",
              },
            })}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Address:{" "}
          </label>
          <input
            type="text"
            {...register("address", { required: true })}
            placeholder="address"
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.address && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

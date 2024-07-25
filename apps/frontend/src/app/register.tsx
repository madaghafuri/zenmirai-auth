import React, { useState } from "react";
import "./styles.css";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  username: string;
  name: string;
  password: string;
};

export const baseApiURL = import.meta.env.API_URL || "http://localhost:5001";

function RegisterPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isLoading },
  } = useForm<Input>();

  const [successMessage, setSuccessMessage] = useState("");
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const res = await fetch(baseApiURL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!res.ok) {
      setError("root", { message: resData.message });
    } else {
      setSuccessMessage(resData.message);
      reset({ name: "", password: "", username: "" });
    }
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 m-auto w-[430px] h-[430px]">
      <h1 className="title">
        <span>Register</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center justify-center"
      >
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="px-4 py-2 rounded-md border border-gray-200"
            placeholder="Your Username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-sm text-red-500">username is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>Name</label>
          <input
            type="text"
            className="px-4 py-2 rounded-md border border-gray-200"
            placeholder="Yout Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">name is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="px-4 py-2 rounded-md border border-gray-200"
            placeholder="Your Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">password is required</span>
          )}
        </div>

        <p className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline text-blue-500">
            Click Here
          </a>
        </p>
        {errors.root && (
          <span className="text-sm text-red-500">{errors.root.message}</span>
        )}
        {successMessage && (
          <span className="text-sm text-green-500">{successMessage}</span>
        )}
        <input
          type="submit"
          className="bg-indigo-500 text-white rounded-md px-4 py-2 w-full mt-5"
        ></input>
      </form>
    </div>
  );
}

export default RegisterPage;
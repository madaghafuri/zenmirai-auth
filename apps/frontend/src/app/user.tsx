import React from "react";
import { useLoaderData } from "react-router-dom";

type UserResponse = {
  username: string;
  name: string;
  password: string;
  created_at: string;
};

function UserPage() {
  const data = useLoaderData() as {
    status: string;
    message: string;
    data: UserResponse;
  };
  return (
    <div className="absolute w-[430px] h-[430px] left-0 right-0 top-0 bottom-0 m-auto ">
      <h1 className="title">User</h1>
      <div className="grid grid-cols-[30%,auto] rounded-md p-5 bg-zinc-300">
        <p>Username:</p>
        <p>{data.data.username}</p>
        <p>Name:</p>
        <p>{data.data.name}</p>
      </div>
    </div>
  );
}
export default UserPage;

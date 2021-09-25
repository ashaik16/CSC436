import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user }) {
  if (user) {
    return (
      <div>
        <Logout user={user} />
      </div>
    );
  } else {
    return (
      <>
        <Login />
        <Register />
      </>
    );
  }
}

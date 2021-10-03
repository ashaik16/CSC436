import React from "react";

export default function Logout({ user, dispatchUser }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGOUT" });
      }}
    >
      Logged in as: <b>{user}</b>&nbsp;
      <input type="submit" value="Logout" />
    </form>
  );
}

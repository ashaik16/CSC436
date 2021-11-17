import React, { useContext } from "react";
import { StateContext } from "../Contexts";

export default function Logout() {
  const { dispatch, state } = useContext(StateContext);
  const { user } = state;
  return (
    <form
      style={{ backgroundColor: "#85C1E9" }}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      Logged in as: <b>{user.username}</b>&nbsp;
      {/* Logged in as: <b>{user}</b>&nbsp; */}
      <input type="submit" value="Logout" />
    </form>
  );
}

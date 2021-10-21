import React, { useContext } from "react";
import { StateContext } from "../Contexts";

//export default function Logout({ user, dispatch }) {
export default function Logout() {
  const { dispatch, state } = useContext(StateContext);
  const { user } = state;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      Logged in as: <b>{user}</b>&nbsp;
      <input type="submit" value="Logout" />
    </form>
  );
}

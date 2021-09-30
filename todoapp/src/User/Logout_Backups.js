import React from "react";

export default function Logout(props) {
  function logOutHandler(event) {
    event.preventDefault();
    props.onLogOut(true);
  }
  return (
    <form onSubmit={logOutHandler}>
      Logged in as: <b> {props.userName}</b>&nbsp;
      <input type="submit" value="Logout" />
    </form>
  );
}

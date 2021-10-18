import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";

//export default function Login({ dispatch }) {
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleUserName(evt) {
    setUsername(evt.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function loginHandler(event) {
    event.preventDefault();
    dispatch({ type: "LOGIN", username });
  }
  const { dispatch } = useContext(StateContext);
  return (
    <form onSubmit={loginHandler}>
      <div>
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          name="login-username"
          id="login-username"
          onChange={handleUserName}
          value={username}
          required
        />
      </div>
      <br />

      <div>
        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          name="login-password"
          id="login-password"
          onChange={handlePassword}
          value={password}
          required
        />
      </div>
      <br />

      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}

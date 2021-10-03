import React, { useState } from "react";

export default function Login({ dispatchUser }) {
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
    dispatchUser({ type: "LOGIN", username });
  }
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

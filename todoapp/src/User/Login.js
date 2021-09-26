import React, { useState } from "react";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleUserName(event) {
    setUserName(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function loginHandler(event) {
    event.preventDefault();
    const loginCredintials = {
      userName: userName,
      password: password,
    };

    props.loginHandler(loginCredintials);
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
          required
        />
      </div>
      <br />

      <input type="submit" value="Login" />
    </form>
  );
}

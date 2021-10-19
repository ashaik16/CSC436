import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";
//export default function Login({ dispatch }) {
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  function handleUserName(evt) {
    setUsername(evt.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function loginHandler(event) {
    event.preventDefault();
    login(username, password);
    // dispatch({ type: "LOGIN", username });
  }
  const { dispatch } = useContext(StateContext);
  const [user, login] = useResource((username, password) => ({
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: "get",
  }));
  useEffect(() => {
    if (user && user.data) {
      if (user.data.length > 0) {
        setLoginFailed(false);
        dispatch({ type: "LOGIN", username: user.data[0].username });
      } else {
        setLoginFailed(true);
      }
    }
  }, [user]);
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
      {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )}
      <br />
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}

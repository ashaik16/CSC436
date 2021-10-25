import React, { useContext, useState, useEffect } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(StateContext);
  function handleUserName(event) {
    setUserName(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPassword(event) {
    if (password !== event.target.value) {
      event.target.setCustomValidity(
        "Password and Confirm Password must be same"
      );
    } else {
      event.target.setCustomValidity("");
    }
  }

  const [user, register] = useResource(({ userName, password }) => ({
    url: "/users",
    method: "post",
    data: { username: userName, password: password },
  }));
  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "REGISTER", username: user.data.username });
    }
  }, [user]);

  function registerHandler(event) {
    event.preventDefault();
    register({ userName, password });
  }

  return (
    <form onSubmit={registerHandler}>
      <div>
        <label htmlFor="register-username">Username: </label>
        <input
          type="text"
          name="register-username"
          id="register-username"
          onChange={handleUserName}
          required
        />
      </div>
      <br />

      <div>
        <label htmlFor="register-password">Password: </label>
        <input
          type="password"
          name="register-password"
          id="register-password"
          onChange={handlePassword}
          required
        />
      </div>
      <br />

      <div>
        <label htmlFor="register-password-repeat">
          Confirm <br />
          password:
        </label>{" "}
        <input
          type="password"
          name="register-password-repeat"
          id="register-password-repeat"
          required
          onChange={handleConfirmPassword}
        />
      </div>
      <br />

      <input
        type="submit"
        value="Register"
        disabled={userName.length === 0 || password.length === 0}
      />
    </form>
  );
}

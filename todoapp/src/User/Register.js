import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";

//export default function Register({ dispatch }) {
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
  function registerHandler(event) {
    event.preventDefault();

    dispatch({ type: "REGISTER", username: userName });
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

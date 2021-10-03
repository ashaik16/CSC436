import React, { useState } from "react";

export default function Register({ dispatchUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confrimPassword: "",
  });
  function registerHandler(event) {
    event.preventDefault();
    dispatchUser({ type: "REGISTER", username: formData.username });
  }
  return (
    <form onSubmit={registerHandler}>
      <div>
        <label htmlFor="register-username">Username: </label>
        <input
          type="text"
          name="register-username"
          id="register-username"
          value={formData.username}
          onChange={(event) =>
            setFormData({ ...formData, username: event.target.value })
          }
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
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
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
          value={formData.confrimPassword}
          required
          onChange={(event) =>
            setFormData({ ...formData, confrimPassword: event.target.value })
          }
        />
      </div>
      <br />

      <input
        type="submit"
        value="Register"
        disabled={
          formData.username.length === 0 ||
          formData.password.length === 0 ||
          formData.password !== formData.confrimPassword
        }
      />
    </form>
  );
}

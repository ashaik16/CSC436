import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";
export default function Register({ show, handleClose }) {
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
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form
        onSubmit={registerHandler}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   register(formData.username, formData.password);
        //   handleClose();
        // }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="register-username">Username:</Form.Label>
          <Form.Control
            type="text"
            onChange={handleUserName}
            name="register-username"
            id="register-username"
            required
          />
          <Form.Label htmlFor="register-password">Password:</Form.Label>
          <Form.Control
            type="password"
            name="register-password"
            id="register-password"
            onChange={handlePassword}
            required
          />
          <Form.Label htmlFor="register-password-repeat">
            Repeat password:
          </Form.Label>
          <Form.Control
            type="password"
            name="register-password-repeat"
            id="register-password-repeat"
            required
            onChange={handleConfirmPassword}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={userName.length === 0 || password.length === 0}
          >
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    // <form onSubmit={registerHandler}>
    //   <div>
    //     <label htmlFor="register-username">Username: </label>
    //     <input
    //       type="text"
    //       name="register-username"
    //       id="register-username"
    //       onChange={handleUserName}
    //       required
    //     />
    //   </div>
    //   <br />

    //   <div>
    //     <label htmlFor="register-password">Password: </label>
    //     <input
    //       type="password"
    //       name="register-password"
    //       id="register-password"
    //       onChange={handlePassword}
    //       required
    //     />
    //   </div>
    //   <br />

    //   <div>
    //     <label htmlFor="register-password-repeat">
    //       Confirm <br />
    //       password:
    //     </label>{" "}
    //     <input
    //       type="password"
    //       name="register-password-repeat"
    //       id="register-password-repeat"
    //       required
    //       onChange={handleConfirmPassword}
    //     />
    //   </div>
    //   <br />

    //   <input
    //     type="submit"
    //     value="Register"
    //     disabled={userName.length === 0 || password.length === 0}
    //   />
    // </form>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";
export default function Register({ show, handleClose, setShowRegister }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const { state, dispatch } = useContext(StateContext);
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
  const [status, setStatus] = useState("");
  const [user, register] = useResource(({ userName, password }) => ({
    // url: "/users",
    url: "auth/register",
    method: "post",
    data: {
      username: userName,
      password: password,
      passwordConfirmation: password,
    },
  }));
  // useEffect(() => {}, [state.user.access_token]);
  useEffect(() => {
    if (user && user.data) {
      dispatch({
        type: "REGISTER",
        username: user.data.username,
        access_token: user.data.access_token,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        console.log(user);
        setRegistrationFailed(true);
        setShowRegister(true);
        if (user.error.data.error.substr(0, 6) === "E11000")
          setStatus(
            "This username is already registered with us, try registering with other username"
          );
        else setStatus("Registration failed, please try again later.");
        //  alert("fail");
      } else {
        console.log(user);
        setRegistrationFailed(false);
        setShowRegister(false);
        setStatus("Registration successful. You may now login.");
        //  alert("success");
      } //dispatch({ type: 'REGISTER', username: user.data.username })
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
          {registrationFailed && (
            <Form.Text style={{ color: "red" }}>{status}</Form.Text>
          )}
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

import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
export default function Login({ show, handleClose, setShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  let errorMessage = "";
  function handleUserName(evt) {
    setUsername(evt.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  const { dispatch } = useContext(StateContext);
  // const [user, login] = useResource((username, password) => ({
  //   url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
  //   method: "get",
  // }));
  const [user, login] = useResource((username, password) => ({
    url: "auth/login",
    method: "post",
    data: { username, password },
  }));

  // useEffect(() => {
  //   if (user && user.data) {
  //     if (user.data.length > 0) {
  //       setLoginFailed(false);
  //       dispatch({ type: "LOGIN", username: user.data[0].username });
  //     } else {
  //       setLoginFailed(true);
  //       setShowLogin(true);
  //     }
  //   }
  // }, [user]);
  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        errorMessage = user.error.data.error;
        setLoginFailed(true);
        setShowLogin(true);
        //  alert("failed");
      } else {
        setLoginFailed(false);
        dispatch({
          type: "LOGIN",
          username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  function loginHandler(event) {
    event.preventDefault();
    login(username, password);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form
        // onSubmit={(e) => {
        onSubmit={loginHandler}
        // e.preventDefault();
        // login(username, password);
        //  handleClose();
        //   }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="login-username">Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUserName}
            name="login-username"
            id="login-username"
            value={username}
            required
          />
          <Form.Label htmlFor="login-password">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePassword}
            name="login-password"
            id="login-password"
            value={password}
            required
          />
          {loginFailed && (
            <Form.Text style={{ color: "red" }}>
              {user.error && user.error.data.error}
            </Form.Text>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={username.length === 0}
            type="submit"
          >
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    // <form onSubmit={loginHandler}>
    //   <div>
    //     <label htmlFor="login-username">Username:</label>
    //     <input
    //       type="text"
    //       name="login-username"
    //       id="login-username"
    //       onChange={handleUserName}
    //       value={username}
    //       required
    //     />
    //   </div>
    //   <br />

    //   <div>
    //     <label htmlFor="login-password">Password:</label>
    //     <input
    //       type="password"
    //       name="login-password"
    //       id="login-password"
    //       onChange={handlePassword}
    //       value={password}
    //       required
    //     />
    //   </div>
    //   <br />
    //   {loginFailed && (
    //     <span style={{ color: "red" }}>Invalid username or password</span>
    //   )}
    //   <br />
    //   <input type="submit" value="Login" disabled={username.length === 0} />
    // </form>
  );
}

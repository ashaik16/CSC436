import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import CreateTodo from "../Todo/CreateTodo";
import HomePage from "../pages/HomePage";
import { useContext } from "react";
import { StateContext } from "../Contexts";
import { route, mount } from "navi";
import { Router, View } from "react-navi";
import TodoPage from "../pages/TodoPage";
export default function UserBar() {
  const { state } = useContext(StateContext);
  const { user } = state;
  if (user) {
    return (
      <div>
        <Logout />
        <br />
        <br />
        <hr />
        <br />

        {user && <CreateTodo />}
        {/* 
        <HomePage /> */}
      </div>
    );
  } else {
    return (
      <div>
        {!user && (
          <div>
            <h2>
              <u>Login</u>
            </h2>

            <Login />
            <br />
            <hr />
            <h1>OR</h1>
            <h2>
              <u>Register For New User</u>
            </h2>

            <Register />
          </div>
        )}{" "}
      </div>
    );
  }
}

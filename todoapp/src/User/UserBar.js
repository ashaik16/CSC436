import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import CreateTodo from "../Todo/CreateTodo";
import TodoList from "../Todo/TodoList";
import { useContext } from "react";
import { StateContext } from "../Contexts";
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

        <TodoList />
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

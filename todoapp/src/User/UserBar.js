import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import CreateTodo from "../Todo/CreateTodo";
import TodoList from "../Todo/TodoList";
export default function UserBar({
  user,
  dispatchUser,
  dispatchTodo,
  todoList,
}) {
  if (user) {
    return (
      <div>
        <Logout user={user} dispatchUser={dispatchUser} />
        <br />
        <br />
        <hr />
        <br />
        <CreateTodo dispatchTodo={dispatchTodo} />
        <TodoList todoList={todoList} dispatchTodo={dispatchTodo} />
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
            <Login dispatchUser={dispatchUser} />
            <br />
            <hr />
            <h1>OR</h1>
            <h2>
              <u>Register For New User</u>
            </h2>
            <Register dispatchUser={dispatchUser} />
          </div>
        )}{" "}
      </div>
    );
  }
}

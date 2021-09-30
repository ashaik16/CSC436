import UserBar from "./User/UserBar";
import CreateTodo from "./Todo/CreateTodo";
import TodoList from "./Todo/TodoList";
import React, { useReducer } from "react";
import * as myConstClass from "./Todo/DummyTodoList";

function App() {
  //   const [state, dispatch] = useReducer(appReducer, {
  //     user: "",
  //     todo: myConstClass.dummyTodoList,
  //   });
  //   const { user, todo } = state;
  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }
  function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const createTodoJson = {
          title: action.title,
          description: action.description,
          dateCreated: new Date().toLocaleDateString(),
          id: Math.random(),
        };
        return [createTodoJson, ...state];
      default:
        return state;
    }
  }
  const [user, dispatchUser] = useReducer(userReducer, "");
  const [todoList, dispatchTodos] = useReducer(
    todoReducer,
    myConstClass.dummyTodoList
  );

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatchUser} />
      <br />
      <br />
      <hr />
      <br />

      {user && (
        <div>
          <CreateTodo dispatchTodo={dispatchTodos} />
          <TodoList todoList={todoList} />
        </div>
      )}
    </div>
  );
}

export default App;

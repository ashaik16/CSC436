import UserBar from "./User/UserBar";

import React, { useReducer, useState } from "react";
import * as myConstClass from "./Todo/DummyTodoList";

function App() {
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
          completed: false,
          dateCompleted: "",
        };
        return [createTodoJson, ...state];
      case "TOGGLE_TODO": {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        return state.map((todo) =>
          todo.id === action.id
            ? {
                ...todo,
                completed: !todo.completed,
                dateCompleted: `${date} ${time}`,
              }
            : todo
        );
      }
      case "DELETE_TODO": {
        return state.filter((x) => x.id !== action.id);
      }
      default:
        return state;
    }
  }
  const [user, dispatchUser] = useReducer(userReducer, "");
  const [todoList, dispatchTodo] = useReducer(
    todoReducer,
    myConstClass.dummyTodoList
  );

  return (
    <div>
      <UserBar
        user={user}
        dispatchUser={dispatchUser}
        dispatchTodo={dispatchTodo}
        todoList={todoList}
      />
    </div>
  );
}

export default App;

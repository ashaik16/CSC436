import UserBar from "./User/UserBar";

import React, { useReducer } from "react";
//import * as myConstClass from "./Todo/DummyTodoList";
import appReducer from "./Reducer";
import { StateContext } from "./Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";

function App() {
  // function userReducer(state, action) {
  //   switch (action.type) {
  //     case "LOGIN":
  //     case "REGISTER":
  //       return action.username;
  //     case "LOGOUT":
  //       return "";
  //     default:
  //       return state;
  //   }
  // }
  // function todoReducer(state, action) {
  //   switch (action.type) {
  //     case "CREATE_TODO":
  //       const createTodoJson = {
  //         title: action.title,
  //         description: action.description,
  //         dateCreated: new Date().toLocaleDateString(),
  //         id: Math.random(),
  //         completed: false,
  //         dateCompleted: "",
  //       };
  //       return [createTodoJson, ...state];
  //     case "TOGGLE_TODO": {
  //       const date = new Date().toLocaleDateString();
  //       const time = new Date().toLocaleTimeString();
  //       return state.map((todo) =>
  //         todo.id === action.id
  //           ? {
  //               ...todo,
  //               completed: !todo.completed,
  //               dateCompleted: `${date} ${time}`,
  //             }
  //           : todo
  //       );
  //     }
  //     case "DELETE_TODO": {
  //       return state.filter((x) => x.id !== action.id);
  //     }
  //     default:
  //       return state;
  //   }
  // }
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todoList: [],
  });
  const [todoList, getTodos] = useResource(() => ({
    url: "/todoList",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todoList && todoList.data) {
      dispatch({ type: "FETCH_TODOS", todoList: todoList.data });
    }
  }, [todoList]);

  return (
    <div>
      <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
        <UserBar
        // user={state.user}
        // dispatch={dispatch}
        // todoList={state.todoList}
        />
      </StateContext.Provider>
    </div>
  );
}

export default App;

import UserBar from "./User/UserBar";

import React, { useReducer } from "react";
//import * as myConstClass from "./Todo/DummyTodoList";
import appReducer from "./Reducer";
import { StateContext } from "./Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";

function App() {
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
      dispatch({ type: "FETCH_TODOS", todoList: todoList.data.reverse() });
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

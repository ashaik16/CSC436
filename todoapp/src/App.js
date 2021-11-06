import UserBar from "./User/UserBar";

import React, { useReducer } from "react";
//import * as myConstClass from "./Todo/DummyTodoList";
import appReducer from "./Reducer";
import { StateContext } from "./Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import CreateTodo from "./Todo/CreateTodo";
import TodoPage from "./pages/TodoPage";
import { route, mount } from "navi";
import { Router, View } from "react-navi";

function App() {
  const routes = mount({
    "/": route({ view: <HomePage /> }),
    "/todo/create": route({ view: <CreateTodo /> }),
    "/todo/:id": route((req) => {
      return { view: <TodoPage id={req.params.id} /> };
    }),
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todoList: [],
  });

  // const [todoList, getTodos] = useResource(() => ({
  //   url: "/todoList",
  //   method: "get",
  // }));

  // useEffect(getTodos, []);

  // useEffect(() => {
  //   if (todoList && todoList.data && todoList.isLoading === false) {
  //     dispatch({ type: "FETCH_TODOS", todoList: todoList.data.reverse() });
  //   }
  // }, [todoList]);

  return (
    <div>
      <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router routes={routes}>
          <div style={{ padding: 8 }}>
            <UserBar />
            <View />
          </div>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;

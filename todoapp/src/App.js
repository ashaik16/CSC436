import { mount, route } from "navi";
import React, { useReducer } from "react";
import { Router, View } from "react-navi";
import { StateContext } from "./Contexts";
import TodoPage from "./pages/TodoPage";
import UserListPage from "./pages/UserListPage";
import UserPage from "./pages/UserPage";
//import * as myConstClass from "./Todo/DummyTodoList";
import appReducer from "./Reducer";
import CreateTodo from "./Todo/CreateTodo";
import UserBar from "./User/UserBar";
import SuccessMessagePage from "./pages/SuccessMessagePage.js";
import TodoList from "./Todo/TodoList";
function App() {
  const [state, dispatch] = useReducer(appReducer, {
    // user: "",
    user: {},
    todoList: [],
    userList: [],
  });
  const routes = mount({
    "/": route({ view: <UserBar /> }),
    "/users": route({ view: <UserListPage /> }),
    "/todoList/create": route({ view: <CreateTodo /> }),
    // "/todoList": route({ view: <TodoList todoList={state.todoList} /> }),
    "/todoList/:id": route((req) => {
      return { view: <TodoPage id={req.params.id} /> };
    }),
    "/success/:title/:message": route((req) => {
      return {
        view: (
          <SuccessMessagePage
            title={req.params.title}
            message={req.params.message}
          />
        ),
      };
    }),
    "/users/:id": route((req) => {
      return { view: <UserPage id={req.params.id} /> };
    }),
  });

  return (
    <div>
      <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router routes={routes}>
          {/* <div style={{ padding: 8 }}> */}
          {/* <Container> */}
          {/* <UserBar /> */}
          <View />
          {/* </Container> */}
          {/* </div> */}
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;

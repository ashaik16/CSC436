import { mount, route } from "navi";
import React, { useReducer } from "react";
import { Router, View } from "react-navi";
import { StateContext } from "./Contexts";
import TodoPage from "./pages/TodoPage";
//import * as myConstClass from "./Todo/DummyTodoList";
import appReducer from "./Reducer";
import CreateTodo from "./Todo/CreateTodo";
import UserBar from "./User/UserBar";

function App() {
  const routes = mount({
    "/": route({ view: <UserBar /> }),
    "/todo/create": route({ view: <CreateTodo /> }),
    "/todo/:id": route((req) => {
      return { view: <TodoPage id={req.params.id} /> };
    }),
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todoList: [],
  });

  return (
    <div style={{ backgroundColor: "#85C1E9" }}>
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

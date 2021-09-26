import React, { useState } from "react";
import Logout from "./Logout";
import CreateTodo from "../Todo/CreateTodo";
import TodoList from "../Todo/TodoList";
import * as myConstClass from "../Todo/DummyTodoList";

export default function UserBar(props) {
  const [todoList, setTodoList] = useState(myConstClass.dummyTodoList);

  function onSubmitHandler(createdTodoObject) {
    setTodoList((previousTodoList) => {
      return [createdTodoObject, ...previousTodoList];
    });
  }

  function onLogOutHandler(isUserLoggingOut) {
    props.onLogOut(isUserLoggingOut);
  }

  if (props.userName.trim().length !== 0) {
    return (
      <div>
        <Logout userName={props.userName} onLogOut={onLogOutHandler} />
        <hr />
        <CreateTodo userName={props.userName} onSubmit={onSubmitHandler} />
        <hr />
        <TodoList todoList={todoList} />
      </div>
    );
  } else {
    return <></>;
  }
}

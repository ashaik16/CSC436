import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import Todo from "./Todo";

// export default function TodoList({ todoList, dispatch }) {

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { todoList } = state;

  return (
    <div>
      <h2>
        <u>Todo List</u>
      </h2>
      <ul>
        {todoList.map((todoItem, i) => (
          <ol key={+i}>
            <Todo
              title={todoItem.title}
              description={todoItem.description}
              dateCreated={todoItem.dateCreated}
              id={todoItem.id}
              completed={todoItem.completed}
              dateCompleted={todoItem.dateCompleted}
              short={true}
            />
          </ol>
        ))}
      </ul>
    </div>
  );
}

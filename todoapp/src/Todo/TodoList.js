import React, { useContext } from "react";
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
        {todoList.map((todoItem) => (
          <ol key={todoItem.id}>
            <Todo
              title={todoItem.title}
              description={todoItem.description}
              dateCreated={todoItem.dateCreated}
              id={todoItem.id}
              completed={todoItem.completed}
              dateCompleted={todoItem.dateCompleted}
              // dispatch={dispatch}
            />
          </ol>
        ))}
      </ul>
    </div>
  );
}

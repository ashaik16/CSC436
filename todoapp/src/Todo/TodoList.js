import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList = [], dispatchTodo }) {
  function onDeleteHandler(id) {
    dispatchTodo({ type: "DELETE_TODO", id });
  }

  return (
    <div>
      <h2>
        <u>Todo List</u>
      </h2>
      <ul>
        {todoList.map((todoItem) => (
          <li>
            <Todo
              key={todoItem.id}
              title={todoItem.title}
              description={todoItem.description}
              dateCreated={todoItem.dateCreated}
              id={todoItem.id}
              onDeleteHandler={onDeleteHandler}
            />
            <button type="button" onClick={() => onDeleteHandler(todoItem.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

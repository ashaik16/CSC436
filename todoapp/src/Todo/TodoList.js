import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList = [] }) {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.map((todoItem) => (
        <Todo
          key={todoItem.id}
          title={todoItem.title}
          description={todoItem.description}
          dateCreated={todoItem.dateCreated}
        />
      ))}
    </div>
  );
}

import React from "react";
import Todo from "./Todo_Backups";

export default function TodoList({ todoList = [] }) {
  return (
    <div>
      <h2>
        <u>Todo List</u>
      </h2>

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

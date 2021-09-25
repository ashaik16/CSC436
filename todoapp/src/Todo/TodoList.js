import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList = [] }) {
  return (
    <div>
      {todoList.map((p) => (
        <Todo key={Math.random()} {...p} />
      ))}
    </div>
  );
}

import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, dispatchTodo }) {
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
              dispatchTodo={dispatchTodo}
            />
          </ol>
        ))}
      </ul>
    </div>
  );
}

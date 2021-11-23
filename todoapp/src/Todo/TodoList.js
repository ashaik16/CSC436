import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import Todo from "./Todo";

// export default function TodoList({ todoList, dispatch }) {

export default function TodoList(props) {
  // const { state } = useContext(StateContext);
  // const { todoList } = state;
  const todoList = props.todoList;

  return (
    <div>
      <h2>
        <u>Todo List</u>
      </h2>
      <ul>
        {todoList &&
          props.todoList.todoList.map((todoItem, i) => (
            <ol key={"Todo" + i}>
              <Todo
                title={todoItem.title}
                author={todoItem.author}
                authorId={todoItem.authorId}
                description={todoItem.description}
                dateCreated={todoItem.dateCreated}
                id={todoItem._id}
                // completed={todoItem.completed}
                dateCompleted={todoItem.dateCompleted}
                {...todoItem}
                short={true}
              />
            </ol>
          ))}
        {todoList && todoList.length === 0 && "User does not have any task"}
      </ul>
    </div>
  );
}

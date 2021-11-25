import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import Todo from "./Todo";
import { Card } from "react-bootstrap";
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
        <br />

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
        {
          todoList && todoList.todoList.length === 0 && (
            <Card>
              <Card.Body style={{ backgroundColor: "#1E90FF" }}>
                User does not have any task
              </Card.Body>
            </Card>
          )
          //  "User does not have any task"
        }
      </ul>
    </div>
  );
}

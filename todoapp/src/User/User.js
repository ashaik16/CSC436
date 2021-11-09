import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigation } from "react-navi";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";
import { Form } from "react-bootstrap";
import TodoList from "../Todo/TodoList";
export default function User(props) {
  const id = props.id;
  const username = props.username;
  const short = props.short;
  const { dispatch, state } = useContext(StateContext);
  const selectedUserTodoList = [];
  let { todoList } = state;
  //   const selectedUserTodoList = todoList.filter((todos) => {
  //     todos.author === username;
  //     console.log(todos);
  //   });
  //   todoList.forEach((element, i) => {
  //     if (element.author === username) {
  //       selectedUserTodoList.push(<li key={element + i}>{element}</li>);
  //     }
  //   });

  //   todoList = selectedUserTodoList;
  return (
    <div>
      {/* <div style={{ marginLeft: "-54px" }}> */}
      <Card style={{ backgroundColor: "#D6EAF8" }}>
        <Card.Body>
          <Card.Header as="h5" style={{ backgroundColor: "#85C1E9" }}>
            {" "}
            <Link href={`/users/${id}`}>{username}</Link>
          </Card.Header>
          <Card.Title dark></Card.Title>
          <Card.Subtitle>
            <div>{`User Id: ${id}`}</div>
          </Card.Subtitle>
          &nbsp; &nbsp;
          {short && <Link href={`/users/${id}`}>View User Profile</Link>}
          <br />
        </Card.Body>
      </Card>
      {!short && (
        <TodoList
          todoList={todoList.filter((todos) => todos.author === username)}
        />
      )}
    </div>
  );
}

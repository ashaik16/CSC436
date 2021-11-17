import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";
import { useNavigation } from "react-navi";
import { Container } from "react-bootstrap";
export default function CreateTodo() {
  const navigation = useNavigation();
  const { dispatch, state } = useContext(StateContext);
  const { user } = state;
  const [createTodoObject, setCreateTodoObject] = useState({
    title: "",
    author: user.username,
    description: "",
    dateCreated: new Date().toLocaleDateString(),
    completed: false,
    dateCompleted: "",
  });

  const [todo, createTodos] = useResource(({ createTodoObject }) => ({
    url: "/todoList",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    data: {
      title: createTodoObject.title,
      author: createTodoObject.author,
      authorId: createTodoObject.authorId,
      description: createTodoObject.description,
      dateCreated: createTodoObject.dateCreated,
      completed: createTodoObject.completed,
      dateCompleted: createTodoObject.dateCompleted,
    },
  }));

  function handleOnSubmit(event) {
    event.preventDefault();
    createTodos({ createTodoObject });
    setCreateTodoObject({
      title: "",
      author: user.username,
      description: "",
      dateCreated: new Date().toLocaleDateString(),
      completed: false,
      dateCompleted: "",
    });
  }
  useEffect(() => {
    if (todo && todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        id: todo.data.id,
        title: todo.data.title,
        author: todo.data.author,
        authorId: todo.data.authorId,
        description: todo.data.description,
        dateCreated: todo.data.dateCreated,
        completed: todo.data.completed,
        dateCompleted: todo.data.dateCompleted,
      });
      navigation.navigate(`/todoList/${todo.data.id}`);
    }
  }, [todo]);

  return (
    <div style={{ alignItems: "center" }}>
      <form onSubmit={handleOnSubmit}>
        <div>
          <h2>
            <u>Create Todo Task</u>
          </h2>
        </div>
        <div>
          <label htmlFor="title">
            <b> Title: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(event) => {
              setCreateTodoObject({
                ...createTodoObject,
                title: event.target.value,
              });
            }}
            value={createTodoObject.title}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="description">
            <b>Description: </b>
          </label>
          <textarea
            name="description"
            id="description"
            onChange={(event) => {
              setCreateTodoObject({
                ...createTodoObject,
                description: event.target.value,
              });
            }}
            value={createTodoObject.description}
          />
        </div>
        <br />
        <div>
          <input type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
}

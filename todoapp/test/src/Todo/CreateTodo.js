import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";

export default function CreateTodo() {
  const [createTodoObject, setCreateTodoObject] = useState({
    title: "",
    description: "",
    dateCreated: new Date().toLocaleDateString(),
    completed: false,
    dateCompleted: "",
  });

  const [todo, createTodos] = useResource(({ createTodoObject }) => ({
    url: "/todoList",
    method: "post",
    data: {
      title: createTodoObject.title,
      description: createTodoObject.description,
      dateCreated: createTodoObject.dateCreated,
      completed: createTodoObject.completed,
      dateCompleted: createTodoObject.dateCompleted,
    },
  }));
  const { dispatch } = useContext(StateContext);
  function handleOnSubmit(event) {
    event.preventDefault();
    createTodos({ createTodoObject });
  }
  useEffect(() => {
    if (todo && todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        id: todo.data.id,
        title: todo.data.title,
        description: todo.data.description,
        dateCreated: todo.data.dateCreated,
        completed: todo.data.completed,
        dateCompleted: todo.data.dateCompleted,
      });
    }
  }, [todo]);

  return (
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
  );
}

import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";
// export default function CreateTodo({ dispatch }) {
export default function CreateTodo() {
  const [createTodoObject, setCreateTodoObject] = useState({
    id: Math.random(),
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
      id: createTodoObject.id.toString(),
      title: createTodoObject.title,
      description: createTodoObject.description,
      dateCreated: createTodoObject.dateCreated,
      completed: createTodoObject.completed,
      dateCompleted: createTodoObject.dateCompleted,
    },
  }));

  function handleOnSubmit(event) {
    event.preventDefault();
    createTodos({ createTodoObject });
    dispatch({
      type: "CREATE_TODO",
      id: createTodoObject.id,
      title: createTodoObject.title,
      description: createTodoObject.description,
      dateCreated: createTodoObject.dateCreated,
      completed: createTodoObject.completed,
      dateCompleted: createTodoObject.dateCompleted,
    });
  }
  const { dispatch } = useContext(StateContext);

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

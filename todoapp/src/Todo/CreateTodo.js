import React, { useState } from "react";

export default function CreateTodo({ dispatchTodo }) {
  const [createTodoObject, setCreateTodoObject] = useState({
    title: "",
    description: "",
    completed: false,
    dateCompleted: "",
  });
  function handleOnSubmit(event) {
    event.preventDefault();
    dispatchTodo({
      type: "CREATE_TODO",
      title: createTodoObject.title,
      description: createTodoObject.description,
      completed: createTodoObject.completed,
      dateCompleted: createTodoObject.dateCompleted,
    });
  }

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

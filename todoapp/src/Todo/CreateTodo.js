import React, { useState } from "react";

export default function CreateTodo(props) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  function handleOnSubmit(event) {
    event.preventDefault();
    const createTodoJson = {
      title: title,
      description: description,
      dateCreated: new Date().toLocaleDateString(),
      id: Math.random(),
    };

    console.log(createTodoJson);
    props.onSubmit(createTodoJson);
  }
  function titleHandler(event) {
    setTitle(event.target.value);
  }
  function descriptionHandler(event) {
    setDescription(event.target.value);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <h2>Create User</h2>
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={titleHandler}
          value={title}
          required
        />
      </div>

      <textarea
        name="description"
        id="description"
        onChange={descriptionHandler}
        value={description}
      />
      <input type="submit" value="Create" />
    </form>
  );
}

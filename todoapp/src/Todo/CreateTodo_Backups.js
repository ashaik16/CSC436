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
    setTitle("");
    setDescription("");
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
          onChange={titleHandler}
          value={title}
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
          onChange={descriptionHandler}
          value={description}
        />
      </div>
      <br />
      <div>
        <input type="submit" value="Create" />
      </div>
    </form>
  );
}

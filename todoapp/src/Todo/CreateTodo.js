import React, { useState } from "react";
export default function CreateTodo({ user }) {
  const [dateCreated, setDateCreated] = useState(new Date());
  function handleCreatedTodo() {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    setDateCreated(`${date} ${time}`);
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" required />
      </div>
      <div>
        <label htmlFor="dateCreated">Title:</label>
        <input
          type="date"
          name="dateCreated"
          id="dateCreated"
          onChange={handleCreatedTodo}
          value={dateCreated}
          disabled={true}
        />
      </div>
      <textarea name="description" id="description" />
      <input type="submit" value="Create" />
    </form>
  );
}

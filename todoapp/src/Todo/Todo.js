import React, { useState } from "react";

export default function Todo(props) {
  const title = props.title;
  const description = props.description;
  const dateCreated = props.dateCreated;
  const isCompleted = props.completed;
  const dateCompleted = props.dateCompleted;

  function onDeleteHandler(id) {
    props.dispatchTodo({ type: "DELETE_TODO", id });
  }
  function onCompleteHandler(id) {
    props.dispatchTodo({ type: "TOGGLE_TODO", id });
  }
  return (
    <div>
      <h3>{`Title: ${title}`}</h3>
      <div>{`Description: ${description}`}</div>
      <div>{`Date Created: ${dateCreated}`}</div>

      <div>
        {isCompleted && <label> Status :</label>}
        <label htmlFor="completed"> Task Completed</label>

        <input
          type="checkbox"
          id="completed"
          name="completed"
          onClick={() => onCompleteHandler(props.id)}
          value={isCompleted}
        />
      </div>

      <div>
        {isCompleted && (
          <div>
            <label> Completed On :</label>
            <input
              type="text"
              name="dateCreated"
              id="dateCreated"
              value={dateCompleted}
              disabled={true}
            />
          </div>
        )}
      </div>
      <div>
        {" "}
        <button type="button" onClick={() => onDeleteHandler(props.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

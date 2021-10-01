import React, { useState } from "react";

export default function Todo(props) {
  const [isCompleted, setIsCompleted] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const title = props.title;
  const description = props.description;
  const dateCreated = props.dateCreated;
  function handleCompletedTodo() {
    if (!isCompleted) {
      setIsCompleted(true);
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      setDateCompleted(`${date} ${time}`);
    } else setIsCompleted(false);
  }
  //   function deleteTodoHandler(id) {
  //     props.onDeleteHandler(id);
  //   }
  return (
    <div>
      <h3>{`Title: ${title}`}</h3>
      <div>{`Description: ${description}`}</div>
      <div>{`Date Created: ${dateCreated}`}</div>

      <div>
        {isCompleted && <label> Status :</label>}
        <label htmlFor="completed"> Task Completed</label>
        {!isCompleted && (
          <input
            type="checkbox"
            id="completed"
            name="completed"
            onChange={handleCompletedTodo}
            value={isCompleted}
          />
        )}
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
      {/* <div>
        {" "}
        <button type="button" onClick={() => deleteTodoHandler(props.key)}>
          Delete
        </button>
      </div> */}
    </div>
  );
}

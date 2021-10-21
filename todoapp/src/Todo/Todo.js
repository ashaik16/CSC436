import React from "react";
import { useContext, useEffect } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";

export default function Todo(props) {
  const title = props.title;
  const description = props.description;
  const dateCreated = props.dateCreated;
  const isCompleted = props.completed;
  const dateCompleted = props.dateCompleted;
  const id = props.id;

  const { dispatch } = useContext(StateContext);

  const [todo, deleteTodos] = useResource((id) => ({
    url: "/todoList/" + id,
    method: "delete",
  }));
  useEffect(() => {
    if (todo && todo.data) {
      dispatch({ type: "DELETE_TODO", id });
    }
  }, [todo]);
  function onDeleteHandler(id) {
    //dispatch({ type: "DELETE_TODO", id });
    deleteTodos(id);
  }
  function onCompleteHandler(id) {
    dispatch({ type: "TOGGLE_TODO", id });
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
          onClick={() => onCompleteHandler(id)}
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
        <button type="button" onClick={() => onDeleteHandler(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

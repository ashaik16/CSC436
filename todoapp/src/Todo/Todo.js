import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";

export default function Todo(props) {
  const title = props.title;
  const description = props.description;
  const dateCreated = props.dateCreated;
  const completed = props.completed;
  const dateCompleted = props.dateCompleted;
  const id = props.id;
  const { dispatch } = useContext(StateContext);

  const [deleteData, deleteTodoFunction] = useResource((id) => ({
    url: "/todoList/" + id,
    method: "delete",
  }));
  useEffect(() => {
    if (deleteData && deleteData.data) {
      dispatch({ type: "DELETE_TODO", id });
    }
  }, [deleteData]);

  function onDeleteHandler(id) {
    deleteTodoFunction(id);
  }

  const [toggleData, toggleTodoFunction] = useResource((id) => ({
    url: "/todoList/" + id,
    method: "patch",
    data: { dateCompleted: dateCompleted, completed: completed },
  }));
  function onCompleteHandler(check) {
    toggleTodoFunction(id);
  }

  useEffect(() => {
    if (toggleData && toggleData.data && toggleData.isLoading === false) {
      dispatch({
        type: "TOGGLE_TODO",
        id: toggleData.data.id,
        completed: toggleData.data.completed,
        dateCompleted: toggleData.data.dateCompleted,
      });
    }
  }, [toggleData]);
  return (
    <div>
      <h3>{`Title: ${title}`}</h3>
      <div>{`Description: ${description}`}</div>
      <div>{`Date Created: ${dateCreated}`}</div>

      <div>
        {completed && <label> Status :</label>}
        <label htmlFor="completed"> Task Completed</label>

        <input
          type="checkbox"
          id="completed"
          name="completed"
          onClick={() => onCompleteHandler(completed)}
          value={completed}
        />
      </div>

      <div>
        {completed && (
          <div>
            <label> Completed On :</label>
            <input
              type="text"
              name="dateCompleted"
              id="dateCompleted"
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

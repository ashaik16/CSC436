import React from "react";
import { useContext, useEffect, useState } from "react";
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

  const [toggleData, toggleTodoFunction] = useResource(
    (id, updatedComplete, updateDateCompleted) => ({
      url: "/todoList/" + id,
      method: "patch",
      data: {
        completed: updatedComplete,
        dateCompleted: updateDateCompleted,
      },
    })
  );

  function onCompleteHandler() {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const updatedComplete = !completed;
    var updateDateCompleted = date + " " + time;
    if (!updatedComplete) updateDateCompleted = "";

    toggleTodoFunction(id, updatedComplete, updateDateCompleted);
  }

  useEffect(() => {
    if (toggleData && toggleData.isLoading === false && toggleData.data) {
      dispatch({
        type: "TOGGLE_TODO",
        id,
        dateCompleted: toggleData.data.dateCompleted,
        completed: toggleData.data.completed,
      });
    }
  }, [toggleData]);

  const [deleteData, deleteTodoFunction] = useResource((id) => ({
    url: "/todoList/" + id,
    method: "delete",
  }));

  function onDeleteHandler() {
    deleteTodoFunction(id);
  }
  useEffect(() => {
    if (deleteData && deleteData.data && deleteData.isLoading === false) {
      dispatch({ type: "DELETE_TODO", id });
    }
  }, [deleteData]);
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
          value={completed}
          onClick={onCompleteHandler}
          checked={false}
        />
      </div>

      <div>
        {completed && (
          <div>
            <label htmlFor="dateCompleted"> Completed On :</label>
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
        <button type="button" onClick={onDeleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
}

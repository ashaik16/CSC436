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

  const [toggleData, toggleTodoFunction] = useResource((id) => ({
    url: "/todoList/" + id,
    method: "patch",
    data: { dateCompleted: dateCompleted, completed: completed },
  }));

  console.log(toggleData);
  // console.log(toggleTodoFunction);

  function onCompleteHandler(id) {
    toggleTodoFunction(id);
  }

  useEffect(() => {
    if (
      toggleData.data.completed === true &&
      toggleData.isLoading === false &&
      toggleData.data
    ) {
      dispatch({
        type: "TOGGLE_TODO",
        id,
        dateCompleted: toggleData.data.dateCompleted,
        completed: toggleData.data.completed,
      });
      console.log("toggle useEffect");
    }
  }, [toggleData]);

  // const [deleteData, deleteTodoFunction] = useResource((id) => ({
  //   url: "/todoList/" + id,
  //   method: "delete",
  // }));

  function onDeleteHandler(id) {
    // deleteTodoFunction(id);
  }
  // useEffect(() => {
  //   if (deleteData && deleteData.isLoading === false && deleteData.data) {
  //     dispatch({ type: "DELETE_TODO", id });
  //     console.log("delete useEffect");
  //   }
  // }, [deleteData]);
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
          onClick={() => onCompleteHandler(id)}
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

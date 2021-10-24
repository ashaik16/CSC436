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
  // const { completeObject, setCompleteObject } = useState({
  //   completed: false,
  //   dateCompleted: "",
  // });

  // const completed = props.completeObject.completed;
  // const dateCompleted = props.completeObject.dateCompleted;
  const id = props.id;
  const { dispatch } = useContext(StateContext);

  const [toggleData, toggleTodoFunction] = useResource((id) => ({
    url: "/todoList/" + id,
    method: "patch",
    data: {
      completed: completed,
      dateCompleted: dateCompleted,
    },
  }));

  console.log(toggleData);

  function onCompleteHandler() {
    toggleTodoFunction(id);
  }

  useEffect(() => {
    if (toggleData && toggleData.isLoading === false && toggleData.data) {
      console.log("toggle useEffect");
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
    //  dispatch({ type: "DELETE_TODO", id });
  }
  useEffect(() => {
    console.log("delete useEffect");
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
          //defaultChecked={props.completed}
          // onChange={() => onCompleteHandler(props.id)}
          //defaultChecked={completed}
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

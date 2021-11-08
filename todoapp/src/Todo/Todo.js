import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigation } from "react-navi";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";
import { Form } from "react-bootstrap";
export default function Todo(props) {
  const navigation = useNavigation();
  const title = props.title;
  const author = props.author;
  const description = props.description;
  const dateCreated = props.dateCreated;
  const completed = props.completed;
  const dateCompleted = props.dateCompleted;

  const id = props.id;
  const short = props.short;
  const { dispatch } = useContext(StateContext);

  let processedContent = description;
  if (short) {
    if (description.length > 30) {
      processedContent = description.substring(0, 30) + "...";
    }
  }
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
      navigation.navigate("/");
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
      navigation.navigate("/");
    }
  }, [deleteData]);
  return (
    // <div style={{ marginLeft: "-54px" }}>
    <Card style={{ backgroundColor: "#D6EAF8" }}>
      <Card.Body>
        <Card.Header as="h5" style={{ backgroundColor: "#85C1E9" }}>
          {" "}
          <Link href={`/todo/${id}`}>{title}</Link>
        </Card.Header>
        <Card.Title dark></Card.Title>
        <Card.Subtitle>
          <div>{`Author: ${author}`}</div>
        </Card.Subtitle>
        <Card.Subtitle>
          <div>{`Date Created: ${dateCreated}`}</div>
        </Card.Subtitle>
        <Card.Subtitle>
          <div>{`Description: ${processedContent}`}</div>
        </Card.Subtitle>
        <Card.Subtitle>Status:</Card.Subtitle>
        <div>
          <Form.Check
            type="checkbox"
            label="Task Completed"
            id="completed"
            name="completed"
            value={completed}
            onClick={onCompleteHandler}
            defaultChecked={false}
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
        <br />
        <Button
          variant="outline-danger"
          // onClick={(e) => {
          //   deletePost(id);
          // }}

          onClick={onDeleteHandler}
        >
          Delete Todo
        </Button>
        &nbsp; &nbsp;
        {short && <Link href={`/todo/${id}`}>View full todo</Link>}
        <br />
      </Card.Body>
    </Card>
    // </div>
    // <div>
    //   <hr />
    //   <Link href={`/todo/${id}`}>{title}</Link>

    //   <div>{`Description: ${processedContent}`}</div>
    //   <div>{`Date Created: ${dateCreated}`}</div>

    //   <div>
    //     {completed && <label> Status :</label>}
    //     <label htmlFor="completed"> Task Completed</label>

    //     <input
    //       type="checkbox"
    //       id="completed"
    //       name="completed"
    //       value={completed}
    //       onClick={onCompleteHandler}
    //       defaultChecked={false}
    //     />
    //   </div>

    //   <div>
    //     {completed && (
    //       <div>
    //         <label htmlFor="dateCompleted"> Completed On :</label>
    //         <input
    //           type="text"
    //           name="dateCompleted"
    //           id="dateCompleted"
    //           value={dateCompleted}
    //           disabled={true}
    //         />
    //       </div>
    //     )}
    //   </div>
    //   <div>
    //     {" "}
    //     <button type="button" onClick={onDeleteHandler}>
    //       Delete
    //     </button>
    //     <br />
    //     {short && <Link href={`/todo/${id}`}>View full post</Link>}
    //   </div>
    // </div>
  );
}

import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigation } from "react-navi";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
export default function Todo(props) {
  const navigation = useNavigation();
  const title = props.title;
  const author = props.author;
  const authorId = props.authorId;
  const description = props.description;
  const dateCreated = props.dateCreated;
  const completed = props.completed == "true" ? true : false;
  const dateCompleted = props.dateCompleted;
  const [toggleCompleteTodoFailed, setToggleCompleteTodoFailed] =
    useState(false);
  const [deleteTodoFailed, setDeleteTodoFailed] = useState(false);
  const [status, setStatus] = useState("");
  const id = props._id;
  const short = props.short;
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
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
      headers: { Authorization: `${state.user.access_token}` },
      //headers: { Authorization: `${"gibberish"}` },
      data: {
        completed: updatedComplete,
        dateCompleted: updateDateCompleted,
      },
    })
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function onCompleteHandler() {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const updatedComplete = !completed;
    var updateDateCompleted = date + " " + time;
    if (!updatedComplete) updateDateCompleted = "";
    console.log("Inside onCompleteHandler" + updatedComplete + title);
    toggleTodoFunction(id, updatedComplete, updateDateCompleted);
  }

  useEffect(() => {
    if (
      toggleData &&
      toggleData.isLoading === false &&
      (toggleData.data || toggleData.error)
    ) {
      if (toggleData.error) {
        setToggleCompleteTodoFailed(true);
        if (toggleData.error.code === 401)
          setStatus("Unauthorized to toggle the particular todo");
      } else {
        dispatch({
          type: "TOGGLE_TODO",
          id,
          dateCompleted: toggleData.data.dateCompleted,
          completed: toggleData.data.completed,
        });
        console.log("Inside toggle todo" + completed + title);
        if (!completed) {
          const message = "task completed suceessfully.";
          navigation.navigate("/success/" + title + "/" + message + "/");
        } else {
          const message = "task updated to incomplete status.";
          navigation.navigate("/success/" + title + "/" + message + "/");
        }
      }
    }
  }, [toggleData]);

  const [deleteData, deleteTodoFunction] = useResource((id) => ({
    url: "/todoList/" + id,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
    //headers: { Authorization: `${"gibberish"}` },
  }));

  function onDeleteHandler() {
    setShowDeleteModal(true);

    // deleteTodoFunction(id);
  }
  useEffect(() => {
    if (
      deleteData &&
      deleteData.isLoading === false &&
      (deleteData.data || deleteData.error)
    ) {
      if (deleteData.error) {
        setDeleteTodoFailed(true);
        if (deleteData.error.code === 401)
          setStatus("Unauthorized to delete the particular todo");
      } else {
        dispatch({ type: "DELETE_TODO", id });
        const message = "task deleted sucesssfully.";
        navigation.navigate("/success/" + title + "/" + message + "/");
      }
    }
  }, [deleteData]);
  function handleClose() {
    setShowDeleteModal(false);
  }
  function modalDeleteHandler(event) {
    event.preventDefault();
    deleteTodoFunction(id);

    handleClose();
    // navigation.navigate("/delete/" + title);
    // if (!deleteTodoFailed) {
    //   const message = "task deleted sucesssfully.";
    //   navigation.navigate("/success/" + title + "/" + message + "/");
    // }
  }

  return (
    // <div style={{ marginLeft: "-54px" }}>
    <div>
      <Card style={{ backgroundColor: "#D6EAF8" }}>
        <Card.Body>
          <Card.Header as="h5" style={{ backgroundColor: "#85C1E9" }}>
            {" "}
            <Link href={`/todoList/${id}`}>{title}</Link>
          </Card.Header>
          <Card.Title dark></Card.Title>
          <Card.Subtitle>
            <div>{`Author: ${author}`}</div>
          </Card.Subtitle>
          <Card.Subtitle>
            <div>{`Author-Id: ${authorId}`}</div>
          </Card.Subtitle>
          <Card.Subtitle>
            <div>{`Date Created: ${dateCreated}`}</div>
          </Card.Subtitle>
          <Card.Subtitle>
            <div>{`Description: ${processedContent}`}</div>
          </Card.Subtitle>
          <Card.Subtitle>Status:</Card.Subtitle>
          {user.username == author && (
            <div>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Task Completed"
                  id="completed"
                  name="completed"
                  defaultChecked={completed}
                  value={completed}
                  onClick={onCompleteHandler}
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
              <Button variant="outline-danger" onClick={onDeleteHandler}>
                Delete Todo
              </Button>
              &nbsp; &nbsp;
              {short && <Link href={`/todoList/${id}`}>View full todo</Link>}
              <br />
            </div>
          )}
          {(toggleCompleteTodoFailed || deleteTodoFailed) && (
            <Form.Text style={{ color: "red" }}>{status}</Form.Text>
          )}
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={handleClose}>
        <Form onSubmit={modalDeleteHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="delete-user">
              Are you sure you want to delete?
            </Form.Label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Yes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

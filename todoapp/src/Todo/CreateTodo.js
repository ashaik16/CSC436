import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";
import { useNavigation } from "react-navi";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-navi";
export default function CreateTodo() {
  const navigation = useNavigation();
  const { dispatch, state } = useContext(StateContext);
  const { user } = state;
  const [createTodoFailed, setCreateTodoFailed] = useState(false);
  const [status, setStatus] = useState("");
  const [createTodoObject, setCreateTodoObject] = useState({
    title: "",
    author: user.username,
    description: "",
    dateCreated: new Date().toLocaleDateString(),
    completed: false,
    dateCompleted: "",
  });

  const [todo, createTodos] = useResource(({ createTodoObject }) => ({
    url: "/todoList",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    //headers: { Authorization: `${"gibberish"}` },
    data: {
      title: createTodoObject.title,
      author: createTodoObject.author,
      authorId: createTodoObject.authorId,
      description: createTodoObject.description,
      dateCreated: createTodoObject.dateCreated,
      completed: createTodoObject.completed,
      dateCompleted: createTodoObject.dateCompleted,
    },
  }));

  function handleOnSubmit(event) {
    event.preventDefault();
    createTodos({ createTodoObject });
    setCreateTodoObject({
      title: "",
      author: user.username,
      description: "",
      dateCreated: new Date().toLocaleDateString(),
      completed: false,
      dateCompleted: "",
    });
  }
  useEffect(() => {
    if (todo && todo.isLoading === false && (todo.data || todo.error)) {
      if (todo.error) {
        setCreateTodoFailed(true);
        if (todo.error.code === 401)
          setStatus("Unauthorized to create the particular todo");
      } else {
        dispatch({
          type: "CREATE_TODO",
          id: todo.data.id,
          title: todo.data.title,
          author: todo.data.author,
          authorId: todo.data.authorId,
          description: todo.data.description,
          dateCreated: todo.data.dateCreated,
          completed: todo.data.completed,
          dateCompleted: todo.data.dateCompleted,
        });
        navigation.navigate(`/todoList/${todo.data.id}`);
      }
    }
  }, [todo]);

  return (
    <div style={{ alignItems: "center" }}>
      <form onSubmit={handleOnSubmit}>
        <div>
          <h2>
            <u>Create Todo Task</u>
          </h2>
        </div>
        <div>
          <label htmlFor="title">
            <b> Title: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(event) => {
              setCreateTodoObject({
                ...createTodoObject,
                title: event.target.value,
              });
            }}
            value={createTodoObject.title}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="description">
            <b>Description: </b>
          </label>
          <textarea
            name="description"
            id="description"
            onChange={(event) => {
              setCreateTodoObject({
                ...createTodoObject,
                description: event.target.value,
              });
            }}
            value={createTodoObject.description}
          />
        </div>
        <br />
        <div>
          <input type="submit" value="Create" />
          <br />
          {createTodoFailed && (
            <Form.Text style={{ color: "red" }}>{status}</Form.Text>
          )}
        </div>
        <br />
        <Link href="/">Go back</Link>
      </form>
    </div>
  );
}

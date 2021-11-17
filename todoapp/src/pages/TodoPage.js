import React, { useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { Link } from "react-navi";
import Todo from "../Todo/Todo";
import { StateContext } from "../Contexts";

export default function TodoPage({ id }) {
  const { state } = useContext(StateContext);
  const [todo, getTodo] = useResource(() => ({
    url: "/todoList/" + id,
    method: "get",
    headers: { Authorization: `${state.user.access_token}` },
  }));
  useEffect(getTodo, [id]);

  return (
    <div>
      {todo && todo.data ? <Todo {...todo.data} /> : "Loading..."}
      <hr />
      <div>
        <Link href="/">Go back</Link>
      </div>
    </div>
  );
}

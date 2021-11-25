import React, { useEffect, useContext } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import TodoList from "../Todo/TodoList";

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);

  const [todoList, getTodos] = useResource(() => ({
    url: "/todoList",
    method: "get",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  //useEffect(getTodos, []);
  useEffect(() => {
    getTodos();
  }, [state.user.access_token]);
  useEffect(() => {
    if (todoList && todoList.data && todoList.isLoading === false) {
      dispatch({ type: "FETCH_TODOS", todoList: todoList.data.todoList });
    }
  }, [todoList]);
  const { isLoading } = todoList;
  return (
    <>
      {isLoading && "Todo's loading..."}
      <TodoList todoList={todoList.data} />
    </>
  );
}

import React, { useEffect, useContext } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import TodoList from "../Todo/TodoList";

export default function HomePage() {
  const { dispatch } = useContext(StateContext);

  const [todoList, getTodos] = useResource(() => ({
    url: "/todoList",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todoList && todoList.data && todoList.isLoading === false) {
      dispatch({ type: "FETCH_TODOS", todoList: todoList.data.reverse() });
    }
  }, [todoList]);
  const { isLoading } = todoList;
  return (
    <>
      {isLoading && "Todo's loading..."} <TodoList />
    </>
  );
}

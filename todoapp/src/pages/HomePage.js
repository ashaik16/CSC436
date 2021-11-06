import React, { useEffect, useContext } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import TodoList from "../Todo/TodoList";

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const [posts, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));
  const [todoList, getTodos] = useResource(() => ({
    url: "/todoList",
    method: "get",
  }));
  useEffect(getPosts, []);
  useEffect(() => {
    if (posts && posts.data) {
      dispatch({ type: "FETCH_POSTS", posts: posts.data.reverse() });
    }
  }, [posts]);
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

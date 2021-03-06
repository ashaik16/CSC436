import React, { useEffect, useContext } from "react";
import { StateContext } from "../Contexts";
import { useResource } from "react-request-hook";
import UserList from "../User/UserList";
import UserBar from "../User/UserBar";
import { useNavigation } from "react-navi";
import { Link } from "react-navi";

export default function UserListPage() {
  const { dispatch } = useContext(StateContext);

  const [userList, getUsers] = useResource(() => ({
    url: "/users",
    method: "get",
  }));

  useEffect(getUsers, []);

  useEffect(() => {
    if (userList && userList.data && userList.isLoading === false) {
      dispatch({ type: "FETCH_USERS", userList: userList.data });
    }
  }, [userList]);

  const { isLoading } = userList;
  return (
    <>
      {isLoading && "User's loading..."}
      {!isLoading && userList.data && <UserList userList={userList} />}
      <Link href="/">Go back</Link>
    </>
  );
}

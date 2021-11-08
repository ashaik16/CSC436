import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import User from "./User";
export default function UserList() {
  const { state } = useContext(StateContext);
  const { userList } = state;

  return (
    <div>
      <h2>
        <u>User List</u>
      </h2>
      <ul>
        {userList.map((user, i) => (
          <ol key={+i}>
            <User id={user.id} username={user.username} />
          </ol>
        ))}
      </ul>
    </div>
  );
}

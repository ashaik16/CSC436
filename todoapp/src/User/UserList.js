import React, { useContext, useState } from "react";
import { StateContext } from "../Contexts";
import User from "./User";
export default function UserList(props) {
  const { state } = useContext(StateContext);
  //const { userList } = state;
  const userList = props.userList.data.userList;
  return (
    <div>
      <h2>
        <u>User List</u>
      </h2>
      <ul>
        {userList.map((user, i) => (
          <ol key={+i}>
            <User id={user._id} username={user.username} short={true} />
          </ol>
        ))}
      </ul>
    </div>
  );
}

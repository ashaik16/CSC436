import React, { useEffect } from "react";
import { useResource } from "react-request-hook";
import { Link } from "react-navi";
import User from "../User/User";

export default function UserPage({ id }) {
  const [user, getUser] = useResource(() => ({
    url: "/users/" + id,
    method: "get",
  }));
  useEffect(getUser, [id]);

  return (
    <div>
      {user && user.data ? <User {...user.data} /> : "Loading..."}
      <hr />
      <div>
        <Link href="/">Go back</Link>
      </div>
    </div>
  );
}

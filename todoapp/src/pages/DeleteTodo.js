import React, { useEffect } from "react";
import { useResource } from "react-request-hook";
import { Link } from "react-navi";

export default function DeleteTodo(deletedTodo) {
  return (
    <div>
      {`${"Deleted Task Name: " + deletedTodo.title}`}
      <hr />
      <div>
        <Link href="/">Go back</Link>
      </div>
    </div>
  );
}

import React, { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigation } from "react-navi";
import { useResource } from "react-request-hook";
import { StateContext } from "../Contexts";
import { Form } from "react-bootstrap";
export default function User(props) {
  const navigation = useNavigation();
  const id = props.id;
  const username = props.username;
  const { dispatch } = useContext(StateContext);

  return (
    // <div style={{ marginLeft: "-54px" }}>
    <Card style={{ backgroundColor: "#D6EAF8" }}>
      <Card.Body>
        <Card.Header as="h5" style={{ backgroundColor: "#85C1E9" }}>
          {" "}
          <Link href={`/user/${id}`}>{username}</Link>
        </Card.Header>
        <Card.Title dark></Card.Title>
        <Card.Subtitle>
          <div>{`User Id: ${id}`}</div>
        </Card.Subtitle>
        &nbsp; &nbsp;
        {<Link href={`/user/${id}`}>View User todo</Link>}
        <br />
      </Card.Body>
    </Card>
  );
}

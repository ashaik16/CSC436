import React, { useEffect } from "react";
import { useResource } from "react-request-hook";
import { Link } from "react-navi";
import { Card, Container } from "react-bootstrap";
export default function SuccessMessagePage({ title, message }) {
  return (
    <Container
      style={{
        padding: "50px",
        backgroundColor: "#85C1E9",
      }}
    >
      <hr />
      <Card>
        <Card.Header style={{ backgroundColor: "#1E90FF" }}>
          <h5>Status</h5>
        </Card.Header>
        <Card.Body style={{ backgroundColor: "#D6EAF8" }}>
          {/* <blockquote className="blockquote mb-0"> */}
          <p>{title.toUpperCase() + " " + message}</p>
          {/* </blockquote> */}
          <hr />
          <Link href="/">Go back</Link>
        </Card.Body>
      </Card>
      <hr />
    </Container>
  );
}

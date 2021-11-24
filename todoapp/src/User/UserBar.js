import { useContext, useState } from "react";
import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigation } from "react-navi";
import { StateContext } from "../Contexts";
import HomePage from "../pages/HomePage";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import "../style.css";
export default function UserBar() {
  const navigation = useNavigation();
  const { state } = useContext(StateContext);
  const { user } = state;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (user.username) {
    return (
      <Container>
        <Logout />
        <hr />
        {user.username && <Link href="/todoList/create">Create New Post</Link>}
        &nbsp;&nbsp;
        {user.username && <Link href="/users">List All Users</Link>}
        <hr />
        {/* {user && <CreateTodo />} */}
        <HomePage />
      </Container>
    );
  } else {
    return (
      <Container
        style={{
          marginLeft: "11px",
        }}
      >
        {/* <Card
              className="bg-dark text-white card-width"
              style={{ width: "75%" }}
            >
              <Card.Img
                className="card-width"
                src={process.env.PUBLIC_URL + "/MyTodoLogo.jpg"}
                alt="Card image"
              />
            </Card> */}

        <Col
          className="text-center"
          style={{ paddingTop: "10px", paddingBottom: "2px" }}
        >
          <Card style={{ width: "60%", height: "97%" }}>
            <Card.Header style={{ marginTop: "20px" }}>
              {" "}
              <h5>
                <b>
                  <i>Your Daily Planner</i>
                </b>
              </h5>
              <Image
                style={{
                  width: "55%",
                  height: "55%",
                }}
                src={process.env.PUBLIC_URL + "/Logo.png"}
              />
            </Card.Header>
            <Card.Body>
              <Card.Title> Already Have an Account?</Card.Title>

              {!user.username && (
                <div className="justify-content-end">
                  <Button variant="link" onClick={(e) => setShowLogin(true)}>
                    Login
                  </Button>
                  <Login
                    show={showLogin}
                    handleClose={() => setShowLogin(false)}
                    setShowLogin={setShowLogin}
                  />
                </div>
              )}
            </Card.Body>
            <Card.Footer className="text-muted">
              Sign Up For New User
              <br />
              <Button variant="link" onClick={(e) => setShowRegister(true)}>
                Register
              </Button>
              <Register
                show={showRegister}
                handleClose={() => setShowRegister(false)}
                setShowRegister={setShowRegister}
              />
            </Card.Footer>
          </Card>
        </Col>
        {/* {!user.username && (
          <div className="justify-content-end">
            <Button variant="link" onClick={(e) => setShowLogin(true)}>
              Login
            </Button>
            <Login
              show={showLogin}
              handleClose={() => setShowLogin(false)}
              setShowLogin={setShowLogin}
            />
            <Button variant="link" onClick={(e) => setShowRegister(true)}>
              Register
            </Button>
            <Register
              show={showRegister}
              handleClose={() => setShowRegister(false)}
              setShowRegister={setShowRegister}
            />
          </div>
        )} */}
      </Container>
    );
  }
}

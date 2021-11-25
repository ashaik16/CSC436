import { useContext, useState } from "react";
import { Button, Container, Card, CardGroup } from "react-bootstrap";
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
        <HomePage />
      </Container>
    );
  } else {
    return (
      <Container>
        <CardGroup>
          <Card style={{ backgroundColor: "#85C1E9", border: "none" }}>
            <Card.Img
              className="card-width"
              src={process.env.PUBLIC_URL + "/MyTodoLogo.jpg"}
              alt="Card image"
              style={{ width: "73%", alignSelf: "center" }}
            />
          </Card>

          <Card
            className="text-center"
            style={{
              marginLeft: "10px",
              marginTop: "30px",
              alignSelf: "center",
            }}
          >
            <Card.Header style={{ backgroundColor: "#D6EAF8" }}>
              {" "}
              <h5>
                <b>
                  <i>Your Daily Planner</i>
                </b>
              </h5>
            </Card.Header>
            <Card.Img
              variant="top"
              src={process.env.PUBLIC_URL + "/Logo.png"}
              style={{
                width: "45%",
                height: "55%",
                alignSelf: "center",
              }}
            />
            <Card.Body>
              <Card.Title>
                <h5> Already Have an Account?</h5>
              </Card.Title>

              {!user.username && (
                <div className="justify-content-end">
                  <Button variant="link" onClick={(e) => setShowLogin(true)}>
                    <h5> Login </h5>
                  </Button>
                  <Login
                    show={showLogin}
                    handleClose={() => setShowLogin(false)}
                    setShowLogin={setShowLogin}
                  />
                </div>
              )}
            </Card.Body>
            <Card.Footer
              className="text-muted"
              style={{ backgroundColor: "#D6EAF8" }}
            >
              Sign Up For New User
              <br />
              <Button variant="link" onClick={(e) => setShowRegister(true)}>
                <h5> Register </h5>
              </Button>
              <Register
                show={showRegister}
                handleClose={() => setShowRegister(false)}
                setShowRegister={setShowRegister}
              />
            </Card.Footer>
          </Card>
        </CardGroup>
      </Container>
    );
  }
}

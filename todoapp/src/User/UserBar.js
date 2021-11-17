import { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigation } from "react-navi";
import { StateContext } from "../Contexts";
import HomePage from "../pages/HomePage";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
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
      <Container>
        {!user.username && (
          // <div>
          //   <h2>
          //     <u>Login</u>
          //   </h2>

          //   <Login />
          //   <br />
          //   <hr />
          //   <h1>OR</h1>
          //   <h2>
          //     <u>Register For New User</u>
          //   </h2>

          //   <Register />
          // </div>

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
            />
          </div>
        )}
      </Container>
    );
  }
}

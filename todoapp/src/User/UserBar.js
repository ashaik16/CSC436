import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
export default function UserBar({ user, dispatchUser }) {
  if (user) {
    return <Logout user={user} dispatchUser={dispatchUser} />;
  } else {
    return (
      <div>
        {!user && (
          <div>
            <h2>
              <u>Login</u>
            </h2>
            <Login dispatchUser={dispatchUser} />
            <br />
            <hr />
            <h1>OR</h1>
            <h2>
              <u>Register For New User</u>
            </h2>
            <Register dispatchUser={dispatchUser} />
          </div>
        )}{" "}
      </div>
    );
  }
}

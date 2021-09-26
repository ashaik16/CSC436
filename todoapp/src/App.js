import Login from "./User/Login";
import { useState } from "react";
import UserBar from "./User/UserBar";
import Register from "./User/Register";

function App() {
  const [userName, setUserName] = useState("");

  function loginHandler(userCredentialDetails) {
    setUserName(userCredentialDetails.userName);
    console.log(userName);
  }

  function logOutHandler(isUserLoggedOut) {
    if (isUserLoggedOut) setUserName("");
  }

  return (
    <div>
      {!userName && (
        <div>
          <h2>Login</h2>
          <Login loginHandler={loginHandler} />
          <hr />
          <h1>OR</h1>
          <Register registrationHandler={loginHandler} />
        </div>
      )}
      <UserBar userName={userName} onLogOut={logOutHandler} />
    </div>
  );
}

export default App;

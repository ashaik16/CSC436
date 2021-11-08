import React, { useContext } from "react";

import UserBar from "../User/UserBar";
import Header from "../Header";
import ChangeTheme from "../ChangedTheme";
import { StateContext, ThemeContext } from "../Contexts";
import { Link } from "react-navi";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function HeaderBar({ setTheme }) {
  const { state } = useContext(StateContext);
  const theme = useContext(ThemeContext);

  const { user } = state;
  return (
    <>
      <Header text="My Blog" />
      <React.Suspense fallback={"Loading..."}>
        <UserBar />
      </React.Suspense>{" "}
      <br />
      <br />
      <ChangeTheme theme={theme} setTheme={setTheme} />
      {user && <Link href="/post/create">Create New Post</Link>}
      <br />
    </>
  );
}

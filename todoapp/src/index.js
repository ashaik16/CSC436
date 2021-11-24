import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { RequestProvider } from "react-request-hook";
const axiosInstance = axios.create({
  //baseURL: "http://localhost:3000/api/",
  baseURL: "/",
});

ReactDOM.render(
  <RequestProvider value={axiosInstance}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </RequestProvider>,
  document.getElementById("root")
);

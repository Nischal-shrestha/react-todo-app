import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./components/TodoList";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<TodoList />, document.getElementById("root"));
registerServiceWorker();

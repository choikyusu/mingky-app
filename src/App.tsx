import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import stores, { RootState } from "./store/configureStore";
import { todoActions } from "./store/modules/actions/todos.action";
import { useSelector } from "react-redux";

function App() {
  const aaaa = useSelector((state: RootState) => state.todos.todoItems);

  useEffect(() => {
    stores.dispatch(todoActions.create({ text: "aaaa" }));
  }, []);

  return <div className="App">{aaaa.map((item) => item.text)}</div>;
}

export default App;

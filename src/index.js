import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Here the stateProvider takes  two things the initial state amd the reducer.
// Here the Children is the APP which is wrap between the provider.

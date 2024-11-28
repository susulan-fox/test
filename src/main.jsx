import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import {createStore, applyMiddleware} from "redux"
import reducers from "../src/store/store.js"
import ReactDOM from "react-dom/client";

const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);

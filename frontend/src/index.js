import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const store = createStore(rootReducer, composeWithDevTools());
const theme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
        {/*<Router>*/}
        <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

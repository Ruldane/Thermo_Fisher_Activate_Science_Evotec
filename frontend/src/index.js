import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const store = createStore(rootReducer, composeWithDevTools());
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            // medium small
            ms: 750,
            md: 960,
            // medium large
            ml: 1050,
            lg: 1280,
            xl: 1920,
        },
    },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
        {/*<Router>*/}
        <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

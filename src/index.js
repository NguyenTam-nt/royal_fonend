import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import GlobleStyle from "./GlobleStyle";
import { Provider } from "react-redux";
import configStore from "./redux/configStore";

// const store = configStore();
const store = configStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobleStyle>
      <App />
    </GlobleStyle>
  </Provider>,

  // </React.StrictMode>,
  document.getElementById("root")
);

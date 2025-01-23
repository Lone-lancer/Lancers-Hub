import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/fontawesome.css";
import "./css/custom-animation.css";
import "./css/themify-icons.css";
import "./css/animate.css";
import "./css/style.css";
// import "./assets/scss/app.scss";

import "font-awesome/css/font-awesome.min.css";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={configureStore({})}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer />
  </Provider>
);

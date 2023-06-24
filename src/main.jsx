import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./contexts/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

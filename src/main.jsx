import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Context from "./context/index.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme accentColor="amber">
      <Context>
        <App />
      </Context>
    </Theme>
  </React.StrictMode>
);

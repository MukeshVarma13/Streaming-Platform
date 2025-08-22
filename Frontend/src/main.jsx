window.global = window;

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { UserDetailProvider } from "./context/UserDetailsContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <UserDetailProvider>
      <App />
    </UserDetailProvider>
  </BrowserRouter>
  // </StrictMode>,
);

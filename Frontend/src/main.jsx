window.global = window;

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { UserDetailProvider } from "./context/UserDetailsContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserDetailProvider>
        <App />
      </UserDetailProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </StrictMode>,
);

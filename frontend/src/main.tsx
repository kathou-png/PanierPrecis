import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/error.tsx";
import { InvoicePage } from "./Invoice/InvoicePage.tsx";
import { ItemPage } from "./Invoice/Item/ItemPage.tsx";
import { LoginPage } from "./Login/LoginPage.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/invoice",
    element: <InvoicePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/invoice/:id", // Add a leading slash to the child path
    element: <ItemPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);

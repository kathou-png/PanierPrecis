import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/error.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { ItemPage } from "./Invoice/components/Item/ItemPage.tsx";
import { LoginPage } from "./Invoice/components/Login/LoginPage.tsx";
import { InvoicePage } from "./Invoice/InvoicePage.tsx";
import { RecoilRoot } from "recoil";

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
      <RecoilRoot>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
);

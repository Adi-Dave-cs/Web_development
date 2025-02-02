import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProductPage from "./components/ProductPage/ProductPage";
import ContactPage from "./components/ContactPage/ContactPage";
import ProductDetails from "./components/ProductPage/ProductDetails";
import Animatedlanding from "./components/Animatedlanding/Animatedlanding";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Animatedlanding />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        path: "/app",
        element: <HomePage />,
      },
      {
        path: "/app/product",
        element: <ProductPage />,
      },
      {
        path: "/app/contact",
        element: <ContactPage />,
      },
      {
        path: "/app/:ProductId",
        element: <ProductDetails />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

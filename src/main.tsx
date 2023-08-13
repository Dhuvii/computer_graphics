import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import RootLayout from "./layout/RootLayout";
import DDA from "./pages/DDA";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<DDA />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

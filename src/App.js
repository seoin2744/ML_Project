import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Page1 from "./page1/Page1";
import Page2 from "./page2/Page2";
import Page3 from "./page3/Page3";
import Page4 from "./page4/Page4";
import Page5 from "./page5/Page5";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/page1",
    element: <Page1 />,
  },
  {
    path: "/page2",
    element: <Page2 />,
  },
  {
    path: "/page3",
    element: <Page3 />,
  },
  {
    path: "/page4",
    element: <Page4 />,
  },
  {
    path: "/page5",
    element: <Page5 />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Landing from "../../pages/Loading/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
    ],
  },
]);

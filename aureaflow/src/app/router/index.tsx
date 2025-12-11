import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import LandingPage from "../../pages/Loading/Landing";
import Login from "../../pages/Auth/Login";
import SignUp from "../../pages/Auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

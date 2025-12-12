import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import LandingPage from "../../pages/Loading/Landing";
import Login from "../../pages/Auth/Login";
import SignUp from "../../pages/Auth/SignUp";
import DashboardPage from "../../pages/Dashboard/Dashboard";
import ProtectedRoute from "../../features/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
        ],
      },
    ],
  },
]);

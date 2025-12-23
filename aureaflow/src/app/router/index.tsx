import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

import LandingPage from "../../pages/Loading/Landing";
import Login from "../../pages/Auth/Login";
import SignUp from "../../pages/Auth/SignUp";

import DashboardLayout from "../../pages/Dashboard/DashboardLayout";
import DashboardHome from "../../pages/Dashboard/DashboardHome";

import Transactions from "../../pages/Dashboard/sections/Transactions";
import Goals from "../../pages/Dashboard/sections/Goals";
import Incomes from "../../pages/Dashboard/sections/Incomes";

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
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              { index: true, element: <DashboardHome /> },
              { path: "transactions", element: <Transactions /> },
              { path: "goals", element: <Goals /> },
              { path: "incomes", element: <Incomes /> },
            ],
          },
        ],
      },
    ],
  },
]);

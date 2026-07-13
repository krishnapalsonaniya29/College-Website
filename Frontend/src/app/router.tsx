import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import AntiRaggingPage from "@/pages/AntiRaggingPage";
import DepartmentsPage from "@/pages/department/DepartmentsPage";
import DepartmentDetailsPage from "@/pages/department/DepartmentDetailsPage";
export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "anti-ragging",
        element: <AntiRaggingPage />,
      },
      {
        path: "departments",
        element: <DepartmentsPage />,
      },
      {
        path: "departments/:slug",
        element: <DepartmentDetailsPage />,
      }
    ],
  },
]);
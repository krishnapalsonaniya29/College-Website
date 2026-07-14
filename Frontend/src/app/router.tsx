import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import AntiRaggingPage from "@/pages/AntiRaggingPage";
import DepartmentsPage from "@/pages/department/DepartmentsPage";
import DepartmentDetailsPage from "@/pages/department/DepartmentDetailsPage";
import ProgramsPage from "@/pages/ProgramsPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import SportsPage from "@/pages/SportsPage";
import FeesPage from "@/pages/FeesPage";
import AdmissionNoticePage from "@/pages/AdmissionNoticePage";
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
      },
      {
        path: "programs",
        element: <ProgramsPage />,
      }, 
      {
        path: "coming-soon",
        element: <ComingSoonPage />,
      },
      {
        path: "sports",
        element: <SportsPage />,
      },
      {
        path: "fees",
        element: <FeesPage />,
      },
      {
        path: "admissions/notice",
        element: <AdmissionNoticePage />,
      }
    ],
  },
]);
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
import SyllabusPage from "@/pages/SyllabusPage";
import GalleryPage from "@/pages/GalleryPage";
import AlumniPage from "@/pages/AlumniPage";
import LoginPage from "@/pages/admin/LoginPage";
import DashboardLayout from "@/pages/admin/DashboardLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProtectedRoute from "@/pages/admin/ProtectedRoute";
import HeroPage from "@/pages/admin/HeroPage";
import HomeConfigPage from "@/pages/admin/HomePage";
import NewsPage from "@/pages/admin/NewsPage";
import News from "@/pages/News";
import EventPage from "@/pages/admin/EventPage";
import Events from "@/pages/Events";
import About from "@/pages/admin/About";
import Department from "@/pages/admin/Department";
import Faculty from "@/pages/admin/Faculty";
import Program from "@/pages/admin/Program";
import Subject from "@/pages/admin/Subject";
import Syllabus from "@/pages/admin/Syllabus";
import Gallery from "@/pages/admin/Gallery";
import SportsAchievementPage from "@/pages/admin/SportsAchievement";
import Alumni from "@/pages/admin/Alumni";
import StudentAchievementAdmin from "@/pages/admin/StudentAchievementAdmin";
import StudentAchievementPage from "@/pages/StudentAchievementsPage";
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
      },
      {
        path: "syllabus",
        element: <SyllabusPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "alumni",
        element: <AlumniPage />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "events",
        element: <Events/>,
      },
      {
        path: "/admin/login",
        element: <LoginPage />,
      },
      {
        path: "/studentachievementpage",
        element: <StudentAchievementPage/>,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
            
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "hero",
            element: <HeroPage />,
          },
          {
            path: "home",
            element: <HomeConfigPage />,
          }, 
          {
            path: "news",
            element: <NewsPage />,
          },
          {
            path: "events",
            element: <EventPage />,
          },
          {
            path: "about",
            element: <About/>,
          },
          {
            path: "department",
            element: <Department/>,
          },
          {
            path: "faculty",
            element: <Faculty/>,
          },
          {
            path: "program",
            element: <Program/>,
          },
          {
            path: "subject",
            element: <Subject/>,
          },
          {
            path: "syllabus",
            element: <Syllabus/>,
          },
          {
            path : "gallery",
            element: <Gallery/>,
          },
          {
            path: "sportsachievement",
            element: <SportsAchievementPage />,
          },
          {
            path : "alumni",
            element: <Alumni/>,
          },
          {
            path : "studentAchievementAdmin",
            element: <StudentAchievementAdmin/>,
          }
        ],
      },
      
    ],
  },
]);
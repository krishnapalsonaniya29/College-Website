import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
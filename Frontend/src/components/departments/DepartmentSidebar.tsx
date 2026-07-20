import { useEffect, useState } from "react";
import { Home, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

import api from "@/lib/api";

interface Department {
  id: number;
  name: string;
  slug: string;
}

export default function DepartmentSidebar() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/departments");
        setDepartments(res.data.data);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <aside className="sticky top-24 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="bg-blue-900 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Departments
        </h2>
      </div>

      {/* All Departments */}
      <div className="p-4">
        <NavLink
          to="/departments"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
              isActive
                ? "bg-blue-700 text-white shadow"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`
          }
        >
          <Home size={18} />
          <span className="font-medium">
            All Departments
          </span>
        </NavLink>
      </div>

      <div className="border-t border-gray-200" />

      {/* Department Links */}
      <div className="max-h-[650px] overflow-y-auto px-4 py-4">
        <h3 className="mb-3 px-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Academic Departments
        </h3>

        <div className="space-y-1">
          {departments.map((dept) => (
            <NavLink
              key={dept.id}
              to={`/departments/${dept.slug}`}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-700 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`
              }
            >
              <span className="font-medium">
                {dept.name}
              </span>

              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
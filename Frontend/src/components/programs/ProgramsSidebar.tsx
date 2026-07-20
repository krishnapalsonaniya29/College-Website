import {
  GraduationCap,
  Layers,
  BookOpen,
  School,
  Award,
} from "lucide-react";
import clsx from "clsx";

interface ProgramsSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const menuItems = [
  {
    id: "ALL",
    title: "All Programs",
    icon: Layers,
  },
  {
    id: "UG",
    title: "UG Programs",
    icon: GraduationCap,
  },
  {
    id: "PG",
    title: "PG Programs",
    icon: BookOpen,
  },
  {
    id: "DIPLOMA",
    title: "Diploma Programs",
    icon: School,
  },
  {
    id: "CERTIFICATE",
    title: "Certificate Programs",
    icon: Award,
  },
] as const;

export default function ProgramsSidebar({
  selectedCategory,
  setSelectedCategory,
}: ProgramsSidebarProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5">
        <h2 className="text-xl font-bold text-white">
          Programs
        </h2>

        <p className="mt-1 text-sm text-blue-100">
          Browse academic programs offered by the institute.
        </p>
      </div>

      {/* Menu */}
      <div className="p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() =>
                setSelectedCategory(item.id)
              }
              className={clsx(
                "mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200",
                selectedCategory === item.id
                  ? "bg-blue-900 text-white shadow-md"
                  : "text-slate-700 hover:bg-blue-50 hover:text-blue-900"
              )}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
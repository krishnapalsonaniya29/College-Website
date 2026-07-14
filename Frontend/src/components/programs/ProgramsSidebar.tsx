import { GraduationCap, Layers, BookOpen } from "lucide-react";
import clsx from "clsx";

interface ProgramsSidebarProps {
  selected: "all" | "ug" | "pg";
  onSelect: (value: "all" | "ug" | "pg") => void;
}

const menuItems = [
  {
    id: "all",
    title: "All Programs",
    icon: Layers,
  },
  {
    id: "ug",
    title: "UG Programs",
    icon: GraduationCap,
  },
  {
    id: "pg",
    title: "PG Programs",
    icon: BookOpen,
  },
] as const;

const ProgramsSidebar = ({
  selected,
  onSelect,
}: ProgramsSidebarProps) => {
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
              onClick={() => onSelect(item.id)}
              className={clsx(
                "mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200",
                selected === item.id
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
};

export default ProgramsSidebar;
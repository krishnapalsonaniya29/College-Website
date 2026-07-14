
import { IndianRupee, GraduationCap, Layers } from "lucide-react";
import clsx from "clsx";

interface Props {
  selected: "all" | "ug" | "pg";
  onSelect: (value: "all" | "ug" | "pg") => void;
}

const items = [
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
    icon: IndianRupee,
  },
] as const;

const FeesSidebar = ({ selected, onSelect }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5">
        <h2 className="text-xl font-bold text-white">
          Fee Structure
        </h2>

        <p className="mt-1 text-sm text-blue-100">
          Browse fee details by program.
        </p>
      </div>

      <div className="p-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={clsx(
                "mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition",
                selected === item.id
                  ? "bg-blue-900 text-white"
                  : "hover:bg-blue-50 text-slate-700"
              )}
            >
              <Icon size={20} />
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeesSidebar;
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserRound,
  UserRoundCheck,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "3,245",
    icon: Users,
    color: "from-blue-600 to-blue-500",
  },
  {
    title: "UG Students",
    value: "2,410",
    icon: GraduationCap,
    color: "from-green-600 to-green-500",
  },
  {
    title: "PG Students",
    value: "835",
    icon: BookOpen,
    color: "from-orange-600 to-orange-500",
  },
  {
    title: "Girls",
    value: "1,760",
    icon: UserRound,
    color: "from-pink-600 to-pink-500",
  },
  {
    title: "Boys",
    value: "1,485",
    icon: UserRoundCheck,
    color: "from-indigo-600 to-indigo-500",
  },
];

function StudentStrength() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Student Strength
        </h2>

        <button className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600">
          Previous Strength
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              whileHover={{ y: -4 }}
              key={item.title}
              className={`rounded-xl bg-gradient-to-r ${item.color} p-4 text-white shadow-md`}
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon size={28} />

                <span className="text-2xl font-bold">
                  {item.value}
                </span>
              </div>

              <p className="text-sm font-medium opacity-95">
                {item.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-5 py-3 text-center text-sm text-gray-600">
        Academic Session : <span className="font-semibold">2025-26</span>
      </div>
    </motion.section>
  );
}

export default StudentStrength;
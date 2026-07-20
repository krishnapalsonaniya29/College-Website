import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserRound,
  UserRoundCheck,
} from "lucide-react";

import api from "@/lib/api";

interface HomeConfig {
  totalStudents: number;
  ugStudents: number;
  pgStudents: number;
  girls: number;
  boys: number;
  academicSession: string;
}

function StudentStrength() {
  const [data, setData] = useState<HomeConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentStrength = async () => {
      try {
        const res = await api.get("/home");
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to load student statistics.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentStrength();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md">
        <p className="text-gray-500">Loading student statistics...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md">
        <p className="text-red-500">
          Unable to load student statistics.
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Students",
      value: data.totalStudents.toLocaleString(),
      icon: Users,
      color: "from-blue-600 to-blue-500",
    },
    {
      title: "UG Students",
      value: data.ugStudents.toLocaleString(),
      icon: GraduationCap,
      color: "from-green-600 to-green-500",
    },
    {
      title: "PG Students",
      value: data.pgStudents.toLocaleString(),
      icon: BookOpen,
      color: "from-orange-600 to-orange-500",
    },
    {
      title: "Girls",
      value: data.girls.toLocaleString(),
      icon: UserRound,
      color: "from-pink-600 to-pink-500",
    },
    {
      title: "Boys",
      value: data.boys.toLocaleString(),
      icon: UserRoundCheck,
      color: "from-indigo-600 to-indigo-500",
    },
  ];

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
              key={item.title}
              whileHover={{ y: -4 }}
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
        Academic Session :{" "}
        <span className="font-semibold">
          {data.academicSession}
        </span>
      </div>
    </motion.section>
  );
}

export default StudentStrength; 
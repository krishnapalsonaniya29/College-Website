import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

const news = [
  {
    title: "Admissions Open for Academic Session 2026-27",
    date: "08 Jul 2026",
  },
  {
    title: "UG Semester Examination Schedule Released",
    date: "07 Jul 2026",
  },
  {
    title: "National Conference on Artificial Intelligence",
    date: "05 Jul 2026",
  },
  {
    title: "Applications Invited for Merit Scholarship",
    date: "03 Jul 2026",
  },
  {
    title: "Library Timing Extended During Examination",
    date: "01 Jul 2026",
  },
  {
    title: "Annual Sports Meet Registration Started",
    date: "28 Jun 2026",
  },
  {
    title: "Workshop on Full Stack Development",
    date: "25 Jun 2026",
  },
  {
    title: "Orientation Program for First Year Students",
    date: "22 Jun 2026",
  },
];

function LatestUpdates() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
       className="h-full w-full rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Latest Updates
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 p-5">
        <button className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">
          All News
        </button>

        <button className="rounded-lg border border-blue-700 px-5 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
          Previous Year News
        </button>
      </div>

      {/* News List */}
      <div className="h-[360px] overflow-y-auto px-5 pb-5">
        <div className="space-y-4">
          {news.map((item, index) => (
            <a
              href="#"
              key={index}
              className="group block rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={15} />
                {item.date}
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-medium leading-6 text-gray-800 transition group-hover:text-blue-700">
                  {item.title}
                </h3>

                <ArrowRight
                  size={18}
                  className="mt-1 shrink-0 text-blue-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default LatestUpdates;
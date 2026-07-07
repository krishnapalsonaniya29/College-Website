import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const newsItems = [
  "Admissions Open for Session 2026-27",
  "UG Examination Form Submission Started",
  "National Conference on AI & Data Science - 25 July",
  "NAAC A+ Accreditation Achieved",
  "Library will remain open till 10 PM during exams",
  "Scholarship applications are now available",
];

function LatestNews() {
  return (
    <section className="w-full border-y border-blue-200 bg-white shadow-sm">
      <div className="mx-auto flex h-12 max-w-[1350px] overflow-hidden">
        {/* Left Label */}
        <div className="flex min-w-[180px] items-center justify-center gap-2 bg-blue-800 px-5 text-sm font-bold uppercase tracking-wide text-white">
          <Newspaper size={18} />
          Latest News
        </div>

        {/* Moving News */}
        <div className="relative flex-1 overflow-hidden bg-blue-50">
        <motion.div
            className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center whitespace-nowrap"
            animate={{ x: ["100%", "-100%"] }}
            transition={{
            repeat: Infinity,
            duration: 28,
            ease: "linear",
            }}
        >
            {newsItems.map((news, index) => (
            <a
                key={index}
                href="#"
                className="mx-8 flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-blue-700"
            >
                <span className="text-red-600">●</span>
                {news}
            </a>
            ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
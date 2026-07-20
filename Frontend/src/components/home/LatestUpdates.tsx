// import { motion } from "framer-motion";
// import { CalendarDays, ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// const news = [
//   {
//     title: "Admissions Open for Academic Session 2026-27",
//     date: "08 Jul 2026",
//   },
//   {
//     title: "UG Semester Examination Schedule Released",
//     date: "07 Jul 2026",
//   },
//   {
//     title: "National Conference on Artificial Intelligence",
//     date: "05 Jul 2026",
//   },
//   {
//     title: "Applications Invited for Merit Scholarship",
//     date: "03 Jul 2026",
//   },
//   {
//     title: "Library Timing Extended During Examination",
//     date: "01 Jul 2026",
//   },
//   {
//     title: "Annual Sports Meet Registration Started",
//     date: "28 Jun 2026",
//   },
//   {
//     title: "Workshop on Full Stack Development",
//     date: "25 Jun 2026",
//   },
//   {
//     title: "Orientation Program for First Year Students",
//     date: "22 Jun 2026",
//   },
// ];

// function LatestUpdates() {
//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 25 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//        className="h-full w-full rounded-xl border border-gray-200 bg-white shadow-md"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
//         <h2 className="text-xl font-bold text-white">
//           Latest Updates
//         </h2>
//         <Link to="/news" className="rounded-md bg-orange-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600">
//           All News
//         </Link>
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-3 p-5">
        

        
//       </div>

//       {/* News List */}
//       <div className="h-[360px] overflow-y-auto px-5 pb-5">
//         <div className="space-y-4">
//           {news.map((item, index) => (
//             <a
//               href="#"
//               key={index}
//               className="group block rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:shadow-md"
//             >
//               <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
//                 <CalendarDays size={15} />
//                 {item.date}
//               </div>

//               <div className="flex items-start justify-between gap-4">
//                 <h3 className="font-medium leading-6 text-gray-800 transition group-hover:text-blue-700">
//                   {item.title}
//                 </h3>

//                 <ArrowRight
//                   size={18}
//                   className="mt-1 shrink-0 text-blue-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
//                 />
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// export default LatestUpdates;


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import api from "@/lib/api";

interface News {
  id: number;
  title: string;
  publishedAt: string;
}

function LatestUpdates() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news");

        setNews(res.data.data.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch latest news.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full w-full rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-xl font-bold text-white">
          Latest Updates
        </h2>

        <Link
          to="/news"
          className="rounded-md bg-orange-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          All News
        </Link>
      </div>

      {/* News List */}
      <div className="h-[360px] overflow-y-auto px-5 py-5">
        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Loading latest news...
          </div>
        ) : news.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No news available.
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <Link
                key={item.id}
                to="/news"
                className="group block rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={15} />

                  {new Date(item.publishedAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

export default LatestUpdates;
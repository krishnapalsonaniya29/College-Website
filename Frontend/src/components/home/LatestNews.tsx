// import { motion } from "framer-motion";
// import { Newspaper } from "lucide-react";

// const newsItems = [
//   "Admissions Open for Session 2026-27",
//   "UG Examination Form Submission Started",
//   "National Conference on AI & Data Science - 25 July",
//   "NAAC A+ Accreditation Achieved",
//   "Library will remain open till 10 PM during exams",
//   "Scholarship applications are now available",
// ];

// function LatestNews() {
//   return (
//     <section className="w-full border-y border-blue-200 bg-white shadow-sm">
//       <div className="mx-auto flex h-12 max-w-[1350px] overflow-hidden">
//         {/* Left Label */}
//         <div className="flex min-w-[180px] items-center justify-center gap-2 bg-blue-800 px-5 text-sm font-bold uppercase tracking-wide text-white">
//           <Newspaper size={18} />
//           Latest News
//         </div>

//         {/* Moving News */}
//         <div className="relative flex-1 overflow-hidden bg-blue-50">
//         <motion.div
//             className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center whitespace-nowrap"
//             animate={{ x: ["100%", "-100%"] }}
//             transition={{
//             repeat: Infinity,
//             duration: 28,
//             ease: "linear",
//             }}
//         >
//             {newsItems.map((news, index) => (
//             <a
//                 key={index}
//                 href="#"
//                 className="mx-8 flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-blue-700"
//             >
//                 <span className="text-red-600">●</span>
//                 {news}
//             </a>
//             ))}
//         </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LatestNews;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

import api from "@/lib/api";

interface NewsItem {
  id: number;
  title: string;
  category: string;
}

interface EventItem {
  id: number;
  title: string;
}

type TickerItem =
  | {
      id: number;
      title: string;
      type: "news";
      category: string;
    }
  | {
      id: number;
      title: string;
      type: "event";
    };

function LatestNews() {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          api.get("/news"),
          api.get("/events"),
        ]);

        const news: TickerItem[] = newsRes.data.data.map(
          (item: NewsItem) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            type: "news",
          })
        );

        const events: TickerItem[] = eventsRes.data.data.map(
          (item: EventItem) => ({
            id: item.id,
            title: item.title,
            type: "event",
          })
        );

        setItems([...news, ...events]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTicker();
  }, []);

  return (
    <section className="w-full border-y border-blue-200 bg-white shadow-sm">
      <div className="mx-auto flex h-12 max-w-[1350px] overflow-hidden">
        {/* Left Label */}
        <div className="flex min-w-[190px] items-center justify-center gap-2 bg-blue-800 px-5 text-sm font-bold uppercase tracking-wide text-white">
          <Newspaper size={18} />
          Latest Updates
        </div>

        {/* Ticker */}
        <div className="relative flex-1 overflow-hidden bg-blue-50">
          <motion.div
            className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear",
            }}
          >
            {[...items, ...items].map((item, index) => (
              <Link
                key={`${item.type}-${item.id}-${index}`}
                to={
                  item.type === "news"
                    ? `/news/`
                    : `/events`
                }
                className="mx-8 flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-blue-700"
              >
                <span
                  className={
                    item.type === "news"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  ●
                </span>

                <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  {item.type === "news"
                    ? item.category
                    : "EVENT"}
                </span>

                <span>{item.title}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
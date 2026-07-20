import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import api from "@/lib/api";

interface HomeConfig {
  thought: string;
  thoughtAuthor: string;
}

function ThoughtOfTheDay() {
  const [data, setData] = useState<HomeConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const res = await api.get("/home");
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to load thought of the day.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThought();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto my-8 flex min-h-[180px] max-w-[1350px] items-center justify-center rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
        <p className="text-white">Loading thought of the day...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto my-8 flex min-h-[180px] max-w-[1350px] items-center justify-center rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
        <p className="text-red-200">
          Unable to load thought of the day.
        </p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mx-auto my-8 max-w-[1350px] overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg"
    >
      <div className="flex flex-col items-center gap-5 px-8 py-8 md:flex-row">
        {/* Quote Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Quote size={34} className="text-yellow-300" />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-yellow-300">
            Thought of the Day
          </h2>

          <p className="text-lg italic leading-8 text-white md:text-xl">
            "{data.thought}"
          </p>

          <p className="mt-4 text-right text-sm font-medium text-blue-100">
            — {data.thoughtAuthor}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default ThoughtOfTheDay;
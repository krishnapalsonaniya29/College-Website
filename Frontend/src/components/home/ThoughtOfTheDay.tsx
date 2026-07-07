import { motion } from "framer-motion";
import { Quote } from "lucide-react";

function ThoughtOfTheDay() {
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
            "Education is not the learning of facts, but the training of the
            mind to think. The future belongs to those who believe in the
            beauty of their dreams."
          </p>

          <p className="mt-4 text-right text-sm font-medium text-blue-100">
            — Albert Einstein
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default ThoughtOfTheDay;
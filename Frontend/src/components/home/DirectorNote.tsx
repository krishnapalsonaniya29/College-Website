import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function DirectorNote() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Director's Note
        </h2>
      </div>

      {/* Content */}
      <div className="flex gap-5 p-6">
        {/* Image */}
        <div className="shrink-0">
          <img
            src="https://i.pravatar.cc/250?img=58"
            alt="Director"
            className="h-36 w-32 rounded-xl border-2 border-blue-200 object-cover shadow-md transition duration-300 hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl font-bold text-blue-900">
            Prof. Rajesh Kumar Sharma
          </h3>

          <p className="mt-1 text-sm font-medium text-gray-600">
            Director, Institute for Excellence in Higher Education
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-700">
            At IEHE, we are committed to nurturing academic excellence,
            innovation, ethical values, and holistic development. Our
            mission is to empower students with knowledge and skills that
            enable them to become responsible global citizens.
          </p>

          <div className="mt-auto pt-5">
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800">
              Read More
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default DirectorNote;
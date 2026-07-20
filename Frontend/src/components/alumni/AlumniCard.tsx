import { motion } from "framer-motion";
import { GraduationCap, Quote } from "lucide-react";

interface AlumniCardProps {
  name: string;
  course: string;
  batch: number;
  photoUrl: string;
  message: string;
}

function AlumniCard({
  name,
  course,
  batch,
  photoUrl,
  message,
}: AlumniCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
    >
      <Quote
        size={34}
        className="mb-4 text-blue-700 opacity-20"
      />

      <p className="line-clamp-5 flex-1 text-sm leading-7 text-gray-600">
        {message}
      </p>

      <div className="mt-6 flex items-center gap-4 border-t pt-5">
        <img
          src={photoUrl}
          alt={name}
          className="h-16 w-16 rounded-full border-2 border-blue-600 object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {name}
          </h3>

          <p className="text-sm text-blue-700">
            {course}
          </p>

          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <GraduationCap size={14} />
            Batch {batch}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AlumniCard;
import { motion } from "framer-motion";
import { Award, Mail, GraduationCap } from "lucide-react";

const faculty = [
  {
    name: "Dr. Rajesh Sharma",
    position: "Professor",
    department: "Computer Science",
    email: "rajesh@iehe.ac.in",
    achievementType: "Research Award",
    achievement: "Received Best Research Paper Award at IEEE ICCIT 2026.",
    date: "10 Jul 2026",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Dr. Priya Verma",
    position: "Associate Professor",
    department: "Physics",
    email: "priya@iehe.ac.in",
    achievementType: "Patent",
    achievement: "Granted Patent for Smart Solar Energy Monitoring System.",
    date: "03 Jul 2026",
    image: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "Dr. Amit Gupta",
    position: "Assistant Professor",
    department: "Mathematics",
    email: "amit@iehe.ac.in",
    achievementType: "Publication",
    achievement: "Published in Elsevier Journal with high impact factor.",
    date: "28 Jun 2026",
    image: "https://i.pravatar.cc/300?img=45",
  },
];

function FacultyAchievements() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Faculty Achievements
        </h2>
      </div>

      {/* Horizontal Slider */}
      <div className="overflow-hidden py-5">
        <motion.div
          className="flex gap-5"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...faculty, ...faculty].map((item, index) => (
            <div
              key={index}
              className="w-[300px] shrink-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Faculty */}
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full border-2 border-blue-600 object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-blue-700">
                    {item.position}
                  </p>

                  <p className="text-xs text-gray-500">
                    {item.department}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                <Mail size={14} />
                {item.email}
              </div>

              {/* Achievement Type */}
              <div className="mt-4 flex items-center gap-2">
                <Award size={16} className="text-yellow-500" />
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  {item.achievementType}
                </span>
              </div>

              {/* Achievement */}
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-700">
                {item.achievement}
              </p>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} />
                  IEHE
                </span>

                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FacultyAchievements;
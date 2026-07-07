import { motion } from "framer-motion";
import { Award, CalendarDays, GraduationCap } from "lucide-react";

const students = [
  {
    name: "Aditi Sharma",
    course: "B.Sc. Computer Science",
    achievementType: "National Hackathon",
    achievement: "Secured 1st Position in Smart India Hackathon 2026.",
    date: "12 Jul 2026",
    image: "https://i.pravatar.cc/300?img=5",
    badge: "🏆 1st",
  },
  {
    name: "Rahul Verma",
    course: "M.Sc. Physics",
    achievementType: "Research",
    achievement: "Published a research paper in an international journal.",
    date: "04 Jul 2026",
    image: "https://i.pravatar.cc/300?img=14",
    badge: "Research",
  },
  {
    name: "Sneha Patel",
    course: "B.Com. Honours",
    achievementType: "Sports",
    achievement: "Won Gold Medal in Inter-University Athletics Championship.",
    date: "26 Jun 2026",
    image: "https://i.pravatar.cc/300?img=47",
    badge: "🥇 Gold",
  },
];

function StudentAchievements() {
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
          Student Achievements
        </h2>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden py-5">
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
        >
          {[...students, ...students].map((student, index) => (
            <div
              key={index}
              className="w-[300px] shrink-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Top */}
              <div className="flex items-center gap-3">
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-16 w-16 rounded-full border-2 border-blue-600 object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {student.name}
                  </h3>

                  <p className="text-sm text-blue-700">
                    {student.course}
                  </p>
                </div>
              </div>

              {/* Badge */}
              <div className="mt-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  {student.badge}
                </span>
              </div>

              {/* Type */}
              <div className="mt-3 flex items-center gap-2">
                <Award size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  {student.achievementType}
                </span>
              </div>

              {/* Achievement */}
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-700">
                {student.achievement}
              </p>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} />
                  IEHE
                </span>

                <span className="flex items-center gap-1">
                  <CalendarDays size={13} />
                  {student.date}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default StudentAchievements;
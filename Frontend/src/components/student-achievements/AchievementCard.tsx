import { motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  GraduationCap,
  User,
} from "lucide-react";

interface StudentAchievement {
  id: number;
  name: string;
  course: string;
  achievement: string;
  description: string;
  photoUrl: string;
  achievementDate: string;
}

interface AchievementCardProps {
  achievement: StudentAchievement;
}

const AchievementCard = ({
  achievement,
}: AchievementCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={achievement.photoUrl}
          alt={achievement.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Achievement Badge */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <Award className="h-4 w-4" />
          Achievement
        </div>

        {/* Student Name */}
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-2xl font-bold text-white">
            {achievement.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        {/* Course */}
        <div className="flex items-center gap-3 text-slate-600">
          <GraduationCap className="h-5 w-5 text-indigo-600" />

          <span className="font-medium">
            {achievement.course}
          </span>
        </div>

        {/* Achievement Title */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />

            <span className="font-semibold text-slate-800">
              Achievement
            </span>
          </div>

          <p className="font-medium leading-7 text-slate-700">
            {achievement.achievement}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="line-clamp-4 leading-7 text-slate-600">
            {achievement.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-5">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays className="h-4 w-4" />

            <span className="text-sm">
              {new Date(
                achievement.achievementDate
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
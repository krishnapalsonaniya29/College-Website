import { motion } from "framer-motion";
import { Award } from "lucide-react";

import AchievementCard from "./AchievementCard";

interface StudentAchievement {
  id: number;
  name: string;
  course: string;
  achievement: string;
  description: string;
  photoUrl: string;
  achievementDate: string;
}

interface AchievementGridProps {
  achievements: StudentAchievement[];
  loading: boolean;
}

const SkeletonCard = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div className="h-72 animate-pulse bg-slate-200" />

    <div className="space-y-4 p-6">
      <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />

      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
    </div>
  </div>
);

const AchievementGrid = ({
  achievements,
  loading,
}: AchievementGridProps) => {
  if (loading) {
    return (
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (achievements.length === 0) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
            <Award className="h-12 w-12 text-indigo-600" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            No Achievements Found
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-600">
            We couldn't find any student achievements
            matching your current search or filter.
            Try changing the search keyword or selecting
            another course.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Student Achievements
            </h2>

            <p className="mt-2 text-slate-600">
              Showing{" "}
              <span className="font-semibold text-indigo-600">
                {achievements.length}
              </span>{" "}
              achievement
              {achievements.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
              }}
            >
              <AchievementCard
                achievement={achievement}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementGrid;
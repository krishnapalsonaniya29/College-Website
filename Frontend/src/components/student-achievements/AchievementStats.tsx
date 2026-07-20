import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Calendar,
  Trophy,
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

interface AchievementStatsProps {
  achievements: StudentAchievement[];
}

const AchievementStats = ({
  achievements,
}: AchievementStatsProps) => {
  const totalAchievements = achievements.length;

  const uniqueCourses = new Set(
    achievements.map((item) => item.course)
  ).size;

  const currentYear = new Date().getFullYear();

  const currentYearAchievements = achievements.filter(
    (item) =>
      new Date(item.achievementDate).getFullYear() === currentYear
  ).length;

  const nationalKeywords = [
    "national",
    "india",
    "state",
    "gold medal",
    "silver medal",
    "bronze medal",
    "champion",
  ];

  const awards = achievements.filter((item) =>
    nationalKeywords.some((keyword) =>
      item.achievement.toLowerCase().includes(keyword)
    )
  ).length;

  const stats = [
    {
      title: "Total Achievements",
      value: totalAchievements,
      icon: Trophy,
      color:
        "from-amber-500 to-yellow-500",
    },
    {
      title: "Courses Represented",
      value: uniqueCourses,
      icon: GraduationCap,
      color:
        "from-blue-500 to-indigo-600",
    },
    {
      title: "Awards & Honors",
      value: awards,
      icon: Award,
      color:
        "from-emerald-500 to-green-600",
    },
    {
      title: "This Year",
      value: currentYearAchievements,
      icon: Calendar,
      color:
        "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Achievement Highlights
          </h2>

          <p className="mt-3 text-slate-600">
            A glimpse of our students' outstanding
            accomplishments across academics,
            sports and co-curricular activities.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-4xl font-bold text-slate-900">
                  {stat.value}
                </h3>

                <p className="mt-2 text-base font-medium text-slate-600">
                  {stat.title}
                </p>

                <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementStats;
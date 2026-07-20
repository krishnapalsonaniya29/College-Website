import { useEffect, useState } from "react";
import { Trophy, Medal, Award } from "lucide-react";

import api from "@/lib/api";

interface SportsAchievement {
  id: number;
  title: string;
  description: string;
  achievementDate: string;
  isActive: boolean;
}

const icons = [Trophy, Medal, Award];

const SportsAchievements = () => {
  const [achievements, setAchievements] = useState<SportsAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);

      const res = await api.get("/sports-achievements");

      setAchievements(res.data.data ?? []);
    } catch (error) {
      console.error("Failed to fetch sports achievements", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900">
          Sports Achievements
        </h2>

        <p className="mt-8 text-center text-slate-500">
          Loading achievements...
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">
          Sports Achievements
        </h2>

        <p className="mt-2 text-slate-600">
          Our students consistently excel in university, state, and
          inter-college competitions, bringing pride to the institute through
          their dedication, teamwork, and sporting excellence.
        </p>
      </div>

      {achievements.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No sports achievements available.
        </div>
      ) : (
        <div className="relative border-l-4 border-blue-900 pl-8">
          {achievements.map((achievement, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={achievement.id}
                className="relative mb-10 last:mb-0"
              >
                <div className="absolute -left-[46px] flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white shadow-lg">
                  <Icon size={20} />
                </div>

                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">
                  {new Date(
                    achievement.achievementDate
                  ).getFullYear()}
                </span>

                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  {achievement.title}
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SportsAchievements;
import { Trophy, Medal, Award } from "lucide-react";

const achievements = [
  {
    year: "2025",
    title: "Inter-College Cricket Championship",
    description:
      "The college cricket team secured first position in the Inter-College Cricket Championship organized by the university.",
    icon: Trophy,
  },
  {
    year: "2024",
    title: "University Athletics Meet",
    description:
      "Students won multiple gold and silver medals in athletics, including the 100m sprint, relay race, and long jump events.",
    icon: Medal,
  },
  {
    year: "2024",
    title: "State-Level Badminton Tournament",
    description:
      "The badminton team represented the institute at the state level and secured the runner-up position.",
    icon: Award,
  },
  {
    year: "2023",
    title: "Annual Sports Meet Champions",
    description:
      "Students demonstrated exceptional performances across various indoor and outdoor sporting events during the annual sports festival.",
    icon: Trophy,
  },
];

const SportsAchievements = () => {
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

      <div className="relative border-l-4 border-blue-900 pl-8">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <div
              key={index}
              className="relative mb-10 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[46px] flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white shadow-lg">
                <Icon size={20} />
              </div>

              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900">
                {achievement.year}
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
    </section>
  );
};

export default SportsAchievements;
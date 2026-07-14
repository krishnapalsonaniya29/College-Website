import {
  Trophy,
  Dumbbell,
  Volleyball,
  Goal,
  PersonStanding,
  Bike,
  Medal,
  Gamepad2,
} from "lucide-react";

const facilities = [
  {
    title: "Cricket Ground",
    icon: Trophy,
    description:
      "A spacious cricket ground with practice nets for regular training sessions and inter-college tournaments.",
  },
  {
    title: "Football Ground",
    icon: Goal,
    description:
      "A well-maintained football field for practice matches, tournaments, and annual sports competitions.",
  },
  {
    title: "Basketball Court",
    icon: Volleyball,
    description:
      "Standard basketball court providing students with opportunities to practice and compete in tournaments.",
  },
  {
    title: "Volleyball Court",
    icon: Volleyball,
    description:
      "Outdoor volleyball court used for daily practice and college-level competitions.",
  },
  {
    title: "Badminton Court",
    icon: Medal,
    description:
      "Dedicated badminton court supporting recreational games and competitive events.",
  },
  {
    title: "Athletics Track",
    icon: PersonStanding,
    description:
      "Facilities for running events, track competitions, fitness activities, and annual sports meets.",
  },
  {
    title: "Gymnasium",
    icon: Dumbbell,
    description:
      "Basic fitness equipment and strength training facilities to promote students' physical well-being.",
  },
  {
    title: "Indoor Games",
    icon: Gamepad2,
    description:
      "Indoor facilities for Chess, Carrom, Table Tennis, and other recreational games.",
  },
];

const SportsFacilities = () => {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Sports Facilities
        </h2>

        <p className="mt-2 text-slate-600">
          The institute provides modern sports infrastructure and encourages
          students to participate in both indoor and outdoor sporting
          activities for their overall physical and mental development.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {facilities.map((facility) => {
          const Icon = facility.icon;

          return (
            <div
              key={facility.title}
              className="group rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900 transition-colors group-hover:bg-blue-900 group-hover:text-white">
                <Icon size={28} />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                {facility.title}
              </h3>

              <p className="text-sm leading-6 text-slate-600">
                {facility.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SportsFacilities;
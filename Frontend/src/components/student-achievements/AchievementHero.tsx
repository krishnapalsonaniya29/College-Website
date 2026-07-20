import { motion } from "framer-motion";
import { Award, GraduationCap, Trophy } from "lucide-react";

const AchievementHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-sky-700 py-24">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              <Award className="h-4 w-4" />
              Celebrating Student Excellence
            </div>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              Student
              <span className="block text-yellow-300">
                Achievements
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Our students consistently excel in academics,
              sports, cultural activities, research and
              innovation. Every achievement reflects dedication,
              perseverance and the spirit of excellence that our
              institution proudly nurtures.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur-md">
                <p className="text-3xl font-bold text-white">
                  100+
                </p>
                <p className="text-sm text-blue-100">
                  Student Achievements
                </p>
              </div>

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur-md">
                <p className="text-3xl font-bold text-white">
                  20+
                </p>
                <p className="text-sm text-blue-100">
                  Disciplines
                </p>
              </div>

              <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur-md">
                <p className="text-3xl font-bold text-white">
                  50+
                </p>
                <p className="text-sm text-blue-100">
                  Awards
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative flex h-[420px] w-[420px] items-center justify-center">
              {/* Outer Circle */}
              <div className="absolute h-full w-full rounded-full border border-white/20 bg-white/5 backdrop-blur-md" />

              {/* Inner Circle */}
              <div className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-2xl flex items-center justify-center">
                <Trophy className="h-28 w-28 text-white" />
              </div>

              {/* Floating Cards */}

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute left-0 top-12 rounded-2xl bg-white p-5 shadow-xl"
              >
                <GraduationCap className="mb-2 h-9 w-9 text-indigo-600" />
                <p className="font-semibold">
                  Academic Excellence
                </p>
                <span className="text-sm text-gray-500">
                  University Toppers
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute right-0 bottom-14 rounded-2xl bg-white p-5 shadow-xl"
              >
                <Award className="mb-2 h-9 w-9 text-yellow-500" />
                <p className="font-semibold">
                  National Awards
                </p>
                <span className="text-sm text-gray-500">
                  Proud Moments
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AchievementHero;
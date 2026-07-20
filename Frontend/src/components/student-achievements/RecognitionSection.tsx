import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Medal,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description:
      "Recognizing outstanding academic performance, university rank holders, and research achievements.",
  },
  {
    icon: Medal,
    title: "Sports Excellence",
    description:
      "Celebrating students who bring laurels to the institution through district, state and national competitions.",
  },
  {
    icon: Award,
    title: "Leadership & Innovation",
    description:
      "Honouring innovation, entrepreneurship, leadership and exceptional contributions beyond academics.",
  },
];

const RecognitionSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 py-24">
      {/* Background Blur */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
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
            duration: 0.6,
          }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Excellence • Dedication • Success
          </div>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Celebrating Every Achievement
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Every success story reflects perseverance,
            commitment and the pursuit of excellence.
            Our institution proudly celebrates students
            whose achievements inspire future generations
            and strengthen our legacy of academic and
            personal growth.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-lg transition-all duration-300 hover:border-yellow-400/40 hover:bg-white/15"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-xl">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="leading-8 text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="mt-20 rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 p-10 text-center backdrop-blur-md"
        >
          <Award className="mx-auto mb-6 h-12 w-12 text-yellow-400" />

          <blockquote className="mx-auto max-w-4xl text-2xl font-medium italic leading-10 text-white">
            "Success is not merely measured by awards,
            but by the determination, integrity and
            passion that inspire every achievement."
          </blockquote>

          <div className="mt-6 h-1 w-24 rounded-full bg-yellow-400 mx-auto" />

          <p className="mt-6 text-lg font-semibold text-yellow-300">
            Government College • Empowering Excellence Since 1964
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecognitionSection;
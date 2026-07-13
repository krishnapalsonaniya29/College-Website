import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const rules = [
  "Ragging in any form is strictly prohibited inside the campus, hostels, transportation, and during all institute-related activities.",

  "Every student shall maintain discipline, mutual respect, and dignity towards fellow students regardless of their year or background.",

  "Any student found involved in ragging shall face strict disciplinary action as per UGC regulations and institute rules.",

  "Students are encouraged to report incidents immediately to the Anti-Ragging Committee or institute authorities without fear.",

  "The identity of the complainant will be kept confidential during the inquiry process.",

  "Parents and guardians are expected to cooperate with the institute in maintaining a ragging-free environment.",

  "Awareness programmes, orientation sessions, and regular monitoring are conducted to prevent ragging on campus.",

  "Creating a safe, inclusive, and respectful campus is the responsibility of every member of the institute.",
];

const RulesGuidelines = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <ShieldAlert className="text-red-600" size={24} />
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
                Guidelines
              </span>

              <h2 className="text-3xl font-bold text-slate-900">
                Rules & Regulations
              </h2>
            </div>
          </div>

          <div className="mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Rules Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-lg font-bold text-white">
                {(index + 1).toString().padStart(2, "0")}
              </div>

              <p className="leading-7 text-gray-700">
                {rule}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 rounded-xl border-l-4 border-red-600 bg-red-50 p-5">
          <p className="leading-7 text-gray-700">
            <span className="font-semibold text-red-700">Important:</span>{" "}
            Ragging is a punishable offence under the UGC Regulations on
            Curbing the Menace of Ragging in Higher Educational Institutions.
            Any violation may lead to suspension, expulsion, cancellation of
            admission, or legal action as applicable.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default RulesGuidelines;
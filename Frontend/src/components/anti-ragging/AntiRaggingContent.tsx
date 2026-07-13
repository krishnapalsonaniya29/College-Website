import { AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const AntiRaggingContent = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
            Student Welfare
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Anti-Ragging Policy
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Content */}
        <div className="grid gap-10 p-8 lg:grid-cols-[2fr_1fr]">
          {/* Left */}
          <div className="space-y-6 text-justify leading-8 text-gray-700">
            <p>
              Ragging in any form is strictly prohibited within the institute
              campus, hostels, transportation facilities, and all activities
              organized by the institution. Every student has the right to
              study in a safe, respectful, and inclusive environment free from
              fear, intimidation, or harassment.
            </p>

            <p>
              The institute follows the regulations issued by the University
              Grants Commission (UGC) and maintains a zero-tolerance approach
              towards ragging. Any act of physical, verbal, psychological, or
              online harassment will invite strict disciplinary action as per
              institutional rules and statutory guidelines.
            </p>

            <p>
              Students are encouraged to report any incident of ragging without
              hesitation. All complaints are handled confidentially by the
              Anti-Ragging Committee, ensuring prompt inquiry and appropriate
              action while protecting the dignity and safety of every student.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Zero Tolerance */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle
                  className="text-red-600"
                  size={30}
                />

                <div>
                  <h3 className="font-semibold text-red-700">
                    Zero Tolerance
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    Ragging is a punishable offence under UGC regulations and
                    institute rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  className="text-green-600"
                  size={30}
                />

                <div>
                  <h3 className="font-semibold text-green-700">
                    Our Commitment
                  </h3>

                  <p className="mt-1 text-sm text-green-600">
                    We are committed to providing a secure, welcoming, and
                    respectful campus for every student.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="rounded-xl bg-blue-900 p-6 text-white">
              <p className="text-lg italic leading-8">
                "A healthy academic environment begins with mutual respect,
                dignity, and compassion."
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AntiRaggingContent;
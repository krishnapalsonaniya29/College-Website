import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  Users,
  Search,
  Scale,
} from "lucide-react";

const steps = [
  {
    title: "Incident Occurs",
    description: "Student witnesses or experiences ragging.",
    icon: AlertTriangle,
  },
  {
    title: "Report Complaint",
    description: "Inform the Anti-Ragging Committee or faculty.",
    icon: FileText,
  },
  {
    title: "Committee Review",
    description: "Complaint is registered and reviewed confidentially.",
    icon: Users,
  },
  {
    title: "Investigation",
    description: "Facts are verified through inquiry and evidence.",
    icon: Search,
  },
  {
    title: "Action Taken",
    description: "Appropriate disciplinary action is initiated.",
    icon: Scale,
  },
];

const ReportingProcess = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <div className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
            Complaint Procedure
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Reporting Process
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Flow Chart */}
        <div className="overflow-x-auto">
          <div className="flex min-w-[1100px] items-center justify-between gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="flex items-center"
                >
                  {/* Step */}
                  <div className="w-52 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                      <Icon className="text-blue-900" size={28} />
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="mx-4 flex items-center">
                      <div className="h-[2px] w-10 bg-blue-300"></div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
                        →
                      </div>

                      <div className="h-[2px] w-10 bg-blue-300"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 rounded-xl border-l-4 border-blue-900 bg-blue-50 p-5">
          <p className="leading-7 text-gray-700">
            Every complaint received by the Anti-Ragging Committee is handled
            with strict confidentiality. Appropriate action is taken in
            accordance with the UGC Anti-Ragging Regulations and the institute's
            disciplinary policies.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ReportingProcess;
import { Phone, Mail, ShieldAlert, Clock } from "lucide-react";
import { motion } from "framer-motion";

const contacts = [
  {
    icon: Phone,
    title: "College Helpline",
    value: "+91 98765 43210",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "antiragging@college.edu.in",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: ShieldAlert,
    title: "UGC Anti-Ragging Helpline",
    value: "1800-180-5522",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Clock,
    title: "Availability",
    value: "24 × 7 Support",
    color: "bg-amber-100 text-amber-700",
  },
];

const HelplineCard = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Heading */}
        <div className="mb-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
            Emergency Support
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Helpline & Contact Details
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 break-words text-gray-600">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 rounded-xl border-l-4 border-blue-800 bg-blue-50 p-5">
          <p className="leading-7 text-gray-700">
            Students can approach the Anti-Ragging Committee, faculty members,
            hostel wardens, or use the above helpline details to report any
            incident. All complaints are treated with confidentiality and acted
            upon promptly according to institutional and UGC regulations.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HelplineCard;
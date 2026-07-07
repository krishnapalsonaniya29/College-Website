import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Eye, Target, Lightbulb } from "lucide-react";

const tabs = [
  {
    id: "motto",
    title: "Motto",
    icon: BookOpen,
    content:
      "To inspire excellence in higher education through innovation, integrity, and lifelong learning while fostering responsible citizens.",
  },
  {
    id: "vision",
    title: "Vision",
    icon: Eye,
    content:
      "To become a nationally recognized institution for academic excellence, quality research, innovation, and holistic student development.",
  },
  {
    id: "mission",
    title: "Mission",
    icon: Target,
    content:
      "To provide quality education, promote research, encourage entrepreneurship, and develop socially responsible leaders with ethical values.",
  },
  {
    id: "objective",
    title: "Objectives",
    icon: Lightbulb,
    content:
      "• Promote academic excellence.\n• Encourage research & innovation.\n• Strengthen industry collaboration.\n• Develop leadership and social responsibility among students.",
  },
];

function VisionMission() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <motion.section
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Motto, Vision, Mission & Objectives
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-gray-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab)}
              className={`flex flex-1 items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition ${
                active.id === tab.id
                  ? "border-b-2 border-blue-700 bg-white text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3">
              <active.icon className="text-blue-700" size={22} />
            </div>

            <h3 className="text-xl font-bold text-blue-900">
              {active.title}
            </h3>
          </div>

          <p className="whitespace-pre-line text-sm leading-8 text-gray-700">
            {active.content}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default VisionMission;
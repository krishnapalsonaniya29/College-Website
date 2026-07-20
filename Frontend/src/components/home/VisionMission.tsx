import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Eye,
  Target,
  Lightbulb,
} from "lucide-react";

import api from "@/lib/api";

interface AboutData {
  motto: string;
  vision: string;
  mission: string;
  objectives: string;
}

function VisionMission() {
  const [about, setAbout] =
    useState<AboutData | null>(null);

  const [active, setActive] =
    useState("motto");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");

        setAbout({
          motto: res.data.data.motto,
          vision: res.data.data.vision,
          mission: res.data.data.mission,
          objectives:
            res.data.data.objectives,
        });
      } catch (err) {
        console.error(
          "Failed to fetch about data.",
          err
        );
      }
    };

    fetchAbout();
  }, []);

  const tabs = [
    {
      id: "motto",
      title: "Motto",
      icon: BookOpen,
      content: about?.motto || "",
    },
    {
      id: "vision",
      title: "Vision",
      icon: Eye,
      content: about?.vision || "",
    },
    {
      id: "mission",
      title: "Mission",
      icon: Target,
      content: about?.mission || "",
    },
    {
      id: "objectives",
      title: "Objectives",
      icon: Lightbulb,
      content: about?.objectives || "",
    },
  ];

  const current =
    tabs.find((t) => t.id === active) ??
    tabs[0];

  return (
    <motion.section
      initial={{ opacity: 0, x: 25 }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Motto, Vision, Mission &
          Objectives
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-gray-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() =>
                setActive(tab.id)
              }
              className={`flex flex-1 items-center justify-center gap-2 px-3 py-3 text-sm font-medium transition ${
                active === tab.id
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
          key={current.id}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3">
              <current.icon
                className="text-blue-700"
                size={22}
              />
            </div>

            <h3 className="text-xl font-bold text-blue-900">
              {current.title}
            </h3>
          </div>

          <p className="whitespace-pre-line text-sm leading-8 text-gray-700">
            {current.content}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
export default VisionMission;
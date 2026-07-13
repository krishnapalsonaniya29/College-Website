import { departments, type Department } from "@/data/departments";
import { Eye, Target } from "lucide-react";

interface VisionMissionProps {
  department: Department;
}

export default function VisionMission({
  department,
}: VisionMissionProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Vision */}

      <section className="rounded-xl bg-white p-8 shadow transition hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <Eye className="h-6 w-6 text-blue-700" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Vision
          </h2>
        </div>

        <p className="leading-8 text-gray-600">
          {department.vision}
        </p>
      </section>

      {/* Mission */}

      <section className="rounded-xl bg-white p-8 shadow transition hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <Target className="h-6 w-6 text-blue-700" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Mission
          </h2>
        </div>

        <ul className="space-y-4">
          {department.mission.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
            >
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>

              <span className="leading-7 text-gray-600">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
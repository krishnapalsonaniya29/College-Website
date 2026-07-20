import { Eye, Target } from "lucide-react";

interface Department {
  vision: string;
  mission: string;
}

interface VisionMissionProps {
  department: Department;
}

export default function VisionMission({
  department,
}: VisionMissionProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Vision */}
      <section
        id="vision"
        className="rounded-xl bg-white p-8 shadow transition hover:shadow-lg"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <Eye className="h-6 w-6 text-blue-700" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Vision
          </h2>
        </div>

        <p className="whitespace-pre-line leading-8 text-gray-600">
          {department.vision}
        </p>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="rounded-xl bg-white p-8 shadow transition hover:shadow-lg"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <Target className="h-6 w-6 text-blue-700" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Mission
          </h2>
        </div>

        <p className="whitespace-pre-line leading-8 text-gray-600">
          {department.mission}
        </p>
      </section>
    </div>
  );
}
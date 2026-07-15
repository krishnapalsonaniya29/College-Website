import { type Department } from "@/data/departments";
import { Mail, GraduationCap, UserRound } from "lucide-react";

interface HodSectionProps {
  department: Department;
}

export default function HodSection({ department }: HodSectionProps) {
  const initials = department.hod
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-8 py-5">
        <h2 className="text-3xl font-bold text-white">
          Head of Department
        </h2>

        <p className="mt-2 text-blue-100">
          Academic leadership guiding the department towards excellence.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-8 p-8 lg:grid-cols-[260px_1fr]">
        {/* Left Card */}
        <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-6 text-center">

          {/* Avatar */}
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-5xl font-bold text-white shadow-lg">
            {initials}
          </div>

          <h3 className="mt-6 text-2xl font-bold text-gray-800">
            {department.hod}
          </h3>

          <p className="mt-1 text-blue-700 font-medium">
            Professor & Head
          </p>

          <div className="mt-6 w-full space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
              <GraduationCap className="h-5 w-5 text-blue-700" />
              <span className="text-sm text-gray-600">
                {department.name}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
              <UserRound className="h-5 w-5 text-blue-700" />
              <span className="text-sm text-gray-600">
                Academic Leader
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
              <Mail className="h-5 w-5 text-blue-700" />
              <span className="text-sm text-gray-600">
                hod@college.edu
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            Message from the Head
          </h3>

          <div className="mt-5 rounded-xl border-l-4 border-blue-700 bg-blue-50 p-6">
            <p className="leading-8 text-gray-700">
              Welcome to the <strong>{department.name}</strong>. Our
              department is committed to academic excellence, innovation,
              research, and holistic student development. We strive to
              create an environment that encourages curiosity, creativity,
              and lifelong learning while preparing students to meet the
              challenges of an ever-changing world.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Through experienced faculty members, modern teaching
              methodologies, and active participation in research and
              extracurricular activities, we aim to develop technically
              competent and socially responsible graduates capable of making
              meaningful contributions to society.
            </p>
          </div>

          <div className="mt-8 border-t pt-5">
            <h4 className="text-lg font-semibold text-gray-800">
              "{department.hod}"
            </h4>

            <p className="text-blue-700">
              Professor & Head, {department.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
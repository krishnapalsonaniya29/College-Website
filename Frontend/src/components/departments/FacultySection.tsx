import { facultyData } from "@/data/faculty";

interface FacultySectionProps {
  departmentSlug: string;
}

export default function FacultySection({
  departmentSlug,
}: FacultySectionProps) {
  const departmentFaculty =
    facultyData.find((item) => item.slug === departmentSlug)?.faculty || [];

  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <h2 className="mb-2 text-3xl font-bold text-gray-800">
        Faculty Members
      </h2>

      <p className="mb-8 text-gray-600">
        Meet our experienced and dedicated faculty members committed to
        academic excellence, research, and student success.
      </p>

      {departmentFaculty.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-gray-500">
          Faculty information will be updated soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departmentFaculty.map((faculty) => (
            <div
              key={faculty.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Faculty Image */}

              <div className="flex justify-center bg-slate-100 py-6">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>

              {/* Faculty Details */}

              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faculty.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-blue-700">
                  {faculty.designation}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {faculty.qualification}
                </p>

                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Specialization
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {faculty.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
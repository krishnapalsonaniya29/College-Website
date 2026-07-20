interface Faculty {
  id: number;
  name: string;
  designation: string;
 qualification: string;
  experience: number;
  email: string;
  photoUrl: string;
  isHOD: boolean;
}

interface FacultySectionProps {
  faculty: Faculty[];
}

export default function FacultySection({
  faculty,
}: FacultySectionProps) {
  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <h2 className="mb-2 text-3xl font-bold text-gray-800">
        Faculty Members
      </h2>

      <p className="mb-8 text-gray-600">
        Meet our experienced and dedicated faculty members committed to
        academic excellence, research, and student success.
      </p>

      {faculty.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-gray-500">
          Faculty information will be updated soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((teacher) => (
            <div
              key={teacher.id}
              className="overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex justify-center bg-slate-100 py-6">
                <img
                  src={teacher.photoUrl}
                  alt={teacher.name}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>

              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">
                  {teacher.name}
                </h3>

                <p className="mt-2 text-blue-700">
                  {teacher.designation}
                </p>

                <p className="mt-2 text-gray-500">
                  {teacher.qualification}
                </p>

                <div className="mt-4 border-t pt-4">
                  <p className="text-sm text-gray-600">
                    {teacher.experience} Years Experience
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {teacher.email}
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
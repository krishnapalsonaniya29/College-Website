interface Subject {
  id: number;
  subjectCode: string;
  subjectName: string;
  isActive: boolean;
}

interface Program {
  id: number;
  name: string;
  category: string;
  isActive: boolean;
  subjects: Subject[];
}

interface ProgramsContentProps {
  loading: boolean;
  programs: Program[];
  selectedCategory: string;
}

export default function ProgramsContent({
  loading,
  programs,
  selectedCategory,
}: ProgramsContentProps) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        Loading programs...
      </div>
    );
  }

  const filteredPrograms =
    selectedCategory === "ALL"
      ? programs
      : programs.filter(
          (program) =>
            program.category === selectedCategory
        );

  if (filteredPrograms.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        No programs found.
      </div>
    );
  }

  return (
    <>
      {filteredPrograms.map((program) => (
        <div
          key={program.id}
          className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Header */}

          <div className="bg-blue-900 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              {program.name}
            </h2>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  <th className="w-24 border border-slate-300 px-4 py-3 text-center">
                    Sr. No.
                  </th>

                  <th className="w-40 border border-slate-300 px-4 py-3 text-left">
                    Subject Code
                  </th>

                  <th className="border border-slate-300 px-4 py-3 text-left">
                    Subject Name
                  </th>
                </tr>
              </thead>

              <tbody>
                {program.subjects.filter((s) => s.isActive).length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-slate-300 px-4 py-6 text-center text-slate-500"
                    >
                      No subjects available.
                    </td>
                  </tr>
                ) : (
                  program.subjects
                    .filter((subject) => subject.isActive)
                    .map((subject, index) => (
                      <tr
                        key={subject.id}
                        className="transition hover:bg-blue-50"
                      >
                        <td className="border border-slate-300 px-4 py-4 text-center">
                          {index + 1}
                        </td>

                        <td className="border border-slate-300 px-4 py-4 font-medium">
                          {subject.subjectCode}
                        </td>

                        <td className="border border-slate-300 px-4 py-4">
                          {subject.subjectName}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}
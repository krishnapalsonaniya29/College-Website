import { FileText, ExternalLink } from "lucide-react";
import { syllabusData } from "@/data/syllabus";

interface Props {
  search: string;
  department: string;
  semester: string;
  course: string;
}

const SyllabusTable = ({ search }: Props) => {
  const filteredData = syllabusData.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.subject.toLowerCase().includes(keyword) ||
      item.code.toLowerCase().includes(keyword)
    );
  });

  if (filteredData.length === 0) {
    return (
      <div className="py-20 text-center">
        <FileText className="mx-auto mb-4 h-14 w-14 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-700">
          No syllabus found
        </h3>
        <p className="mt-2 text-gray-500">
          Try searching with another subject name or code.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">

        <thead className="sticky top-0 bg-slate-100">
          <tr className="border-b border-gray-300">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Subject Code
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Subject Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Course
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Semester
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Download
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-100 transition-all duration-200 hover:bg-blue-50"
            >
              <td className="px-6 py-5">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {item.code}
                </span>
              </td>

              <td className="px-6 py-5 font-medium text-gray-800">
                {item.subject}
              </td>

              <td className="px-6 py-5 text-gray-600">
                {item.course}
              </td>

              <td className="px-6 py-5 text-center">
                <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium">
                  Sem {item.semester}
                </span>
              </td>

              <td className="px-6 py-5 text-center">
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  <FileText size={18} />
                  View PDF
                  <ExternalLink size={15} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default SyllabusTable;
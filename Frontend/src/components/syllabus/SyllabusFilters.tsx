import { Filter } from "lucide-react";

interface Props {
  department: string;
  semester: string;
  course: string;
  onDepartmentChange: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onCourseChange: (value: string) => void;
}

const SyllabusFilters = ({
  department,
  semester,
  course,
  onDepartmentChange,
  onSemesterChange,
  onCourseChange,
}: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <Filter className="text-blue-600" size={22} />
        <h3 className="text-lg font-semibold text-gray-800">
          Filter Syllabus
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Department */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Department
          </label>

          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition"
          >
            <option value="">All Departments</option>
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Mechanical</option>
            <option>Civil</option>
            <option>Commerce</option>
            <option>Physics</option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Semester
          </label>

          <select
            value={semester}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition"
          >
            <option value="">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Course
          </label>

          <select
            value={course}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition"
          >
            <option value="">All Courses</option>
            <option>B.Sc.</option>
            <option>B.Com.</option>
            <option>B.A.</option>
            <option>BCA</option>
            <option>M.Sc.</option>
            <option>MCA</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SyllabusFilters;
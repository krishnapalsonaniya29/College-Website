import { Search, Filter } from "lucide-react";

interface StudentAchievement {
  id: number;
  name: string;
  course: string;
  achievement: string;
  description: string;
  photoUrl: string;
  achievementDate: string;
}

interface AchievementFiltersProps {
  achievements: StudentAchievement[];
  search: string;
  selectedCourse: string;
  onSearchChange: (value: string) => void;
  onCourseChange: (value: string) => void;
}

const AchievementFilters = ({
  achievements,
  search,
  selectedCourse,
  onSearchChange,
  onCourseChange,
}: AchievementFiltersProps) => {
  const courses = [
    "All Courses",
    ...Array.from(
      new Set(
        achievements
          .map((item) => item.course)
          .filter(Boolean)
          .sort()
      )
    ),
  ];

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  onSearchChange(e.target.value)
                }
                placeholder="Search by student name..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-14 pr-4 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Course Filter */}
            <div className="relative w-full lg:w-72">
              <Filter className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                value={selectedCourse}
                onChange={(e) =>
                  onCourseChange(e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-14 pr-5 outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              >
                {courses.map((course) => (
                  <option
                    key={course}
                    value={course}
                  >
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <span className="rounded-full bg-indigo-100 px-4 py-2 font-medium text-indigo-700">
              Total Records: {achievements.length}
            </span>

            {selectedCourse !== "All Courses" && (
              <span className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700">
                Course: {selectedCourse}
              </span>
            )}

            {search.trim() && (
              <span className="rounded-full bg-green-100 px-4 py-2 font-medium text-green-700">
                Search: "{search}"
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementFilters;
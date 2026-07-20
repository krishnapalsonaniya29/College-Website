import { useState } from "react";


import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import { useEffect, useMemo } from "react";
import api from "@/lib/api";

const SyllabusPage = () => {
  interface Program {
  id: number;
  name: string;
  category: string;
}

interface Subject {
  id: number;
  subjectCode: string;
  subjectName: string;
  program: Program;
}

interface Syllabus {
  id: number;
  semester: string;
  pdfUrl: string;
  isActive: boolean;
  subject: Subject;
}

const [loading, setLoading] = useState(true);

const [syllabus, setSyllabus] = useState<Syllabus[]>([]);

const [search, setSearch] = useState("");
const [program, setProgram] = useState("");
const [semester, setSemester] = useState("");

useEffect(() => {
  const fetchSyllabus = async () => {
    try {
      const res = await api.get("/syllabus");

      setSyllabus(
        res.data.data.filter(
          (item: Syllabus) => item.isActive
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchSyllabus();
}, []);

 const clearFilters = () => {
  setSearch("");
  setProgram("");
  setSemester("");
};

const filteredSyllabus = useMemo(() => {
  return syllabus.filter((item) => {
    const matchesSearch =
      item.subject.subjectName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.subject.subjectCode
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesProgram =
      !program ||
      item.subject.program.id ===
        Number(program);

    const matchesSemester =
      !semester ||
      item.semester === semester;

    return (
      matchesSearch &&
      matchesProgram &&
      matchesSemester
    );
  });
}, [
  syllabus,
  search,
  program,
  semester,
]);

  return (
    <div className="min-h-screen bg-slate-50">
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Syllabus"
        description="Browse and download the latest syllabus for all courses and subjects."
      />

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Heading */}
        

        <div className="my-10 border-t border-gray-200" />

        {/* Filters */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
  <input
    type="text"
    placeholder="Search subject..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="rounded-lg border p-3"
  />

  <select
    value={program}
    onChange={(e) =>
      setProgram(e.target.value)
    }
    className="rounded-lg border p-3"
  >
    <option value="">
      All Programs
    </option>

    {[
      ...new Map(
        syllabus.map((item) => [
          item.subject.program.id,
          item.subject.program,
        ])
      ).values(),
    ].map((program) => (
      <option
        key={program.id}
        value={program.id}
      >
        {program.name}
      </option>
    ))}
  </select>

  <select
    value={semester}
    onChange={(e) =>
      setSemester(e.target.value)
    }
    className="rounded-lg border p-3"
  >
    <option value="">
      All Semesters
    </option>

    {[
      ...new Set(
        syllabus.map(
          (s) => s.semester
        )
      ),
    ].map((semester) => (
      <option
        key={semester}
        value={semester}
      >
        {semester.replace(
          "_",
          " "
        )}
      </option>
    ))}
  </select>
</div>

        {/* Clear Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={clearFilters}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
          >
            Clear Filters
          </button>
        </div>

        

        {/* Table Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            Available Syllabus
          </h3>

          <p className="text-sm text-gray-500">
            Browse and download available syllabus documents.
          </p>
        </div>

        {/* Table */}
        {loading ? (
  <div className="p-10 text-center">
    Loading syllabus...
  </div>
) : filteredSyllabus.length === 0 ? (
  <div className="p-10 text-center text-gray-500">
    No syllabus found.
  </div>
) : (
  <table className="min-w-full">
    <thead className="bg-slate-100">
      <tr>
        <th className="px-5 py-4 text-left">
          Subject
        </th>

        <th className="px-5 py-4">
          Program
        </th>

        <th className="px-5 py-4">
          Semester
        </th>

        <th className="px-5 py-4">
          PDF
        </th>
      </tr>
    </thead>

    <tbody>
      {filteredSyllabus.map((item) => (
        <tr
  key={item.id}
  className="border-t transition hover:bg-slate-50"
>
  {/* Subject */}
  <td className="px-6 py-5">
    <div className="font-semibold text-slate-800">
      {item.subject.subjectName}
    </div>

    <div className="mt-1 text-sm text-slate-500">
      {item.subject.subjectCode}
    </div>
  </td>

  {/* Program */}
  <td className="px-6 py-5 text-center align-middle">
    <span className="font-medium text-slate-700">
      {item.subject.program.name}
    </span>
  </td>

  {/* Semester */}
  <td className="px-6 py-5 text-center align-middle">
    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
      {item.semester.replace("SEM", "Semester ")}
    </span>
  </td>

  {/* PDF */}
  <td className="px-6 py-5 text-center align-middle">
    <a
      href={item.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
    >
      View PDF
    </a>
  </td>
</tr>
      ))}
    </tbody>
  </table>
)}


              </section>

      <Footer />
    </div>
  );
};

export default SyllabusPage;
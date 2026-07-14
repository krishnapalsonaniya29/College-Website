// import { ugPrograms, pgPrograms } from "@/data/programs";

// interface ProgramsContentProps {
//   selected: "all" | "ug" | "pg";
// }

// const ProgramsContent = ({ selected }: ProgramsContentProps) => {
//   const renderTable = (title: string, programs: typeof ugPrograms) => (
//     <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//       <div className="bg-blue-900 px-6 py-4">
//         <h2 className="text-xl font-semibold text-white">{title}</h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="border border-slate-300 px-4 py-3 text-center">
//                 Sr. No.
//               </th>
//               <th className="border border-slate-300 px-4 py-3 text-left">
//                 Course Name
//               </th>
//               <th className="border border-slate-300 px-4 py-3 text-left">
//                 Subject Name
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {programs.map((program) => (
//               <tr
//                 key={program.srNo}
//                 className="transition hover:bg-blue-50"
//               >
//                 <td className="border border-slate-300 px-4 py-4 text-center align-top">
//                   {program.srNo}
//                 </td>

//                 <td className="border border-slate-300 px-4 py-4 font-medium align-top">
//                   {program.course}
//                 </td>

//                 <td className="border border-slate-300 px-4 py-4 leading-7 text-slate-700">
//                   {program.subjects}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {(selected === "all" || selected === "ug") &&
//         renderTable("Undergraduate Programs", ugPrograms)}

//       {(selected === "all" || selected === "ug") &&
//         renderTable("Undergraduate Programs", ugPrograms)}

//       {(selected === "all" || selected === "ug") &&
//         renderTable("Undergraduate Programs", ugPrograms)}

//       {(selected === "all" || selected === "pg") &&
//         renderTable("Postgraduate Programs", pgPrograms)}
//     </>
//   );
// };

// export default ProgramsContent;


import {
  ugPrograms,
  ugMultidisciplinarySubjects,
  ugVocationalSubjects,
  pgPrograms,
} from "@/data/programs";

interface ProgramsContentProps {
  selected: "all" | "ug" | "pg";
}

const ProgramsContent = ({ selected }: ProgramsContentProps) => {
  const renderProgramTable = (
    title: string,
    programs: typeof ugPrograms
  ) => (
    <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-blue-900 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-4 py-3 text-center w-24">
                Sr. No.
              </th>
              <th className="border border-slate-300 px-4 py-3 text-left w-72">
                Course Name
              </th>
              <th className="border border-slate-300 px-4 py-3 text-left">
                Subject Name
              </th>
            </tr>
          </thead>

          <tbody>
            {programs.map((program) => (
              <tr key={program.srNo} className="hover:bg-blue-50 transition">
                <td className="border border-slate-300 px-4 py-4 text-center align-top">
                  {program.srNo}
                </td>

                <td className="border border-slate-300 px-4 py-4 font-medium align-top">
                  {program.course}
                </td>

                <td className="border border-slate-300 px-4 py-4 leading-7 text-slate-700">
                  {program.subjects}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDepartmentTable = (
    title: string,
    data: typeof ugMultidisciplinarySubjects
  ) => (
    <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-blue-900 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-4 py-3 text-center w-24">
                Sr. No.
              </th>
              <th className="border border-slate-300 px-4 py-3 text-left w-72">
                Department Name
              </th>
              <th className="border border-slate-300 px-4 py-3 text-left">
                Course Name
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.srNo} className="hover:bg-blue-50 transition">
                <td className="border border-slate-300 px-4 py-4 text-center align-top">
                  {item.srNo}
                </td>

                <td className="border border-slate-300 px-4 py-4 font-medium align-top">
                  {item.department}
                </td>

                <td className="border border-slate-300 px-4 py-4 leading-7 text-slate-700">
                  {item.course}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {(selected === "all" || selected === "ug") && (
        <>
          {renderProgramTable("Undergraduate Programs", ugPrograms)}

          {renderDepartmentTable(
            "UG Multidisciplinary Subjects (Session 2025-26)",
            ugMultidisciplinarySubjects
          )}

          {renderDepartmentTable(
            "UG Vocational Subjects (Session 2025-26)",
            ugVocationalSubjects
          )}
        </>
      )}

      {(selected === "all" || selected === "pg") &&
        renderProgramTable("Postgraduate Programs", pgPrograms)}
    </>
  );
};

export default ProgramsContent;
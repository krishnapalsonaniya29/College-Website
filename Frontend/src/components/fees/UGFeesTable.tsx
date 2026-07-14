import { ugFees } from "@/data/fees";

const UGFeesTable = () => {
  return (
    <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-blue-900 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          UG 1st Year (2026–27) Fee Structure
        </h2>
      </div>

      

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th
                rowSpan={2}
                className="border border-slate-300 px-4 py-3 text-center font-semibold"
              >
                Sr. No.
              </th>

              <th
                rowSpan={2}
                className="border border-slate-300 px-4 py-3 text-left font-semibold"
              >
                Course Name
              </th>

              <th
                rowSpan={2}
                className="border border-slate-300 px-4 py-3 text-left font-semibold"
              >
                Subject Name
              </th>

              <th
                colSpan={4}
                className="border border-slate-300 px-4 py-3 text-center font-semibold"
              >
                Fees (₹)
              </th>
              <th
                colSpan={4}
                className="border border-slate-300 px-4 py-3 text-center font-semibold"
              >
                Vocational & MDC Subject Fees Extra
              </th>
            </tr>

            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-4 py-3 text-center font-semibold whitespace-nowrap">
                Non Practical
              </th>

              <th className="border border-slate-300 px-4 py-3 text-center font-semibold whitespace-nowrap">
                1 Practical
              </th>

              <th className="border border-slate-300 px-4 py-3 text-center font-semibold whitespace-nowrap">
                2 Practical
              </th>

              <th className="border border-slate-300 px-4 py-3 text-center font-semibold whitespace-nowrap">
                3 Practical
              </th>
            </tr>
          </thead>

          <tbody>
            {ugFees.map((fee) => (
              <tr
                key={fee.srNo}
                className="transition-colors hover:bg-blue-50"
              >
                <td className="border border-slate-300 px-4 py-4 text-center align-top">
                  {fee.srNo}
                </td>

                <td className="border border-slate-300 px-4 py-4 font-medium align-top">
                  {fee.course}
                </td>

                <td className="border border-slate-300 px-4 py-4 leading-7 text-slate-700">
                  {fee.subjects}
                </td>

                <td className="border border-slate-300 px-4 py-4 text-center whitespace-nowrap">
                  {fee.nonPractical}
                </td>

                <td className="border border-slate-300 px-4 py-4 text-center whitespace-nowrap">
                  {fee.onePractical}
                </td>

                <td className="border border-slate-300 px-4 py-4 text-center whitespace-nowrap">
                  {fee.twoPractical}
                </td>

                <td className="border border-slate-300 px-4 py-4 text-center whitespace-nowrap">
                  {fee.threePractical}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UGFeesTable;
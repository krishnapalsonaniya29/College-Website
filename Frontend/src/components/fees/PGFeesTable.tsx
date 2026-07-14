import { pgFees } from "@/data/fees";

const PGFeesTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-blue-900 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          PG 1st Year (After 4th Year) Fee Structure (2026–27)
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-4 py-3 text-center font-semibold">
                Sr. No.
              </th>

              <th className="border border-slate-300 px-4 py-3 text-left font-semibold">
                Course Name
              </th>

              <th className="border border-slate-300 px-4 py-3 text-center font-semibold">
                Seats
              </th>

              <th className="border border-slate-300 px-4 py-3 text-center font-semibold whitespace-nowrap">
                Fees (₹)
              </th>
            </tr>
          </thead>

          <tbody>
            {pgFees.map((fee) => (
              <tr
                key={fee.srNo}
                className="transition-colors hover:bg-blue-50"
              >
                <td className="border border-slate-300 px-4 py-4 text-center">
                  {fee.srNo}
                </td>

                <td className="border border-slate-300 px-4 py-4 font-medium text-slate-800">
                  {fee.course}
                </td>

                <td className="border border-slate-300 px-4 py-4 text-center">
                  {fee.seats}
                </td>

                <td className="border border-slate-300 px-4 py-4 text-center font-semibold text-blue-900 whitespace-nowrap">
                  {fee.fees}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PGFeesTable;
import { Users } from "lucide-react";
import { motion } from "framer-motion";

const committeeMembers = [
  {
    name: "Dr. Aruna Purohit",
    designation: "Coordinator",
    phone: "9425347448",
  },
  {
    name: "Dr. Satyapram Chauhan",
    designation: "Co-Coordinator",
    phone: "9425074333",
  },
  {
    name: "Dr. Jyotika Sharma",
    designation: "Member",
    phone: "9826049595",
  },
  {
    name: "Dr. Vinod Joshi",
    designation: "Member",
    phone: "9424513116",
  },
  {
    name: "Dr. Ashok Sarvdeva",
    designation: "Member",
    phone: "9926083522",
  },
  {
    name: "Dr. Kanchan Parihar",
    designation: "Member",
    phone: "9993487395",
  },
  {
    name: "Mrs. Mamta Patidar",
    designation: "Member",
    phone: "9977970099",
  },
  {
    name: "Mr. Shweta Rajpura",
    designation: "Student Representative",
    phone: "9752483060",
  },
];

const CommitteeMembers = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Users className="text-blue-900" size={24} />
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
                Student Welfare
              </span>

              <h2 className="text-3xl font-bold text-slate-900">
                Anti-Ragging Committee
              </h2>
            </div>
          </div>

          <div className="mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Intro */}
        <div className="px-8 pt-6">
          <p className="leading-8 text-gray-700">
            The Anti-Ragging Committee has been constituted to ensure a safe,
            respectful, and ragging-free environment for all students. Students
            may contact any committee member for assistance or to report any
            incident confidentially.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-8">
          <table className="w-full overflow-hidden rounded-xl border border-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left">S.No.</th>
                <th className="px-6 py-4 text-left">Committee Member</th>
                <th className="px-6 py-4 text-left">Designation</th>
                <th className="px-6 py-4 text-left">Contact Number</th>
              </tr>
            </thead>

            <tbody>
              {committeeMembers.map((member, index) => (
                <tr
                  key={member.phone}
                  className="border-b last:border-b-0 hover:bg-blue-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {member.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {member.designation}
                  </td>

                  <td className="px-6 py-4 font-medium text-blue-800">
                    {member.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-5">
          <p className="text-sm text-gray-600">
            Students can approach any committee member regarding ragging-related
            concerns. All complaints will be treated confidentially and handled
            according to UGC Anti-Ragging Regulations.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CommitteeMembers;
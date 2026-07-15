import { motion } from "framer-motion";
import {
  Phone,
  CalendarDays,
  FileText,
  User,
} from "lucide-react";

const links = [
  { icon: Phone, label: "Contact", href: "#" },
  { icon: CalendarDays, label: "Timetable", href: "#" },
  { icon: FileText, label: "Prospectus", href: "#" },
];

const loginOptions = [
  "Login",
  "Student",
  "Online Test",
  "IQAC",
  "Exam Service",
  "Web Admin",
  "Employee",
  "HOD/Admin",
];

function TopHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full border-t-4 border-gray-700 border-b border-gray-200 bg-[#f5f5f5]"
    >
      <div className="mx-auto flex h-14 max-w-[1350px] items-center justify-between whitespace-nowrap px-4">
        {/* Left */}
        <h1 className="select-none font-serif text-xl font-bold text-[#5c67d8]">
          
        माता जीजाबाई  स्वायत्त पीजी गर्ल्स कॉलेज, इंदौर
        </h1>

        {/* Right */}
        <div className="flex items-center gap-3 text-sm">
          {/* Navigation Links */}
          <div className="hidden items-center gap-2 xl:flex">
            {links.map(({ icon: Icon, label, href }, index) => (
              <div key={label} className="flex items-center gap-2">
                <a
                  href={href}
                  className="flex items-center gap-1 font-medium text-black transition hover:text-blue-600"
                >
                  <Icon size={14} />
                  {label}
                </a>

                {index !== links.length - 1 && (
                  <span className="text-gray-500">|</span>
                )}
              </div>
            ))}

            <span className="text-gray-500">|</span>
          </div>

          {/* Student Corner */}
          <button className="flex items-center gap-2 rounded-sm border border-lime-700 bg-lime-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-lime-600">
            <User size={15} />
            Student Corner
          </button>

          {/* Employee Corner */}
          <button className="flex items-center gap-2 rounded-sm border border-orange-600 bg-orange-400 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-orange-500">
            <User size={15} />
            Employee Corner
          </button>

          {/* Login */}
          <select className="w-36 cursor-pointer rounded-sm border border-[#42668c] bg-[#4f79a7] px-3 py-1.5 text-sm font-medium text-white outline-none transition hover:bg-[#3f6489]">
            {loginOptions.map((option) => (
              <option key={option} className="text-white">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.header>
  );
}

export default TopHeader;
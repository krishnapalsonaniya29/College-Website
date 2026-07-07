import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const menuItems = [
  { title: "Home", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Departments", href: "#" },
  { title: "Courses", href: "#" },
  { title: "Research", href: "#" },
  { title: "Syllabus", href: "#" },

  {
    title: "Library",
    children: ["E-Library", "Library", "DELNET"],
  },

  { title: "Examination", href: "#" },
  { title: "Policy", href: "#" },
  

  {
    title: "IQAC",
    children: ["IQAC", "AQAR", "SSR", "NAAC"],
  },

  {
    title: "Gallery",
    children: [
      "Media Coverage",
      "Old Photo Gallery",
      "New Photo Gallery",
    ],
  },

  {
    title: "Flagship Programs",
    children: ["Aarogyam", "Eklavya", "Harit Vasundhara", "Manvata", "Sewa Sankalp Samiti", "Udgam", "Udghosh", "Bhartiya Gyan Parampara Prakosth" ],
  },

  {
    title: "Others",
    children: ["NCC", "NSS", "Newsletter", "Placement Cell", "Alumni Association", "Grievance Redressal", "Vocational Cell"],
  },
  
];

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-md"
    >
      <div className="mx-auto flex max-w-[1350px] items-center justify-center">
        {menuItems.map((item) => (
          <div key={item.title} className="group relative">
            {/* Menu Button */}
            <button className="flex items-center gap-1 border-r border-blue-700 px-5 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-blue-700">
              {item.title}

              {item.children && (
                <ChevronDown
                  size={12}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              )}
            </button>

            {/* Dropdown */}
            {item.children && (
              <div
                className={`invisible absolute top-full mt-1 min-w-56 rounded-md border border-gray-200 bg-white shadow-xl opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 ${
                    ["Gallery", "Flagship Programs", "Others"].includes(item.title)
                    ? "right-0"
                    : "left-0"
                }`}
                >
                {item.children.map((child) => (
                  <a
                    key={child}
                    href="#"
                    className="block border-b border-gray-100 px-5 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {child}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
}

export default Navbar;
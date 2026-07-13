

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Departments",
    href: "/departments",
  },
  {
    title: "Courses",
    href: "#",
  },
  {
    title: "Research",
    href: "#",
  },
  {
    title: "Syllabus",
    href: "#",
  },
  {
    title: "Library",
    children: [
      { title: "E-Library", href: "#" },
      { title: "Library", href: "#" },
      { title: "DELNET", href: "#" },
    ],
  },
  {
    title: "Examination",
    href: "#",
  },
  {
    title: "Policy",
    href: "#",
  },
  {
    title: "IQAC",
    children: [
      { title: "IQAC", href: "#" },
      { title: "AQAR", href: "#" },
      { title: "SSR", href: "#" },
      { title: "NAAC", href: "#" },
    ],
  },
  {
    title: "Gallery",
    children: [
      { title: "Media Coverage", href: "#" },
      { title: "Old Photo Gallery", href: "#" },
      { title: "New Photo Gallery", href: "#" },
    ],
  },
  {
    title: "Flagship Programs",
    children: [
      { title: "Aarogyam", href: "#" },
      { title: "Eklavya", href: "#" },
      { title: "Harit Vasundhara", href: "#" },
      { title: "Manvata", href: "#" },
      { title: "Sewa Sankalp Samiti", href: "#" },
      { title: "Udgam", href: "#" },
      { title: "Udghosh", href: "#" },
      { title: "Bhartiya Gyan Parampara Prakosth", href: "#" },
    ],
  },
  {
    title: "Others",
    children: [
      { title: "Anti Ragging", href: "/anti-ragging" },
      { title: "NCC", href: "#" },
      { title: "NSS", href: "#" },
      { title: "Newsletter", href: "#" },
      { title: "Placement Cell", href: "#" },
      { title: "Alumni Association", href: "#" },
      { title: "Grievance Redressal", href: "#" },
      { title: "Vocational Cell", href: "#" },
    ],
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
            {/* Top Menu Item */}
            {item.children ? (
              <button className="flex items-center gap-1 border-r border-blue-700 px-5 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-blue-700">
                {item.title}

                <ChevronDown
                  size={12}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </button>
            ) : (
              <Link
                to={item.href!}
                className="flex items-center gap-1 border-r border-blue-700 px-5 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-blue-700"
              >
                {item.title}
              </Link>
            )}

            {/* Dropdown */}
            {item.children && (
              <div
                className={`invisible absolute top-full mt-1 min-w-64 rounded-md border border-gray-200 bg-white shadow-xl opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 ${
                  ["Gallery", "Flagship Programs", "Others"].includes(item.title)
                    ? "right-0"
                    : "left-0"
                }`}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.title}
                    to={child.href}
                    className="block border-b border-gray-100 px-5 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700 last:border-b-0"
                  >
                    {child.title}
                  </Link>
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
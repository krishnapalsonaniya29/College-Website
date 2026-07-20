

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
    title: "Programs",
    href: "/programs",
  },
  {
    title: "Admissions",
    children: [
      { title: "Notice", href: "/admissions/notice" },
      { title: "Fees", href: "/fees" },
      
    ],
  },
  {
    title: "Syllabus",
    href: "/syllabus",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Events",
    href: "/events",
  },
  // {
  //   title: "News",
  //   children:[
  //     {      title: "News",      href: "/news",},
  //     {title: "Events", href: "/events"},

  //   ]
  // },
  {
    title: "Sports",
    href: "/sports",
    
  },
  {
    title: "Examination",
    href: "/coming-soon",
  },
  
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "Alumni",
    href: "/alumni",
  },
  
  {
    title: "Others",
    children: [
      
      { title: "NCC", href: "/coming-soon" },
      { title: "NSS", href: "/coming-soon" },
      { title: "Anti Ragging", href: "/anti-ragging" },
      { title: "Higher Education ", href: "https://highereducation.mp.gov.in/" },
      { title: "Student Achievement", href: "/studentachievementpage" },
  
      { title: "Vocational Cell", href: "/coming-soon" },
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
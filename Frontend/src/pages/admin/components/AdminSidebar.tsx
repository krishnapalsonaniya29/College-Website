import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin" },

  { name: "Hero", path: "/admin/hero" },
  { name: "Home", path: "/admin/home" },
  { name: "About", path: "/admin/about" },

  { name: "Departments", path: "/admin/department" },
  { name: "Faculty", path: "/admin/faculty" },

  { name: "Gallery", path: "/admin/gallery" },

  { name: "Programs", path: "/admin/program" },
  { name: "Subjects", path: "/admin/subject" },
  { name: "Syllabus", path: "/admin/syllabus" },
  {name: "Student Achievement", path: "/admin/studentAchievementAdmin"},

  


  { name: "Alumni", path: "/admin/alumni" },

  { name: "Events", path: "/admin/events" },
  { name: "News", path: "/admin/news" },

  { name: "Sports", path: "/admin/sportsachievement" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="border-b border-slate-700 p-5">
        <h1 className="text-xl font-bold">
          College CMS
        </h1>
      </div>

      <nav className="flex flex-col p-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `rounded-md px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
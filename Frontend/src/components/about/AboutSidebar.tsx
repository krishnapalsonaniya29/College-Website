import {
  Building2,
  Target,
  Eye,
  GraduationCap,
  BookOpen,
  Phone,
} from "lucide-react";

const menuItems = [
  {
    title: "About Institute",
    icon: Building2,
    href: "#about",
  },
  {
    title: "Vision & Mission",
    icon: Eye,
    href: "#vision",
  },
  {
    title: "Principal's Message",
    icon: GraduationCap,
    href: "#principal",
  },
  {
    title: "Facilities",
    icon: BookOpen,
    href: "#facilities",
  },
  {
    title: "Objectives",
    icon: Target,
    href: "#objectives",
  },
  {
    title: "Contact",
    icon: Phone,
    href: "#contact",
  },
];

const AboutSidebar = () => {
  return (
    <div className="space-y-6 lg:sticky lg:top-6">
      {/* Navigation Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-blue-900 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Quick Navigation
          </h2>
        </div>

        <nav className="p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                className="group flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-900"
              >
                <Icon
                  size={18}
                  className="text-blue-800 group-hover:scale-110 transition-transform"
                />

                <span className="font-medium">{item.title}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Contact Card */}
      <div className="rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 p-6 text-white shadow-sm">
        <h3 className="text-lg font-semibold mb-3">
          Need Assistance?
        </h3>

        <p className="text-sm text-blue-100 leading-6">
          Contact our admission office for information regarding courses,
          eligibility, admissions, and campus facilities.
        </p>

        <button className="mt-5 w-full rounded-lg bg-amber-400 py-3 font-semibold text-slate-900 transition hover:bg-amber-300">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutSidebar;
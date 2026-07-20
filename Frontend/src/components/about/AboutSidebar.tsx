import {
  Building2,
  Eye,
  Target,
  GraduationCap,
  Mail,
} from "lucide-react";

const menuItems = [
  {
    title: "About Institute",
    icon: Building2,
    href: "#about",
  },
  {
    title: "Vision",
    icon: Eye,
    href: "#vision",
  },
  {
    title: "Mission",
    icon: Target,
    href: "#mission",
  },
  {
    title: "Objectives",
    icon: Target,
    href: "#objectives",
  },
  {
    title: "Principal's Message",
    icon: GraduationCap,
    href: "#principal",
  },
];

const AboutSidebar = () => {
  return (
    <div className="space-y-6 lg:sticky lg:top-6">
      {/* Navigation */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Quick Navigation
          </h2>
        </div>

        <nav className="p-3">
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
                  className="text-blue-800 transition-transform group-hover:scale-110"
                />

                <span className="font-medium">
                  {item.title}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Information Card */}
      <div className="rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 p-6 text-white shadow-sm">
        <h3 className="text-lg font-semibold">
          About This Institute
        </h3>

        <p className="mt-3 text-sm leading-6 text-blue-100">
          Explore the institute's vision, mission,
          objectives, and the Principal's message to
          understand our commitment to quality
          education and holistic student development.
        </p>

        <a
          href="#about"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-3 font-semibold text-slate-900 transition hover:bg-amber-300"
        >
          <Mail size={18} />
          Explore Institute
        </a>
      </div>
    </div>
  );
};

export default AboutSidebar;
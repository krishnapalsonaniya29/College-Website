import { Award, BookOpen, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Students",
  },
  {
    icon: BookOpen,
    value: "35+",
    label: "Courses",
  },
  {
    icon: Building2,
    value: "12",
    label: "Departments",
  },
  {
    icon: Award,
    value: "40+",
    label: "Years of Excellence",
  },
];

const AboutInstitute = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-2xl shadow-md">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop"
          alt="College Campus"
          className="h-[360px] w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Content Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-800">
            About the Institute
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Excellence in Education, Innovation & Character Building
          </h2>

          <div className="mt-4 h-1 w-20 rounded-full bg-amber-400"></div>
        </div>

        <div className="space-y-5 text-justify leading-8 text-gray-700">
          <p>
            Mata jijabai Government PG girls Indore has been a flag bearing institute for girls education in Madhya Pradesh since 1956.The college,one of the oldest Girls college of the state of Madhya Pradesh,has always catered to the holistic development of girls scince its inception in 1956.

          </p>

          <p>
           Date of establishment of college is 1.07.1956 College get autonomy by UGC by 1.02.1997.

          </p>
          <p>College recognised by 2f of UGC by 1.07.1956 and by 12B of UGC by 1.07.1956.
</p>
          <p>
            The college has adequate availability of space with an area of 17.44 acers of land area,with a built up area of 26881 sq.m.

          </p>
          <p>As a multifaculty institution the college offers programmes in all the four streams Arts,Science, commerce and home science.
</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Icon className="text-blue-900" size={28} />
              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="mt-1 text-gray-600">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AboutInstitute;
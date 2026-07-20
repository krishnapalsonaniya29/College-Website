import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

function AboutAlumni() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <GraduationCap className="text-white" size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Alumni Association
            </h2>
            <p className="text-sm text-blue-100">
              Connecting generations of excellence
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 p-8">
          <p className="text-justify text-[15px] leading-8 text-gray-700">
            The Alumni Association serves as a lifelong connection between the
            institution and its graduates. It brings together former students
            from diverse academic backgrounds, encouraging professional
            networking, knowledge sharing, and meaningful collaboration while
            maintaining a strong bond with the college community.
          </p>

          <p className="text-justify text-[15px] leading-8 text-gray-700">
            Our alumni have excelled in education, research, public service,
            entrepreneurship, industry, and many other fields. Their remarkable
            achievements continue to inspire current students and strengthen the
            reputation of the institution. The college takes pride in celebrating
            their success and values their continued support in mentoring,
            guiding, and contributing to the growth of future generations.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutAlumni;
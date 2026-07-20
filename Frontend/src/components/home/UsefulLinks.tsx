import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const links = [
  {
    title: "E-Pravesh",
    url: "https://epravesh.highereducation.mp.gov.in/",
  },
  {
    title: "Higher Education",
    url: "https://highereducation.mp.gov.in/",
  },
  {
    title: "Swayam NPTEL",
    url: "#",
  },
  {
    title: "Alumni Association",
    url: "#",
  },
  {
    title: "Admission",
    url: "#",
  },
  {
    title: "DAVV",
    url: "https://www.dauniv.ac.in/",
  },
  {
    title: "UGC",
    url: "https://www.ugc.gov.in/",
  },
  {
    title: "MP Online",
    url: "https://mponlinelimited.com/",
  },
 
  
  {
    title: "NIRF",
    url: "https://www.nirfindia.org/",
  },
  {
    title: "Institutional Club",
    url: "/coming-soon",
  },
];

function UsefulLinks() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Useful Links
        </h2>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-5 p-6">
        {links.map((link) => (
        <a
          key={link.title}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-full bg-[#12388f] px-5 py-3 text-center font-medium text-white shadow transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
          >
            <span>{link.title}</span>

            <ExternalLink
              size={16}
              className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
            />
          </a>
        ))}
      </div>
    </motion.section>
  );
}

export default UsefulLinks;
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const links = [
  {
    title: "Parents Login",
    color: "from-orange-700 to-orange-500",
  },
  {
    title: "Code of Conduct",
    color: "from-green-700 to-green-500",
  },
  {
    title: "IEHE THE QUEST",
    color: "from-red-700 to-red-500",
  },
  {
    title: "POs, PSOs, COs",
    color: "from-amber-700 to-amber-500",
  },
  {
    title: "Flagship Programs",
    color: "from-cyan-700 to-cyan-500",
  },
  {
    title: "संस्थागत ज्ञान",
    color: "from-blue-700 to-blue-500",
  },
  {
    title: "SDGs Awareness",
    color: "from-pink-700 to-pink-500",
  },
];

function OtherLinks() {
  return (
    <section className="mx-auto mt-8 max-w-[1350px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Other Links
        </h2>
      </div>

      {/* Moving Cards */}
      <div className="overflow-hidden py-8">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...links, ...links].map((item, index) => (
            <a
              key={index}
              href="#"
              className={`group flex h-20 w-[260px] shrink-0 items-center gap-4 rounded-xl bg-gradient-to-r ${item.color} px-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/90 shadow">
                <img
                  src={`https://picsum.photos/60?random=${index + 20}`}
                  alt=""
                  className="h-10 w-10 rounded object-cover"
                />
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
              </div>

              <ExternalLink
                size={18}
                className="text-white opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default OtherLinks;
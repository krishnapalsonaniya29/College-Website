import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import image1 from "../../assets/images/mohan_yadav.webp";
import image2 from "../../assets/images/inder_parmar.webp";
const guides = [
  {
    name: "डॉ. मोहन यादव",
    designation: "माननीय मुख्यमंत्री, मध्यप्रदेश शासन",
    image: image1,
  },
  {
    name: "श्री इंदर सिंह परमार",
    designation: "माननीय उच्च शिक्षा मंत्री, मध्यप्रदेश शासन",
    image: image2,
  },
  {
    name: "डॉ. अशोक कुमार",
    designation: "माननीय संचालक, उच्च शिक्षा विभाग",
    image: "",
  },
];

function GuidesSection() {
  return (
    <section className="mx-auto mt-8 max-w-[1350px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          हमारे मार्गदर्शक
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-10 px-10 py-10 md:grid-cols-3">
        {guides.map((guide, index) => (
          <motion.div
            key={guide.name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group text-center"
          >
            {/* Photo */}
            <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full border-4 border-gray-200 shadow-md transition-all duration-300 group-hover:border-blue-600 group-hover:shadow-xl">
              <img
                src={guide.image}
                alt={guide.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-red-700">
              {guide.name}
            </h3>

            {/* Designation */}
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {guide.designation}
            </p>

            {/* Button */}
            <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-700 px-5 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-700 hover:text-white">
              संदेश
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default GuidesSection;
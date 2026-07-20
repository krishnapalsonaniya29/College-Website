import { motion } from "framer-motion";
import {
  Library,
  MonitorSmartphone,
  FlaskConical,
  Dumbbell,
  ShieldCheck,
  Trees,
  ArrowRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const facilities = [
  {
    title: "Central Library",
    description:
      "A well-stocked library with thousands of books, journals and digital learning resources.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80",
    icon: Library,
  },
  {
    title: "Smart Classrooms",
    description:
      "Technology-enabled classrooms with projectors and interactive teaching methods.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    icon: MonitorSmartphone,
  },
  {
    title: "Science Laboratories",
    description:
      "Modern Physics, Chemistry, Botany and Zoology laboratories for practical learning.",
    image:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=1200&q=80",
    icon: FlaskConical,
  },
  {
    title: "Sports Facilities",
    description:
      "Indoor and outdoor sports facilities promoting physical fitness and teamwork.",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
    icon: Dumbbell,
  },
  {
    title: "Safe Campus",
    description:
      "24×7 security, CCTV surveillance and a safe, supportive environment for women students.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    icon: ShieldCheck,
  },
  {
    title: "Green Campus",
    description:
      "Beautiful gardens, open spaces and an eco-friendly environment that inspires learning.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    icon: Trees,
  },
];

function CampusFacilities() {
  return (
    <motion.section
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Campus Facilities
        </h2>

        <p className="mt-1 text-sm text-blue-100">
          Modern infrastructure for academic excellence and holistic development.
        </p>
      </div>

      <div className="p-5">
        <Swiper
          modules={[Autoplay]}
          loop
          grabCursor
          spaceBetween={20}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <SwiperSlide key={facility.title}>
                <motion.div
                  whileHover={{
                    y: -6,
                  }}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
                      <Icon className="h-5 w-5 text-blue-700" />
                    </div>

                    <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white">
                      {facility.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                      {facility.description}
                    </p>

                   
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </motion.section>
  );
}

export default CampusFacilities;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Quote,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import api from "@/lib/api";

import "swiper/css";
import "swiper/css/navigation";

interface Alumni {
  id: number;
  name: string;
  course: string;
  batch: number;
  profession: string;
  company?: string;
  message: string;
  photoUrl: string;
  isActive: boolean;
}

function AlumniViews() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await api.get("/alumni");

        setAlumni(res.data.data);
      } catch (err) {
        console.error("Failed to fetch alumni", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mx-auto mt-8 max-w-[1350px] rounded-xl border border-gray-200 bg-white shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
        <h2 className="text-lg font-semibold text-white">
          Alumni Views
        </h2>

        <Link
          to="/alumni"
          className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          View All
        </Link>
      </div>

      <div className="relative p-6">
        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading alumni...
          </div>
        ) : alumni.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No alumni found.
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".alumni-prev",
              nextEl: ".alumni-next",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={alumni.length > 3}
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {alumni.map((person) => (
              <SwiperSlide key={person.id}>
                <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <Quote
                    size={30}
                    className="mb-3 text-blue-700 opacity-20"
                  />

                  <p className="line-clamp-4 text-sm leading-7 text-gray-600">
                    {person.message}
                  </p>

                  <div className="mt-5 flex items-center gap-4 border-t pt-4">
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="h-14 w-14 rounded-full border-2 border-blue-600 object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {person.name}
                      </h3>

                      <p className="text-sm text-blue-700">
                        {person.course}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                        <GraduationCap size={13} />
                        Batch {person.batch}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!loading && alumni.length > 3 && (
          <>
            <button className="alumni-prev absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-blue-700 hover:text-white">
              <ChevronLeft />
            </button>

            <button className="alumni-next absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-blue-700 hover:text-white">
              <ChevronRight />
            </button>
          </>
        )}
      </div>
    </motion.section>
  );
}

export default AlumniViews;
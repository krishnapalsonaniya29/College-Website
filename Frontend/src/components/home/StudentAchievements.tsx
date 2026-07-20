import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import api from "@/lib/api";

interface StudentAchievement {
  id: number;
  name: string;
  course: string;
  achievement: string;
  description: string;
  photoUrl: string;
  achievementDate: string;
}

function StudentAchievements() {
  const [students, setStudents] = useState<StudentAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);

      const res = await api.get("/student-achievements");

      setStudents(res.data.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-5 py-3">
          <h2 className="text-lg font-semibold text-white">
            Student Achievements
          </h2>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 p-4"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-gray-200" />

                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-3 w-24 rounded bg-gray-200" />
                </div>
              </div>

              <div className="h-5 w-24 rounded bg-gray-200" />

              <div className="mt-4 h-3 rounded bg-gray-200" />
              <div className="mt-2 h-3 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!students.length) return null;

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
          Student Achievements
        </h2>
      </div>

      {/* Slider */}
      <div className="p-5">
        <Swiper
          modules={[Autoplay]}
          loop={students.length > 3}
          spaceBetween={20}
          grabCursor
          autoplay={{
            delay: 3000,
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
          {students.map((student) => (
            <SwiperSlide key={student.id}>
              <div className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Top */}
                <div className="flex items-center gap-3">
                  <img
                    src={student.photoUrl}
                    alt={student.name}
                    className="h-16 w-16 rounded-full border-2 border-blue-600 object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {student.name}
                    </h3>

                    <p className="text-sm text-blue-700">
                      {student.course}
                    </p>
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Achievement
                  </span>
                </div>

                {/* Achievement */}
                <div className="mt-3 flex items-center gap-2">
                  <Award
                    size={16}
                    className="text-orange-500"
                  />

                  <span className="line-clamp-1 text-sm font-medium text-gray-700">
                    {student.achievement}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-700">
                  {student.description}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <GraduationCap size={14} />
                    {student.course}
                  </span>

                  <span className="flex items-center gap-1">
                    <CalendarDays size={13} />
                    {new Date(
                      student.achievementDate
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}

export default StudentAchievements;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import api from "@/lib/api";

import "swiper/css";
import "swiper/css/navigation";

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

function LatestPhotographs() {
  const [photos, setPhotos] = useState<
    GalleryImage[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/gallery");

        // Latest 8 images
        setPhotos(res.data.data.slice(0, 8));
      } catch (err) {
        console.error(
          "Failed to fetch gallery",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
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
        <div className="flex items-center gap-2">
          <Images
            className="text-white"
            size={20}
          />

          <h2 className="text-lg font-semibold text-white">
            Latest Photographs
          </h2>
        </div>

        <Link
          to="/gallery"
          className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          All Photo Gallery
        </Link>
      </div>

      <div className="relative p-5">
        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading photographs...
          </div>
        ) : photos.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No photographs available.
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".gallery-next",
              prevEl: ".gallery-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={photos.length > 4}
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <div className="group overflow-hidden rounded-xl shadow">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="bg-white p-3">
                    <h3 className="line-clamp-1 text-sm font-semibold text-gray-700">
                      {photo.title}
                    </h3>

                    <p className="mt-1 text-xs uppercase text-gray-500">
                      {photo.category.replace(
                        "_",
                        " "
                      )}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!loading && photos.length > 4 && (
          <>
            <button className="gallery-prev absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-blue-700 hover:text-white">
              <ChevronLeft />
            </button>

            <button className="gallery-next absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-blue-700 hover:text-white">
              <ChevronRight />
            </button>
          </>
        )}
      </div>
    </motion.section>
  );
}

export default LatestPhotographs;
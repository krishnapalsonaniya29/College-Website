// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";

// // Import your local image
// import collegeLogo from "@/assets/images/college_logo2.png";
// // or use a relative path:
// // import collegeLogo from "../../assets/images/college_logo2.png";

// const images = [
//   "https://picsum.photos/1400/650?random=1",
//   "https://picsum.photos/1400/650?random=2",
//   "https://picsum.photos/1400/650?random=3",
//   "https://picsum.photos/1400/650?random=4",
//   "https://picsum.photos/1400/650?random=5",
//   "https://picsum.photos/1400/650?random=6",
//   collegeLogo,
// ];

// function HeroCarousel() {
//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="mx-auto mt-6 max-w-[1350px] overflow-hidden rounded-2xl shadow-2xl"
//     >
//       <Swiper
//         modules={[Autoplay, EffectFade, Pagination]}
//         effect="fade"
//         loop
//         speed={1000}
//         autoplay={{
//           delay: 3500,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         className="h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[400px]"
//       >
//         {images.map((image, index) => (
//           <SwiperSlide key={index}>
//             <img
//               src={image}
//               alt={`Slide ${index + 1}`}
//               className="h-full w-full object-cover transition-transform duration-[4000ms] hover:scale-105"
//             />
//           </SwiperSlide>
//         ))} 
//       </Swiper>
//     </motion.section>
//   );
// }

// export default HeroCarousel;




import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import api from "@/lib/api";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  displayOrder: number;
  isActive: boolean;
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await api.get("/hero");

        setSlides(res.data.data);
      } catch (error) {
        console.error("Failed to fetch hero slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto mt-6 h-[180px] max-w-[1350px] animate-pulse rounded-2xl bg-gray-200 sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[400px]" />
    );
  }

  if (slides.length === 0) {
    return (
      <div className="mx-auto mt-6 flex h-[180px] max-w-[1350px] items-center justify-center rounded-2xl bg-gray-100 text-gray-500 shadow sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[400px]">
        No hero slides available.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-6 max-w-[1350px] overflow-hidden rounded-2xl shadow-2xl"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={slides.length > 1}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[400px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl px-8 text-white md:px-16">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
                  >
                    {slide.title}
                  </motion.h2>

                  {slide.subtitle && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6 max-w-xl text-sm text-gray-200 sm:text-base md:text-lg"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}

                  {slide.buttonText && slide.buttonLink && (
                    <motion.a
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      href={slide.buttonLink}
                      className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      {slide.buttonText}
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}
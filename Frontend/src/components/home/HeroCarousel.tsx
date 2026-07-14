import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Import your local image
import collegeLogo from "@/assets/images/college_logo2.png";
// or use a relative path:
// import collegeLogo from "../../assets/images/college_logo2.png";

const images = [
  "https://picsum.photos/1400/650?random=1",
  "https://picsum.photos/1400/650?random=2",
  "https://picsum.photos/1400/650?random=3",
  "https://picsum.photos/1400/650?random=4",
  "https://picsum.photos/1400/650?random=5",
  "https://picsum.photos/1400/650?random=6",
  collegeLogo,
];

function HeroCarousel() {
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
        loop
        speed={1000}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[400px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-[4000ms] hover:scale-105"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}

export default HeroCarousel;
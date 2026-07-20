// import { useEffect, useState } from "react";

// import TopHeader from "@/components/common/TopHeader";
// import MainHeader from "@/components/common/MainHeader";
// import Navbar from "@/components/common/Navbar";
// import Footer from "@/components/common/Footer";
// import PageBanner from "@/components/common/PageBanner";

// import GalleryGrid from "@/components/gallery/GalleryGrid";

// import GalleryPagination from "@/components/gallery/GalleryPagination";
// import GalleryModal from "@/components/gallery/GalleryModal";

// import {
//   galleryImages,
//   IMAGES_PER_PAGE,
// } from "@/data/gallery";

// const GalleryPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const [category, setCategory] = useState("All");

//   // Reset pagination when category changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [category]);

//  const totalPages = Math.max(
//   1,
//   Math.ceil(galleryImages.length / IMAGES_PER_PAGE)
// );

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <TopHeader />
//       <MainHeader />
//       <Navbar />

//       <PageBanner
//         title="Photo Gallery"
//         description="Explore memorable moments and events from our college."
//       />

//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

//         {/* Category Filter */}
        

//         {/* Gallery */}
//         <GalleryGrid
//           currentPage={currentPage}
          
//           onImageClick={setSelectedIndex}
//         />

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-12 flex justify-center">
//             <GalleryPagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}
//       </section>

//       {/* Image Preview */}
//       <GalleryModal
//         selectedIndex={selectedIndex}
//         onClose={() => setSelectedIndex(null)}
//         onChange={setSelectedIndex}
//       />

//       <Footer />
//     </div>
//   );
// };

// export default GalleryPage;


import { useEffect, useState } from "react";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryPagination from "@/components/gallery/GalleryPagination";
import GalleryModal from "@/components/gallery/GalleryModal";

import api from "@/lib/api";

const IMAGES_PER_PAGE = 12;

interface GalleryImage {
  id: number;
  imageUrl: string;
}

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gallery");

      setGalleryImages(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(
    1,
    Math.ceil(galleryImages.length / IMAGES_PER_PAGE)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Photo Gallery"
        description="Explore memorable moments and events from our college."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <GalleryGrid
          images={galleryImages}
          loading={loading}
          currentPage={currentPage}
          imagesPerPage={IMAGES_PER_PAGE}
          onImageClick={setSelectedIndex}
        />

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <GalleryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>

      <GalleryModal
        images={galleryImages}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onChange={setSelectedIndex}
      />

      <Footer />
    </div>
  );
};

export default GalleryPage;
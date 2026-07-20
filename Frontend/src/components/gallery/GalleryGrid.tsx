import { Search } from "lucide-react";

interface GalleryImage {
  id: number;
  imageUrl: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  loading: boolean;
  currentPage: number;
  imagesPerPage: number;
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({
  images,
  loading,
  currentPage,
  imagesPerPage,
  onImageClick,
}: GalleryGridProps) {
  const startIndex = (currentPage - 1) * imagesPerPage;

  const currentImages = images.slice(
    startIndex,
    startIndex + imagesPerPage
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: imagesPerPage }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
        <p className="text-lg text-gray-500">
          No gallery images available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
      {currentImages.map((image, index) => (
        <div
          key={image.id}
          onClick={() => onImageClick(startIndex + index)}
          className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
        >
          <img
            src={image.imageUrl}
            alt={`Gallery Image ${image.id}`}
            loading="lazy"
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
            <div className="scale-75 rounded-full bg-white/90 p-3 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <Search size={24} className="text-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
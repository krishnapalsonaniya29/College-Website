import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  imageUrl: string;
}

interface Props {
  images: GalleryImage[];
  selectedIndex: number | null;
  onClose: () => void;
  onChange: (index: number | null) => void;
}

const GalleryModal = ({
  images,
  selectedIndex,
  onClose,
  onChange,
}: Props) => {
  useEffect(() => {
    if (selectedIndex === null || images.length === 0) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        onChange((selectedIndex + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        onChange(
          (selectedIndex - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, images, onClose, onChange]);

  if (
    selectedIndex === null ||
    images.length === 0 ||
    !images[selectedIndex]
  ) {
    return null;
  }

  const image = images[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
      >
        <X size={24} />
      </button>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange(
            (selectedIndex - 1 + images.length) % images.length
          );
        }}
        className="absolute left-6 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Image */}
      <img
        src={image.imageUrl}
        alt={`Gallery ${image.id}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
      />

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((selectedIndex + 1) % images.length);
        }}
        className="absolute right-6 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100"
      >
        <ChevronRight size={30} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-8 rounded-full bg-black/60 px-5 py-2 text-white">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default GalleryModal;
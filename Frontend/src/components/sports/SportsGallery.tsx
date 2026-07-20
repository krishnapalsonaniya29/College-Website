import { useEffect, useState } from "react";
import { Images } from "lucide-react";

import api from "@/lib/api";

interface GalleryImage {
  id: number;
  title: string | null;
  imageUrl: string;
  category: string;
}

const SportsGallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gallery");

      const sportsImages = (res.data.data ?? []).filter(
        (item: GalleryImage) => item.category === "SPORTS"
      );

      setGalleryImages(sportsImages);
    } catch (error) {
      console.error("Failed to fetch sports gallery.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
          <Images size={18} />
          Gallery
        </div>

        <h2 className="text-3xl font-bold text-slate-900">
          Sports Gallery
        </h2>

        <p className="mt-3 text-slate-600">
          A glimpse of sporting activities, tournaments, training sessions,
          and memorable moments from various sports events conducted at the
          institute.
        </p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500">
          Loading gallery...
        </div>
      ) : galleryImages.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No sports gallery images available.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title ?? "Sports Image"}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-4">
                    <h3 className="font-semibold text-white">
                      {item.title || "Sports Activity"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SportsGallery;
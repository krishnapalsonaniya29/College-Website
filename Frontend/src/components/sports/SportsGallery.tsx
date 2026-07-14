import { Images } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
    title: "Cricket Tournament",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80",
    title: "Athletics",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    title: "Football Match",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80",
    title: "Basketball",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    title: "Volleyball",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
    title: "Badminton",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    title: "Fitness Training",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    title: "Sports Meet",
  },
];

const SportsGallery = () => {
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {galleryImages.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-4">
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SportsGallery;
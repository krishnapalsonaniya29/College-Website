import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PageBannerProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop";

const PageBanner = ({
  title,
  description,
  backgroundImage = DEFAULT_BG,
}: PageBannerProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/75" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-300">
            <Link
              to="/"
              className="flex items-center gap-1 transition hover:text-amber-400"
            >
              <Home size={16} />
              Home
            </Link>

            <ChevronRight size={15} />

            <span className="font-medium text-amber-400">
              {title}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>

          {/* Accent Line */}
          <div className="mt-4 h-1 w-20 rounded-full bg-amber-400" />

          {/* Description */}
          {description && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200 md:text-lg">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageBanner;
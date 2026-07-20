import { useEffect, useState } from "react";
import AlumniCard from "./AlumniCard";
import api from "@/lib/api";

const ALUMNI_PER_PAGE = 6;

interface Alumni {
  id: number;
  name: string;
  batch: number;
  course: string;
  profession: string;
  company?: string;
  message: string;
  photoUrl: string;
  isActive: boolean;
}

interface AlumniGridProps {
  currentPage: number;
}

function AlumniGrid({ currentPage }: AlumniGridProps) {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await api.get("/alumni");

        setAlumni(res.data.data);
      } catch (err) {
        console.error("Failed to fetch alumni:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const startIndex =
    (currentPage - 1) * ALUMNI_PER_PAGE;

  const currentAlumni = alumni.slice(
    startIndex,
    startIndex + ALUMNI_PER_PAGE
  );

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-gray-500">
          Loading alumni...
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {currentAlumni.map((person) => (
          <AlumniCard
            key={person.id}
            name={person.name}
            course={person.course}
            batch={person.batch}
            photoUrl={person.photoUrl}
            message={person.message}
          />
        ))}
      </div>
    </section>
  );
}

export default AlumniGrid;
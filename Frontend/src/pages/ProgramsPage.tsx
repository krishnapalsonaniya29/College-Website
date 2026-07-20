import { useEffect, useState } from "react";
import api from "@/lib/api";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import ProgramsSidebar from "@/components/programs/ProgramsSidebar";
import ProgramsContent from "@/components/programs/ProgramsContent";

import type { Program } from "@/types/program";
export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get("/programs");

        setPrograms(
          res.data.data.filter(
            (p: Program) => p.isActive
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Programs & Courses"
        description="Explore all academic programs offered by the institute."
      />

      <section className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-4">
        <ProgramsSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="lg:col-span-3">
          <ProgramsContent
            loading={loading}
            programs={programs}
            selectedCategory={selectedCategory}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
import { useState } from "react";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import ProgramsSidebar from "@/components/programs/ProgramsSidebar";
import ProgramsContent from "@/components/programs/ProgramsContent";

const ProgramsPage = () => {
  const [selected, setSelected] = useState<"all" | "ug" | "pg">("all");

  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Programs"
        description="Explore Undergraduate and Postgraduate Programs offered by the Institute."
      />

      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <ProgramsSidebar
                selected={selected}
                onSelect={setSelected}
              />
            </aside>

            {/* Content */}
            <main className="lg:col-span-3">
              <ProgramsContent selected={selected} />
            </main>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProgramsPage;
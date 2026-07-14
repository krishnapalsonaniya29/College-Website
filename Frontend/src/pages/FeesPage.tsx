import { useState } from "react";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import FeesSidebar from "@/components/fees/FeesSidebar";
import FeesContent from "@/components/fees/FeesContent";

const FeesPage = () => {
  const [selected, setSelected] = useState<"all" | "ug" | "pg">("all");

  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Fee Structure"
        description="View the fee structure for Undergraduate and Postgraduate programs."
      />

      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <FeesSidebar
                selected={selected}
                onSelect={setSelected}
              />
            </aside>

            <main className="lg:col-span-3">
              <FeesContent selected={selected} />
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FeesPage;
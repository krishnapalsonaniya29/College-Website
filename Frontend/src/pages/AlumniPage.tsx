import { useState } from "react";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import AboutAlumni from "@/components/alumni/AboutAlumni";
import AlumniGrid from "@/components/alumni/AlumniGrid";
import AlumniPagination from "@/components/alumni/AlumniPagination";

import { alumni, ALUMNI_PER_PAGE } from "@/data/alumni";

function AlumniPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(alumni.length / ALUMNI_PER_PAGE)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Our Alumni"
        description="Meet the proud alumni of our institution whose achievements continue to inspire future generations."
      />

      <AboutAlumni />

      <AlumniGrid currentPage={currentPage} />

      {totalPages > 1 && (
        <div className="pb-14 flex justify-center">
          <AlumniPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AlumniPage;
import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import SportsOverview from "@/components/sports/SportsOverview";
import SportsFacilities from "@/components/sports/SportsFacilities";
import SportsAchievements from "@/components/sports/SportsAchievements";
import SportsGallery from "@/components/sports/SportsGallery";

const SportsPage = () => {
  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Sports"
        description="Promoting physical fitness, discipline and teamwork through various indoor and outdoor sports."
      />

      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl space-y-10 px-4 lg:px-8">
          <SportsOverview />

          <SportsFacilities />

          <SportsAchievements />

          <SportsGallery />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SportsPage;
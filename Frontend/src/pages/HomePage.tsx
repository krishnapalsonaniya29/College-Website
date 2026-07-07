import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import TopHeader from "@/components/home/TopHeader";
import MainHeader from "@/components/home/MainHeader";
import Navbar from "@/components/navbar/Navbar";
import LatestNews from "@/components/home/LatestNews";
import HeroCarousel from "@/components/home/HeroCarousel";
import LatestUpdates from "@/components/home/LatestUpdates";
import UsefulLinks from "@/components/home/UsefulLinks";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import FacultyAchievements from "@/components/home/FacultyAchievements";
import GuidesSection from "@/components/home/GuidesSection";
import OtherLinks from "@/components/home/OtherLinks";
import DirectorNote from "@/components/home/DirectorNote";
import VisionMission from "@/components/home/VisionMission";
import StudentStrength from "@/components/home/StudentStrength";
import StudentAchievements from "@/components/home/StudentAchievements";
import ThoughtOfTheDay from "@/components/home/ThoughtOfTheDay";
import LatestPhotographs from "@/components/home/LatestPhotographs";
import AlumniViews from "@/components/home/AlumniViews";
import Footer from "@/components/footer/Footer";
export function HomePage() {
  useDocumentTitle("Home");

  return (
    <main className="min-h-screen w-full bg-white">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <LatestNews />
      <HeroCarousel />
      <div className="mx-auto mt-8 grid max-w-[1350px] grid-cols-1 gap-6 lg:grid-cols-2">
          <LatestUpdates />
          <UsefulLinks />
      </div>

      <div className="mx-auto mt-8 grid max-w-[1350px] grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingEvents />
        <FacultyAchievements />
      </div>
      <GuidesSection />
      <OtherLinks />

      <div className="mx-auto mt-8 grid max-w-[1350px] grid-cols-1 gap-6 lg:grid-cols-2">
          <DirectorNote />
          <VisionMission />
      </div>

      <div className="mx-auto mt-8 grid max-w-[1350px] grid-cols-1 gap-6 lg:grid-cols-2">
          <StudentStrength />
          <StudentAchievements />
      </div>

      <ThoughtOfTheDay />
      <LatestPhotographs />
      <AlumniViews />
      <Footer />
    </main>
  );
}
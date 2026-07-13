import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import PageBanner from "@/components/common/PageBanner";

// Anti Ragging Components
import AntiRaggingContent from "@/components/anti-ragging/AntiRaggingContent";
import HelplineCard from "@/components/anti-ragging/HelplineCard";
import CommitteeMembers from "@/components/anti-ragging/CommitteeMembers";
import RulesGuidelines from "@/components/anti-ragging/RulesGuidelines";
import ReportingProcess from "@/components/anti-ragging/ReportingProcess";

const AntiRaggingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <TopHeader />
      <MainHeader />
      <Navbar />

      {/* Banner */}
    <PageBanner
  title="Anti Ragging"
  description="The institute follows a zero-tolerance policy towards ragging and is committed to ensuring a safe and respectful campus environment."
/>

      {/* Main Content */}
      <main className="py-12">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <AntiRaggingContent />

          <HelplineCard />

          <CommitteeMembers />

          <RulesGuidelines />

          <ReportingProcess />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AntiRaggingPage;
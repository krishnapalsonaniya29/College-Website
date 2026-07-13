
import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// About Page Components
import PageBanner from "@/components/common/PageBanner";
import AboutSidebar from "@/components/about/AboutSidebar";
import AboutInstitute from "../components/about/AboutInstitute";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <TopHeader />
      <MainHeader />
      <Navbar />

      {/* Banner */}
     <PageBanner
  title="About Institute"
  description="Learn about our institution, our history, values, academic excellence, and commitment to quality education."
/>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <aside className="lg:col-span-1">
              <AboutSidebar />
            </aside>

            {/* Right Content */}
            <section className="lg:col-span-3">
              <AboutInstitute />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
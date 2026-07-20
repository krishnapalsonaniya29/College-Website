import { useEffect, useState } from "react";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import AboutSidebar from "@/components/about/AboutSidebar";
import AboutInstitute from "@/components/about/AboutInstitute";

import api from "@/lib/api";

interface AboutData {
  instituteName: string;

  about: string;
  motto: string;
  vision: string;
  mission: string;
  objectives: string;

  principalName: string;
  principalPhotoUrl: string;
  principalMessage: string;
}

const AboutPage = () => {
  const [about, setAbout] =
    useState<AboutData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");

        setAbout(res.data.data);
      } catch (err) {
        console.error(
          "Failed to fetch about data.",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="About Institute"
        description="Learn about our institution, our history, values, academic excellence, and commitment to quality education."
      />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading...
            </div>
          ) : !about ? (
            <div className="py-20 text-center text-gray-500">
              Failed to load institute information.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              <aside className="lg:col-span-1">
                <AboutSidebar />
              </aside>

              <section className="lg:col-span-3">
                <AboutInstitute
                  data={about}
                />
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
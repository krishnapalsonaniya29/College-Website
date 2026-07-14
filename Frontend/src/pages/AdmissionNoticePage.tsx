import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import AdmissionNoticeBoard from "@/components/admission/AdmissionNoticeBoard";
import DownloadCards from "@/components/admission/DownloadSection";

const AdmissionNoticePage = () => {
  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Admission"
        description="Admission notifications, important documents and admission process."
      />

      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">

          {/* Top Section */}
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left Content */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
                Admissions 2026–27
              </span>

              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                Welcome to the Admission Portal
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Mata Jijabai Government (Autonomous) PG Girls College welcomes
                aspiring students seeking admission to Undergraduate and
                Postgraduate programmes. The admission process is conducted
                according to the guidelines issued by the Department of Higher
                Education and Devi Ahilya Vishwavidyalaya.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                Applicants are advised to regularly check the latest admission
                notices, merit lists, counselling schedules and document
                verification updates published by the college. Please download
                the Admission Manual and Admission Process documents before
                applying.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">

                <div className="rounded-xl bg-slate-50 p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-900">
                    UG
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Undergraduate Courses
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-900">
                    PG
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Postgraduate Courses
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-900">
                    Merit
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Transparent Selection
                  </p>
                </div>

              </div>
            </div>

            {/* Right Notice Board */}
            <AdmissionNoticeBoard />

          </div>

          {/* Download Section */}
          <div className="mt-12">
            <DownloadCards />
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdmissionNoticePage;
import { Clock3, ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const ComingSoonPage = () => {
  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <section className="min-h-[65vh] bg-slate-50 flex items-center justify-center py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-10 md:p-14 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
              <Construction className="h-12 w-12 text-blue-900" />
            </div>

            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900">
              <Clock3 size={16} />
              Under Development
            </span>

            <h1 className="mt-6 text-4xl font-bold text-slate-900">
              Coming Soon
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              This page is currently under development and will be available
              soon. We are working to provide complete and up-to-date
              information.
            </p>

            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-6 py-3 text-white font-medium transition hover:bg-blue-800"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ComingSoonPage;
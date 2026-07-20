import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import NewsList from "@/components/news/NewsList";

function News() {
  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <PageBanner
        title="Latest News"
        description="Stay updated with the latest announcements, activities and important news from the institute."
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <NewsList />
      </div>

      <Footer />
    </>
  );
}

export default News;
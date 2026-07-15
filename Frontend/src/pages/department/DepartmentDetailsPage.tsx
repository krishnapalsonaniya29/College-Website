import { useParams } from "react-router-dom";
import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import DepartmentSidebar from "@/components/departments/DepartmentSidebar";

import { departments } from "@/data/departments";
import PageBanner from "@/components/common/PageBanner";
import FacultySection from "@/components/departments/FacultySection";
import AboutDepartment from "@/components/departments/AboutDepartment";
import VisionMission from "@/components/departments/VisionMission";
import HodSection from "@/components/departments/HodSection";
export default function DepartmentDetailsPage() {
  const { slug } = useParams();

  const department = departments.find((d) => d.slug === slug);


  if (!department) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Department Not Found
      </div>
    );
  }
  
  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <main className="bg-slate-50 min-h-screen">

        {/* Banner */}

        

           <PageBanner
            title={department.name}
            description={department.description}
            />

        {/* Content */}

        <section className="container mx-auto px-4 py-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-3">
              <DepartmentSidebar />
            </div>

            <div className="lg:col-span-9 space-y-8">

             <AboutDepartment department={department} />

              <VisionMission department={department} />

              <HodSection department={department} />




              <FacultySection departmentSlug={department.slug} />

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
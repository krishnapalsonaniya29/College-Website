import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import DepartmentSidebar from "@/components/departments/DepartmentSidebar";
import AboutDepartment from "@/components/departments/AboutDepartment";
import VisionMission from "@/components/departments/VisionMission";
import HodSection from "@/components/departments/HodSection";
import FacultySection from "@/components/departments/FacultySection";

import api from "@/lib/api";

interface Faculty {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  experience: number;
  email: string;
  photoUrl: string;
  isHOD: boolean;
  isActive: boolean;
}

interface Gallery {
  id: number;
  imageUrl: string;
}

interface Department {
  id: number;
  name: string;
  slug: string;

  logoUrl: string;

  description: string;
  vision: string;
  mission: string;

  faculty: Faculty[];
  gallery: Gallery[];
}

export default function DepartmentDetailsPage() {
  const { slug } = useParams();

  const [department, setDepartment] =
    useState<Department | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await api.get(
          `/departments/${slug}`
        );

        setDepartment(res.data.data);
      } catch (err) {
        console.error(
          "Failed to fetch department",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchDepartment();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium">
        Loading department...
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Department Not Found
      </div>
    );
  }

  const hod = department.faculty.find(
    (member) => member.isHOD
  );

  const activeFaculty = department.faculty.filter(
    (member) => member.isActive
  );

  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <PageBanner
          title={department.name}
          description={department.description}
        />

        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <DepartmentSidebar />
            </div>

            {/* Content */}
            <div className="space-y-8 lg:col-span-9">
              <AboutDepartment
                department={department}
              />

              <VisionMission
                department={department}
              />

              <HodSection
                hod={hod}
                departmentName={department.name}
              />

              <FacultySection
                faculty={activeFaculty}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
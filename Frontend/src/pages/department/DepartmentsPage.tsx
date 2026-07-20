import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import DepartmentSidebar from "@/components/departments/DepartmentSidebar";
import PageBanner from "@/components/common/PageBanner";
import api from "@/lib/api";

interface Department {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/departments");
        setDepartments(res.data.data);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <TopHeader />
      <MainHeader />
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <PageBanner
          title="Departments"
          description="Our academic departments provide quality education, experienced faculty, modern laboratories, and excellent opportunities for research and innovation."
        />

        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <DepartmentSidebar />
            </div>

            {/* Department List */}
            <div className="lg:col-span-9">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  Academic Departments
                </h2>

                <p className="mt-2 text-gray-600">
                  Explore our departments that promote excellence in teaching,
                  innovation, research, and industry-oriented education.
                </p>
              </div>

              {loading ? (
                <div className="rounded-xl bg-white p-10 text-center shadow">
                  Loading departments...
                </div>
              ) : departments.length === 0 ? (
                <div className="rounded-xl bg-white p-10 text-center shadow">
                  No departments available.
                </div>
              ) : (
                <div className="space-y-6">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex flex-col gap-6 md:flex-row">
                          {/* Logo */}
                          <div className="flex justify-center md:block">
                            <img
                              src={dept.logoUrl}
                              alt={dept.name}
                              className="h-24 w-24 rounded-xl bg-blue-50 object-contain p-3 transition group-hover:bg-blue-100"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                              Department
                            </span>

                            <h3 className="mt-3 text-2xl font-bold text-gray-800">
                              {dept.name}
                            </h3>

                            <p className="mt-4 line-clamp-3 leading-7 text-gray-600">
                              {dept.description}
                            </p>

                            <div className="mt-6">
                              <Link
                                to={`/departments/${dept.slug}`}
                                className="rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800"
                              >
                                View Department
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
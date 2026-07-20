import { useEffect, useMemo, useState } from "react";

import api from "@/lib/api";

import TopHeader from "@/components/common/TopHeader";
import MainHeader from "@/components/common/MainHeader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageBanner from "@/components/common/PageBanner";

import AchievementHero from "@/components/student-achievements/AchievementHero";
import AchievementStats from "@/components/student-achievements/AchievementStats";
import AchievementFilters from "@/components/student-achievements/AchievementFilters";
import AchievementGrid from "@/components/student-achievements/AchievementGrid";
import RecognitionSection from "@/components/student-achievements/RecognitionSection";

interface StudentAchievement {
  id: number;
  name: string;
  course: string;
  achievement: string;
  description: string;
  photoUrl: string;
  achievementDate: string;
}

const StudentAchievementsPage = () => {
  const [achievements, setAchievements] = useState<
    StudentAchievement[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCourse, setSelectedCourse] =
    useState("All Courses");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/student-achievements"
      );

      setAchievements(res.data.data ?? []);
    } catch (error) {
      console.error(error);
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAchievements = useMemo(() => {
    return achievements.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCourse =
        selectedCourse === "All Courses"
          ? true
          : item.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [
    achievements,
    search,
    selectedCourse,
  ]);

  return (
    <>
         <TopHeader />
      <MainHeader />
      <Navbar />
      <PageBanner
        title="Student Achievements"
        description="Celebrating the outstanding accomplishments of our students in academics, sports, research, innovation and co-curricular activities."
      />

      <AchievementHero />

      <AchievementStats
        achievements={achievements}
      />

      <AchievementFilters
        achievements={achievements}
        search={search}
        selectedCourse={selectedCourse}
        onSearchChange={setSearch}
        onCourseChange={setSelectedCourse}
      />

      <AchievementGrid
        achievements={filteredAchievements}
        loading={loading}
      />

     
      <Footer/>
    </>
  );
};

export default StudentAchievementsPage;
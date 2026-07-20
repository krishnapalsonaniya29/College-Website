import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import homeRoutes from "../modules/home/home.routes";
import aboutRoutes from "../modules/about/about.routes";
import departmentRoutes from "../modules/department/department.routes";
import facultyRoutes from "../modules/faculty/faculty.routes";
import galleryRoutes from "../modules/gallery/gallery.routes";
import programRoutes from "../modules/program/program.routes";
import subjectRoutes from "../modules/subjects/subject.routes";
import syllabusRoutes from "../modules/syllabus/syllabus.routes";
import noticeRoutes from "../modules/notice/notice.routes";
import alumniRoutes from "../modules/alumni/alumni.routes";
import admissionRoutes from "../modules/admission/admission.routes";
import sportsAchievementRoutes from "../modules/sports/sportsAchievement.routes";
import eventRoutes from "../modules/event/event.routes";
import newsRoutes from "../modules/news/news.routes";
import heroRoutes from "../modules/home/hero.routes";
import studentAchievementRoutes from "../modules/studentAchievement/studentAchievement.routes";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.use("/auth", authRoutes);

/*
|--------------------------------------------------------------------------
| Home
|--------------------------------------------------------------------------
*/

router.use("/home", homeRoutes);

/*|--------------------------------------------------------------------------
| Hero
|--------------------------------------------------------------------------
*/
router.use("/hero", heroRoutes);
/*
|--------------------------------------------------------------------------
| About
|--------------------------------------------------------------------------
*/

router.use("/about", aboutRoutes);

/*
|--------------------------------------------------------------------------
| Departments
|--------------------------------------------------------------------------
*/

router.use("/departments", departmentRoutes);

/*
|--------------------------------------------------------------------------
| Faculty
|--------------------------------------------------------------------------
*/

router.use("/faculty", facultyRoutes);

/*
|--------------------------------------------------------------------------
| Gallery
|--------------------------------------------------------------------------
*/

router.use("/gallery", galleryRoutes);

/*
|--------------------------------------------------------------------------
| Programs
|--------------------------------------------------------------------------
*/

router.use("/programs", programRoutes);

/*
|--------------------------------------------------------------------------
| Subjects
|--------------------------------------------------------------------------
*/

router.use("/subjects", subjectRoutes);

/*
|--------------------------------------------------------------------------
| Syllabus
|--------------------------------------------------------------------------
*/

router.use("/syllabus", syllabusRoutes);

/*
|--------------------------------------------------------------------------
| Notices
|--------------------------------------------------------------------------
*/

router.use("/notices", noticeRoutes);

/*
|--------------------------------------------------------------------------
| Alumni
|--------------------------------------------------------------------------
*/

router.use("/alumni", alumniRoutes);

/*
|--------------------------------------------------------------------------
| Admissions
|--------------------------------------------------------------------------
*/

router.use("/admissions", admissionRoutes);

/*
|--------------------------------------------------------------------------
| Sports Achievements
|--------------------------------------------------------------------------
*/

router.use(
  "/sports-achievements",
  sportsAchievementRoutes
);

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
*/

router.use("/events", eventRoutes);

/*
|--------------------------------------------------------------------------
| News
|--------------------------------------------------------------------------
*/

router.use("/news", newsRoutes);

router.use(
  "/student-achievements",
  studentAchievementRoutes
);
export default router;
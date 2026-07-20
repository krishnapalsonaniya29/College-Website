/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,semester]` on the table `Syllabus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pdfPublicId` to the `Admission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoPublicId` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoPublicId` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoPublicId` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePublicId` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdfPublicId` to the `Syllabus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admission" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pdfPublicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Alumni" ADD COLUMN     "company" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "photoPublicId" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "logoPublicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "imagePublicId" TEXT,
ADD COLUMN     "pdfPublicId" TEXT;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "photoPublicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "imagePublicId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "imagePublicId" TEXT,
ADD COLUMN     "pdfPublicId" TEXT;

-- AlterTable
ALTER TABLE "Notice" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pdfPublicId" TEXT;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SportsAchievement" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Syllabus" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pdfPublicId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Admission_admissionDate_idx" ON "Admission"("admissionDate");

-- CreateIndex
CREATE INDEX "Admission_isActive_idx" ON "Admission"("isActive");

-- CreateIndex
CREATE INDEX "Alumni_batch_idx" ON "Alumni"("batch");

-- CreateIndex
CREATE INDEX "Alumni_course_idx" ON "Alumni"("course");

-- CreateIndex
CREATE INDEX "Alumni_isActive_idx" ON "Alumni"("isActive");

-- CreateIndex
CREATE INDEX "Department_slug_idx" ON "Department"("slug");

-- CreateIndex
CREATE INDEX "Department_isActive_idx" ON "Department"("isActive");

-- CreateIndex
CREATE INDEX "Event_eventDate_idx" ON "Event"("eventDate");

-- CreateIndex
CREATE INDEX "Event_isActive_idx" ON "Event"("isActive");

-- CreateIndex
CREATE INDEX "Faculty_isHOD_idx" ON "Faculty"("isHOD");

-- CreateIndex
CREATE INDEX "Faculty_isActive_idx" ON "Faculty"("isActive");

-- CreateIndex
CREATE INDEX "Gallery_category_idx" ON "Gallery"("category");

-- CreateIndex
CREATE INDEX "Gallery_isActive_idx" ON "Gallery"("isActive");

-- CreateIndex
CREATE INDEX "News_publishedAt_idx" ON "News"("publishedAt");

-- CreateIndex
CREATE INDEX "News_isActive_idx" ON "News"("isActive");

-- CreateIndex
CREATE INDEX "Program_category_idx" ON "Program"("category");

-- CreateIndex
CREATE INDEX "Program_isActive_idx" ON "Program"("isActive");

-- CreateIndex
CREATE INDEX "SportsAchievement_achievementDate_idx" ON "SportsAchievement"("achievementDate");

-- CreateIndex
CREATE INDEX "SportsAchievement_isActive_idx" ON "SportsAchievement"("isActive");

-- CreateIndex
CREATE INDEX "Subject_subjectCode_idx" ON "Subject"("subjectCode");

-- CreateIndex
CREATE INDEX "Subject_isActive_idx" ON "Subject"("isActive");

-- CreateIndex
CREATE INDEX "Syllabus_semester_idx" ON "Syllabus"("semester");

-- CreateIndex
CREATE INDEX "Syllabus_isActive_idx" ON "Syllabus"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Syllabus_subjectId_semester_key" ON "Syllabus"("subjectId", "semester");

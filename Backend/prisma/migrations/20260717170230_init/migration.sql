/*
  Warnings:

  - The primary key for the `About` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `principalPhoto` on the `About` table. All the data in the column will be lost.
  - The `id` column on the `About` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `Event` table. All the data in the column will be lost.
  - The `id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `HeroSlide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `HeroSlide` table. All the data in the column will be lost.
  - The `id` column on the `HeroSlide` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `News` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `News` table. All the data in the column will be lost.
  - The `id` column on the `News` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Thought` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `principalPhotoUrl` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('SEM1', 'SEM2', 'SEM3', 'SEM4', 'SEM5', 'SEM6', 'SEM7', 'SEM8');

-- CreateEnum
CREATE TYPE "GalleryCategory" AS ENUM ('CAMPUS', 'SPORTS', 'EVENT', 'CULTURAL', 'DEPARTMENT', 'LABORATORY', 'NSS', 'NCC');

-- AlterTable
ALTER TABLE "About" DROP CONSTRAINT "About_pkey",
DROP COLUMN "principalPhoto",
ADD COLUMN     "principalPhotoUrl" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "About_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "pdfUrl" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HeroSlide" DROP CONSTRAINT "HeroSlide_pkey",
DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "News" DROP CONSTRAINT "News_pkey",
DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "pdfUrl" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "News_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Thought";

-- CreateTable
CREATE TABLE "HomeConfig" (
    "id" SERIAL NOT NULL,
    "directorName" TEXT NOT NULL,
    "directorPhotoUrl" TEXT NOT NULL,
    "directorMessage" TEXT NOT NULL,
    "studentStrength" INTEGER NOT NULL,
    "thought" TEXT NOT NULL,
    "thoughtAuthor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isHOD" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ProgramCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Syllabus" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "semester" "Semester" NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Syllabus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "noticeDate" TIMESTAMP(3) NOT NULL,
    "pdfUrl" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admission" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" "GalleryCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumni" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "batch" INTEGER NOT NULL,
    "course" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportsAchievement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achievementDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportsAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_slug_key" ON "Department"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- CreateIndex
CREATE INDEX "Faculty_departmentId_idx" ON "Faculty"("departmentId");

-- CreateIndex
CREATE INDEX "Subject_programId_idx" ON "Subject"("programId");

-- CreateIndex
CREATE INDEX "Syllabus_subjectId_idx" ON "Syllabus"("subjectId");

-- CreateIndex
CREATE INDEX "Gallery_departmentId_idx" ON "Gallery"("departmentId");

-- CreateIndex
CREATE INDEX "HeroSlide_displayOrder_idx" ON "HeroSlide"("displayOrder");

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syllabus" ADD CONSTRAINT "Syllabus_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

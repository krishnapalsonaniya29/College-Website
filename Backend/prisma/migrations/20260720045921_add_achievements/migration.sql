-- CreateTable
CREATE TABLE "StudentAchievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "course" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "photoPublicId" TEXT NOT NULL,
    "achievement" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achievementDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacultyAchievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "subject" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "photoPublicId" TEXT NOT NULL,
    "achievement" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achievementDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacultyAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentAchievement_course_idx" ON "StudentAchievement"("course");

-- CreateIndex
CREATE INDEX "StudentAchievement_achievementDate_idx" ON "StudentAchievement"("achievementDate");

-- CreateIndex
CREATE INDEX "StudentAchievement_isActive_idx" ON "StudentAchievement"("isActive");

-- CreateIndex
CREATE INDEX "FacultyAchievement_subject_idx" ON "FacultyAchievement"("subject");

-- CreateIndex
CREATE INDEX "FacultyAchievement_achievementDate_idx" ON "FacultyAchievement"("achievementDate");

-- CreateIndex
CREATE INDEX "FacultyAchievement_isActive_idx" ON "FacultyAchievement"("isActive");

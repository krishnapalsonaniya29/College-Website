/*
  Warnings:

  - You are about to drop the column `studentStrength` on the `HomeConfig` table. All the data in the column will be lost.
  - Added the required column `academicSession` to the `HomeConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boys` to the `HomeConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `girls` to the `HomeConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pgStudents` to the `HomeConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStudents` to the `HomeConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ugStudents` to the `HomeConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HomeConfig" DROP COLUMN "studentStrength",
ADD COLUMN     "academicSession" TEXT NOT NULL,
ADD COLUMN     "boys" INTEGER NOT NULL,
ADD COLUMN     "directorPhotoPublicId" TEXT,
ADD COLUMN     "girls" INTEGER NOT NULL,
ADD COLUMN     "pgStudents" INTEGER NOT NULL,
ADD COLUMN     "totalStudents" INTEGER NOT NULL,
ADD COLUMN     "ugStudents" INTEGER NOT NULL;

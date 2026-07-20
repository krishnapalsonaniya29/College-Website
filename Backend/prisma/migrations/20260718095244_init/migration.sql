/*
  Warnings:

  - Added the required column `motto` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectives` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" ADD COLUMN     "motto" TEXT NOT NULL,
ADD COLUMN     "objectives" TEXT NOT NULL,
ADD COLUMN     "principalPhotoPublicId" TEXT;

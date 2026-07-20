/*
  Warnings:

  - Added the required column `imagePublicId` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.
  - Made the column `subtitle` on table `HeroSlide` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "HeroSlide_displayOrder_idx";

-- AlterTable
ALTER TABLE "HeroSlide" ADD COLUMN     "imagePublicId" TEXT NOT NULL,
ALTER COLUMN "subtitle" SET NOT NULL,
ALTER COLUMN "displayOrder" DROP DEFAULT;

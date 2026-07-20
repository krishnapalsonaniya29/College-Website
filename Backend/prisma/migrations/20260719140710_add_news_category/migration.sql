-- CreateEnum
CREATE TYPE "NewsCategory" AS ENUM ('NEWS', 'NOTICE', 'CIRCULAR', 'EVENT', 'ACHIEVEMENT', 'EXAM', 'ADMISSION', 'TENDER', 'SCHOLARSHIP');

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "category" "NewsCategory" NOT NULL DEFAULT 'NEWS';

-- CreateIndex
CREATE INDEX "News_category_idx" ON "News"("category");

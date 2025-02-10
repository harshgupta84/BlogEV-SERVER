/*
  Warnings:

  - Changed the type of `topics` on the `Blog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "topics",
ADD COLUMN     "topics" JSONB NOT NULL;

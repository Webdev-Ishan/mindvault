/*
  Warnings:

  - You are about to drop the column `sharableId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Content" DROP CONSTRAINT "Content_sharableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ContentTags" DROP CONSTRAINT "_ContentTags_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ContentTags" DROP CONSTRAINT "_ContentTags_B_fkey";

-- AlterTable
ALTER TABLE "public"."Content" DROP COLUMN "sharableId",
ADD COLUMN     "sharable" TEXT;

-- DropTable
DROP TABLE "public"."Link";

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."_ContentTags";

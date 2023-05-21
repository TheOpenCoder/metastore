/*
  Warnings:

  - You are about to drop the column `userSettingsUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Achievements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reviews` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `LibraryGames` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Achievements" DROP CONSTRAINT "Achievements_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_userId_fkey";

-- AlterTable
ALTER TABLE "Addon" ADD COLUMN     "ownerId" STRING;

-- AlterTable
ALTER TABLE "LibraryGames" ADD COLUMN     "gameProgress" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "LibraryGames" ADD COLUMN     "id" STRING NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userSettingsUserId";

-- AlterPrimaryKey
ALTER TABLE "LibraryGames" ALTER PRIMARY KEY USING COLUMNS ("id");

-- DropTable
DROP TABLE "Achievements";

-- DropTable
DROP TABLE "Reviews";

-- CreateTable
CREATE TABLE "FavoriteAddons" (
    "userId" STRING NOT NULL,
    "addonId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteAddons_pkey" PRIMARY KEY ("userId","addonId")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "image" STRING NOT NULL,
    "grade" STRING,
    "gameId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryGamesAchivement" (
    "libraryGamesId" STRING NOT NULL,
    "achievementId" STRING NOT NULL,

    CONSTRAINT "LibraryGamesAchivement_pkey" PRIMARY KEY ("libraryGamesId","achievementId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" STRING NOT NULL,
    "content" STRING,
    "rating" INT4 NOT NULL,
    "gameId" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement"("title");

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAddons" ADD CONSTRAINT "FavoriteAddons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAddons" ADD CONSTRAINT "FavoriteAddons_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryGamesAchivement" ADD CONSTRAINT "LibraryGamesAchivement_libraryGamesId_fkey" FOREIGN KEY ("libraryGamesId") REFERENCES "LibraryGames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryGamesAchivement" ADD CONSTRAINT "LibraryGamesAchivement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

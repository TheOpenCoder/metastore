/*
  Warnings:

  - You are about to drop the column `herologo` on the `Game` table. All the data in the column will be lost.
  - Added the required column `heroLogo` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "herologo";
ALTER TABLE "Game" ADD COLUMN     "heroLogo" STRING NOT NULL;

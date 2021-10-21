/*
  Warnings:

  - You are about to drop the column `numOfTrohpies` on the `TradeSkills` table. All the data in the column will be lost.
  - Added the required column `numOfTrophies` to the `TradeSkills` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
ALTER TABLE "TradeSkills"
RENAME COLUMN "numOfTrohpies" TO "numOfTrophies"

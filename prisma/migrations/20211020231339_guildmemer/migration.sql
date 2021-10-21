/*
  Warnings:

  - You are about to drop the `Crafter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Crafter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GuildMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "role" TEXT,
    "rank" TEXT NOT NULL DEFAULT '0'
);

-- CreateTable
CREATE TABLE "TradeSkills" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildMemberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "numOfCraftingGear" INTEGER NOT NULL,
    "numOfTrohpies" INTEGER NOT NULL,
    CONSTRAINT "TradeSkills_guildMemberId_fkey" FOREIGN KEY ("guildMemberId") REFERENCES "GuildMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuildMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "role" TEXT,
    "rank" TEXT NOT NULL DEFAULT '5'
);
INSERT INTO "new_GuildMember" ("id", "rank", "role", "userName") SELECT "id", "rank", "role", "userName" FROM "GuildMember";
DROP TABLE "GuildMember";
ALTER TABLE "new_GuildMember" RENAME TO "GuildMember";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

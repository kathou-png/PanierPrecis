/*
  Warnings:

  - Added the required column `userId` to the `Marketplace` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Marketplace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Marketplace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Marketplace" ("id", "name") SELECT "id", "name" FROM "Marketplace";
DROP TABLE "Marketplace";
ALTER TABLE "new_Marketplace" RENAME TO "Marketplace";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

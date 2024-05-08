/*
  Warnings:

  - Added the required column `marketPlaceId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Marketplace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditedDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "marketPlaceId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_marketPlaceId_fkey" FOREIGN KEY ("marketPlaceId") REFERENCES "Marketplace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("creationDate", "id", "lastEditedDate", "name", "userId") SELECT "creationDate", "id", "lastEditedDate", "name", "userId" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

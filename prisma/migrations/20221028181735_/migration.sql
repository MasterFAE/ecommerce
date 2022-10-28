/*
  Warnings:

  - A unique constraint covering the columns `[userId,itemId]` on the table `ItemInCart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ItemInCart_itemId_key";

-- AlterTable
ALTER TABLE "ItemInCart" ADD CONSTRAINT "ItemInCart_pkey" PRIMARY KEY ("userId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemInCart_userId_itemId_key" ON "ItemInCart"("userId", "itemId");

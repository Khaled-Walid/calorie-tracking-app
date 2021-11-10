/*
  Warnings:

  - Added the required column `consumedAt` to the `ConsumedFood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ConsumedFood` ADD COLUMN `consumedAt` DATETIME(3) NOT NULL;

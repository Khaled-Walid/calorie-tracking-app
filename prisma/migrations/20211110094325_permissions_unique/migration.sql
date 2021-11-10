/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `UserPermission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserPermission_role_key` ON `UserPermission`(`role`);

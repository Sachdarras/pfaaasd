/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Description` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Description_name_key` ON `Description`(`name`);

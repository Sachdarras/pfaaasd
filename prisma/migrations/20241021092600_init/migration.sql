/*
  Warnings:

  - You are about to drop the column `order` on the `skill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Description` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Project_name_key` ON `project`;

-- DropIndex
DROP INDEX `Skill_name_key` ON `skill`;

-- AlterTable
ALTER TABLE `skill` DROP COLUMN `order`;

-- CreateIndex
CREATE UNIQUE INDEX `Description_title_key` ON `Description`(`title`);

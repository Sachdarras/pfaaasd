/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Description_title_key` ON `description`;

-- AlterTable
ALTER TABLE `description` MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `img` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `skill` MODIFY `image` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Project_name_key` ON `Project`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Skill_name_key` ON `Skill`(`name`);

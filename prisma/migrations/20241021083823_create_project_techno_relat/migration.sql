/*
  Warnings:

  - You are about to drop the `_projecttechno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `techno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projecttechno` DROP FOREIGN KEY `_ProjectTechno_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttechno` DROP FOREIGN KEY `_ProjectTechno_B_fkey`;

-- DropIndex
DROP INDEX `Description_name_key` ON `description`;

-- DropIndex
DROP INDEX `Project_name_key` ON `project`;

-- AlterTable
ALTER TABLE `description` MODIFY `image` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `img` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `skill` MODIFY `image` LONGTEXT NOT NULL;

-- DropTable
DROP TABLE `_projecttechno`;

-- DropTable
DROP TABLE `techno`;

-- CreateTable
CREATE TABLE `ProjectSkill` (
    `projectId` INTEGER NOT NULL,
    `skillId` INTEGER NOT NULL,

    PRIMARY KEY (`projectId`, `skillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectSkill` ADD CONSTRAINT `ProjectSkill_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSkill` ADD CONSTRAINT `ProjectSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

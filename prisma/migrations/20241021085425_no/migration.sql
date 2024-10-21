/*
  Warnings:

  - You are about to drop the `projectskill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `projectskill` DROP FOREIGN KEY `ProjectSkill_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `projectskill` DROP FOREIGN KEY `ProjectSkill_skillId_fkey`;

-- DropTable
DROP TABLE `projectskill`;

-- CreateTable
CREATE TABLE `_ProjectSkills` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectSkills_AB_unique`(`A`, `B`),
    INDEX `_ProjectSkills_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectSkills` ADD CONSTRAINT `_ProjectSkills_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectSkills` ADD CONSTRAINT `_ProjectSkills_B_fkey` FOREIGN KEY (`B`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

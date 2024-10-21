/*
  Warnings:

  - You are about to drop the `_projectskills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projectskills` DROP FOREIGN KEY `_ProjectSkills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projectskills` DROP FOREIGN KEY `_ProjectSkills_B_fkey`;

-- DropTable
DROP TABLE `_projectskills`;

-- CreateTable
CREATE TABLE `_ProjectSkill` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectSkill_AB_unique`(`A`, `B`),
    INDEX `_ProjectSkill_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectSkill` ADD CONSTRAINT `_ProjectSkill_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectSkill` ADD CONSTRAINT `_ProjectSkill_B_fkey` FOREIGN KEY (`B`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `_projectskills` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Description` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_projectskills` DROP FOREIGN KEY `_ProjectSkills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projectskills` DROP FOREIGN KEY `_ProjectSkills_B_fkey`;

-- AlterTable
ALTER TABLE `description` MODIFY `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `img` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `skill` MODIFY `image` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_projectskills`;

-- CreateTable
CREATE TABLE `Techno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectTechno` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectTechno_AB_unique`(`A`, `B`),
    INDEX `_ProjectTechno_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Description_name_key` ON `Description`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Project_name_key` ON `Project`(`name`);

-- AddForeignKey
ALTER TABLE `_ProjectTechno` ADD CONSTRAINT `_ProjectTechno_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectTechno` ADD CONSTRAINT `_ProjectTechno_B_fkey` FOREIGN KEY (`B`) REFERENCES `Techno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

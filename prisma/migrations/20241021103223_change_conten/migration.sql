/*
  Warnings:

  - You are about to drop the `skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projectskills` DROP FOREIGN KEY `_ProjectSkills_B_fkey`;

-- DropTable
DROP TABLE `skill`;

-- CreateTable
CREATE TABLE `Skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Skills_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectSkills` ADD CONSTRAINT `_ProjectSkills_B_fkey` FOREIGN KEY (`B`) REFERENCES `Skills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

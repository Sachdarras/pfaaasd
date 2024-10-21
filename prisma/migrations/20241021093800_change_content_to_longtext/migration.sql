-- AlterTable
ALTER TABLE `description` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `image` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `description` LONGTEXT NOT NULL;

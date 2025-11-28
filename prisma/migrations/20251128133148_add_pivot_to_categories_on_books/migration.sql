/*
  Warnings:

  - You are about to drop the `_BookToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_BookToCategory` DROP FOREIGN KEY `_BookToCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BookToCategory` DROP FOREIGN KEY `_BookToCategory_B_fkey`;

-- DropTable
DROP TABLE `_BookToCategory`;

-- CreateTable
CREATE TABLE `CategoryOnBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoryOnBook` ADD CONSTRAINT `CategoryOnBook_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryOnBook` ADD CONSTRAINT `CategoryOnBook_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

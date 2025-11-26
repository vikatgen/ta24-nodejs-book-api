-- DropForeignKey
ALTER TABLE `AuthorOnBook` DROP FOREIGN KEY `AuthorOnBook_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `AuthorOnBook` DROP FOREIGN KEY `AuthorOnBook_book_id_fkey`;

-- DropIndex
DROP INDEX `AuthorOnBook_author_id_fkey` ON `AuthorOnBook`;

-- DropIndex
DROP INDEX `AuthorOnBook_book_id_fkey` ON `AuthorOnBook`;

-- AddForeignKey
ALTER TABLE `AuthorOnBook` ADD CONSTRAINT `AuthorOnBook_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorOnBook` ADD CONSTRAINT `AuthorOnBook_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

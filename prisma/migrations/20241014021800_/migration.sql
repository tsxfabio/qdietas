/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `meals` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `auth_user_id_key` ON `auth`(`user_id`);

-- AddForeignKey
ALTER TABLE `auth` ADD CONSTRAINT `auth_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

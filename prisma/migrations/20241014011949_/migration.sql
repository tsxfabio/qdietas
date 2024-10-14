/*
  Warnings:

  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `created_at`,
    DROP COLUMN `email`,
    DROP COLUMN `password_hash`;

-- CreateTable
CREATE TABLE `auth` (
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `auth_email_key`(`email`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meal_name` VARCHAR(191) NOT NULL,
    `meal_description` VARCHAR(191) NULL,
    `meal_datetime` DATETIME(3) NOT NULL,
    `within_diet` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

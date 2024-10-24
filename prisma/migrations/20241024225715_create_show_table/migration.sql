/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `show` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NOT NULL,
    `tagline` VARCHAR(191) NOT NULL,
    `number_of_episodes` INTEGER NOT NULL,
    `number_of_seasons` INTEGER NOT NULL,
    `first_air_date` DATETIME(3) NOT NULL,
    `last_air_date` DATETIME(3) NOT NULL,
    `poster_url` VARCHAR(191) NOT NULL,
    `backdrop_url` VARCHAR(191) NOT NULL,
    `vote_average` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `genres` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

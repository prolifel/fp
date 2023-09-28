SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `img_header` varchar(255) NOT NULL,
  `header` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Timestamp

ALTER TABLE `article`
	CHANGE COLUMN `created_at` `created_at` DATETIME NOT NULL DEFAULT NOW() AFTER `content`,
	CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() AFTER `created_at`;

ALTER TABLE `user`
	CHANGE COLUMN `created_at` `created_at` DATETIME NOT NULL DEFAULT NOW() AFTER `password`,
	CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() AFTER `created_at`;

ALTER TABLE `newsletter`
	CHANGE COLUMN `created_at` `created_at` DATETIME NOT NULL DEFAULT NOW() AFTER `email`,
	CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() AFTER `created_at`;

ALTER TABLE `contact`
	CHANGE COLUMN `created_at` `created_at` DATETIME NOT NULL DEFAULT NOW() AFTER `message`,
	CHANGE COLUMN `updated_at` `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW() AFTER `created_at`;
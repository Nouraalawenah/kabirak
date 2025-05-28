-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2025 at 07:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kabirak`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@admin.com', '$2y$10$MAPt0KCjBjLQcMkWkKTcMuksYYGblLgN4PLl27GWTcBZait.wy0e2', '2025-05-23 11:30:30', '2025-05-23 11:30:30');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `technician_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `technician_id`, `rating`, `comment`, `created_at`) VALUES
(4, 1, 3, 5, 'good man', '2025-05-25 12:37:27'),
(5, 1, 1, 5, 'the best', '2025-05-25 12:38:00'),
(6, 1, 2, 5, 'Hi', '2025-05-28 16:52:38');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `technician_id` int(11) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL COMMENT 'Service delivery location',
  `order_description` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `scheduled_datetime` datetime DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'Unpaid',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_categories`
--

CREATE TABLE `service_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_categories`
--

INSERT INTO `service_categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'سباكة', '2025-05-23 13:09:38', '2025-05-24 10:30:43'),
(2, 'دهان', '2025-05-24 07:52:08', '2025-05-24 07:52:08'),
(3, 'تكييف و تدفئة', '2025-05-24 10:28:57', '2025-05-24 10:28:57'),
(4, 'خدمات التنظيف', '2025-05-24 10:29:05', '2025-05-24 10:29:05'),
(5, 'اصلاح الكهرباء', '2025-05-24 10:29:14', '2025-05-24 10:29:14'),
(6, 'حدائق', '2025-05-24 10:29:21', '2025-05-24 10:29:21'),
(7, 'نجارة', '2025-05-24 10:31:04', '2025-05-24 10:31:04'),
(8, 'أنظمة الأمن والمراقبة', '2025-05-24 10:31:49', '2025-05-24 10:31:49');

-- --------------------------------------------------------

--
-- Table structure for table `technicians`
--

CREATE TABLE `technicians` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `technicians`
--

INSERT INTO `technicians` (`id`, `name`, `email`, `password`, `phone`, `service_category_id`, `city`, `profile_image`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'Asem Zaidan', 'asemfas@gmail.com', '$2y$10$JcINPxjguNEmdsdadBDkze4sEvjNihA.pHETqhnmJ5ORpJarD76C2', '0796648426', 1, 'Amman', '', 'hi', '2025-05-24 08:24:19', '2025-05-24 14:45:35'),
(2, 'محمد النابلسي', 'mohammad@dhan.com', '$2y$10$NhjclxB3TnuqC2.eHzByWeetGH4bR9djJUVpDuMnAUzsj8CCWRHSC', '0790000000', 2, 'Irbid', '', 'دهين نخب ', '2025-05-24 08:32:44', '2025-05-24 08:32:44'),
(3, 'محمد مصطفى', 'ahmad@ahmad.com', '$2y$10$lxPhQirH6wQrSFLSXmtsC.BsdckzTf.AmdDPRlfDaFoAPJOpYE/gK', '0791234567', 1, 'Alzarqa', '', 'معلم', '2025-05-24 08:34:27', '2025-05-28 17:11:29'),
(4, 'wdq', 'asemfas@gsdadmail.com', '$2y$10$Uf8e.3CbhzwQ8ulLU1SpY.87gG.nktqny1SCvIxn580ukiWgKifYu', '454665554', 1, 'Amman', '', 'sad', '2025-05-24 11:34:38', '2025-05-24 14:45:32'),
(5, 'mhngbf', 'asdfsfsdf@sfdfsdfs.com', '$2y$10$Kfc6Sw7O.HLJdDaTExuBMefodQywlLBdRzeZt.czHNseDqJcqE9OC', '78654321', 1, 'Amman', '', 'dsffsd', '2025-05-24 11:35:46', '2025-05-24 14:45:28'),
(6, 'mohammad', 'dlakd@fldsfmdslk.com', '$2y$10$xzmAVNv7Bs5COxp9TwrSGOvzQlKWgWUc5h/bFdRfASJ.QRU0VjoRa', '1234567897', 1, 'Amman', '', 'sdfsdf', '2025-05-24 14:45:06', '2025-05-24 14:45:06'),
(7, 'violet_perfumejo', 'aaaa@aaa.com', '$2y$10$yrPzcmr9IiYvlw8dvPXBtepkArUtTslsEHv.2E81/M10b4kp0DhvG', '1234567890', 5, 'Mafraq', '', 'asds', '2025-05-25 11:09:25', '2025-05-25 11:09:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `city`, `Address`, `created_at`, `updated_at`) VALUES
(1, '', 'asemfas@gmail.com', '$2y$10$9TDsqv2/G4ZAGmUgyZVyAuw55lwfxo8dtFaQhHDPCxCVYvzsobcdq', '0796648426', 'AMMAN', 'TLA AL ALI', '2025-05-22 17:01:45', '2025-05-22 17:01:45'),
(2, 'zaidanasem', 'asemfass@gmail.com', '$2y$10$wLb84Sl5XVet0Y6d5istIOw3bJvMdxmcNvei7roN6/FKmXG.xTo5a', '0796648426', 'AMMAN', 'TLA AL ALI', '2025-05-22 17:13:32', '2025-05-22 17:13:32'),
(6, 'asdas', 'fsds@ffd.com', '$2y$10$1hVTeLnYUTXQUqYKWTItw.KSqcruXPTIaNv3UsivUfexQ3G1XCJAK', '115145', 'adasd', 'asdad', '2025-05-24 15:08:12', '2025-05-24 15:08:12'),
(7, 'adasdad', 'asdasd@fdsf.com', '$2y$10$sbweSTbKjSqOVEv6z2dYJeU5wHJi4D8zuZxIMReTpmsd9sYrKUq7G', '1548949', 'Karak', 'TLA AL ALI', '2025-05-24 15:09:53', '2025-05-24 15:09:53'),
(8, 'asada', 'gdfgdf@fgfd.com', '$2y$10$As1yYXoaB062RwpBeRTl4uO/k3ZmcW2MBMjDVqfp61pmvknx.ccmu', '0795686413', 'Irbid', 'daadasd', '2025-05-25 11:19:30', '2025-05-25 11:19:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `technician_id` (`technician_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `technician_id` (`technician_id`),
  ADD KEY `service_category_id` (`service_category_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `service_categories`
--
ALTER TABLE `service_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `technicians`
--
ALTER TABLE `technicians`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `service_category_id` (`service_category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_categories`
--
ALTER TABLE `service_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `technicians`
--
ALTER TABLE `technicians`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_3` FOREIGN KEY (`technician_id`) REFERENCES `technicians` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`technician_id`) REFERENCES `technicians` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`service_category_id`) REFERENCES `service_categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `technicians`
--
ALTER TABLE `technicians`
  ADD CONSTRAINT `technicians_ibfk_1` FOREIGN KEY (`service_category_id`) REFERENCES `service_categories` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

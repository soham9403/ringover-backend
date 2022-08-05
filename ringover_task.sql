-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 05, 2022 at 08:23 PM
-- Server version: 5.7.36
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ringover_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `status` enum('in_cart','ordered') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `status`) VALUES
(1, 9, 'ordered'),
(2, 9, 'ordered');

-- --------------------------------------------------------

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customization_ids` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart_product`
--

INSERT INTO `cart_product` (`id`, `cart_id`, `product_id`, `customization_ids`) VALUES
(1, 1, 1, '3,5,11,13,15'),
(2, 1, 2, '18'),
(3, 2, 2, '18');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `image` text NOT NULL,
  `parent_category` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `slug` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image`, `parent_category`, `enabled`, `slug`) VALUES
(1, 'shoes', 'https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=pexels-web-donut-19090.jpg&fm=jpg', 0, 1, 'shoes'),
(2, 'shirts', 'https://m.media-amazon.com/images/I/71DBklVte9L._UX569_.jpg', 0, 0, 'shirts'),
(3, 'loafers', 'https://d1fufvy4xao6k9.cloudfront.net/images/landings/430/penny-loafers-for-men.jpg', 1, 1, 'loafers'),
(4, 'Sneakers', 'https://m.media-amazon.com/images/I/717aKXgCSJL._UY500_.jpg', 1, 1, 'Sneakers'),
(5, 'caps', 'https://m.media-amazon.com/images/I/61G6HqHEpZL._UL1500_.jpg', 0, 0, 'caps'),
(6, 'cap-sub', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShb-QXvKeKDaZxfufJ3VSQ3mDzZPrUllra7q19sRKaTfq5GZLQ2tQkljPp763h1r-DS84&usqp=CAU', 5, 0, 'cap-sub');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color`) VALUES
(1, '#000'),
(2, '#5c562d'),
(3, '#123fff'),
(4, '#156854');

-- --------------------------------------------------------

--
-- Table structure for table `customizes`
--

DROP TABLE IF EXISTS `customizes`;
CREATE TABLE IF NOT EXISTS `customizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `image` text NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customizes`
--

INSERT INTO `customizes` (`id`, `name`, `image`, `parent_id`, `product_id`) VALUES
(1, 'Front', '', 0, 1),
(2, 'front-1', 'http://localhost:8000/uploads/image513102-1659711418663.webp', 1, 1),
(3, 'front-2', 'http://localhost:8000/uploads/image414931-1659715634506.jpg', 1, 1),
(4, 'back', '', 0, 1),
(5, 'back-1', 'http://localhost:8000/uploads/image385026-1659715684117.webp', 4, 1),
(7, 'Middle', '', 0, 1),
(8, 'sole', '', 0, 1),
(9, 'Size', '', 0, 1),
(17, 'pr-2 front', '', 0, 2),
(11, 'middle-1', 'http://localhost:8000/uploads/image147261-1659718311984.webp', 7, 1),
(12, 'middle-2', 'http://localhost:8000/uploads/image343186-1659718336172.webp', 7, 1),
(13, 'sole-1', 'http://localhost:8000/uploads/image739348-1659718358686.jpg', 8, 1),
(14, '1', '', 9, 1),
(15, '2', '', 9, 1),
(16, '3', '', 9, 1),
(18, 'front-1', 'http://localhost:8000/uploads/image968317-1659719213896.webp', 17, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `cart_id`, `date`, `address`) VALUES
(3, 2, '2022-08-10', 'no addreeesss'),
(4, 1, '2022-08-10', 'xyz soc, syz area,xyz ,state,xyz countrye,0000000');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` text NOT NULL,
  `slug` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `creator_id`, `category_id`, `color_id`, `price`, `created_at`, `image`, `slug`) VALUES
(1, 'KSL 01', 1, 4, 1, 4000, '2022-08-05 07:41:29', 'http://localhost:8000/uploads/image687778-1659685289067.jpg', 'KSL-01'),
(2, 'pr-2', 1, 4, 1, 6000, '2022-08-05 07:57:05', 'http://localhost:8000/uploads/image327807-1659686225040.webp', 'pr-2-2'),
(3, 'pr-3-sneak', 1, 3, 4, 2000, '2022-08-05 08:02:40', 'http://localhost:8000/uploads/image948861-1659686560858.jpg', 'pr-3-sneak'),
(4, 'loafer-1', 1, 3, 2, 7000, '2022-08-05 08:07:44', 'http://localhost:8000/uploads/image184745-1659686864078.jpg', 'loafer-1'),
(5, 'p-4', 1, 3, 2, 12323, '2022-08-05 14:33:18', 'http://localhost:8000/uploads/image525301-1659709998437.jpg', 'p-435');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
CREATE TABLE IF NOT EXISTS `ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `value` enum('1','2','3','4','5') NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `product_id`, `value`, `user_id`) VALUES
(1, 4, '5', 1),
(2, 5, '4', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(60) NOT NULL,
  `address` text NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `role` enum('0','1','2','') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `address`, `mobile`, `role`) VALUES
(1, 'soham', 'sohampatel9403@gmail.com', '$2b$12$SdU/VsmfpXjtFvnThE3HLeomjxKvZjC.soOvGYu1QICIR7UogJ63q', 'adAddress', '8320911631', '1'),
(9, 'User 1', 'user@gmail.com', '$2b$12$bY465kw6iZIh/UO7peGlNejZzWcdVEEfAnI0C/g17H2cVWTZeJEE2', 'xyz soc, syz area,xyz ,state,xyz countrye,0000000', '8320911631', '2');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

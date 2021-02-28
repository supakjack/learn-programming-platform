-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2021 at 10:53 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learn-programming-platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `assesses`
--

CREATE TABLE `assesses` (
  `assessId` int(8) UNSIGNED NOT NULL,
  `assessAssignmentId` int(8) UNSIGNED NOT NULL,
  `assessRank` enum('easy','normal','hard') DEFAULT NULL,
  `assessTaskProblemId` int(8) UNSIGNED NOT NULL,
  `assessCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `assessUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `assessCreateBy` int(8) UNSIGNED NOT NULL,
  `assessUpdateBy` int(8) UNSIGNED NOT NULL,
  `assessStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignmentId` int(8) UNSIGNED NOT NULL,
  `assignmentTitle` varchar(255) NOT NULL,
  `assignmentDescription` varchar(255) DEFAULT NULL,
  `assignmentSectionId` int(8) UNSIGNED NOT NULL,
  `assignmentStartDate` datetime NOT NULL DEFAULT current_timestamp(),
  `assignmentEndDate` datetime NOT NULL DEFAULT current_timestamp(),
  `assignmentCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `assignmentUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `assignmentCreateBy` int(8) UNSIGNED NOT NULL,
  `assignmentUpdateBy` int(8) UNSIGNED NOT NULL,
  `assignmentStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignmentId`, `assignmentTitle`, `assignmentDescription`, `assignmentSectionId`, `assignmentStartDate`, `assignmentEndDate`, `assignmentCreateDate`, `assignmentUpdateDate`, `assignmentCreateBy`, `assignmentUpdateBy`, `assignmentStatus`) VALUES
(2, 'บวกลบเลขเบื้องต้น', 'บวกลบเลขเบื้องต้นโดยการเขียนโค้ด', 1, '2021-02-17 22:11:39', '2021-02-18 22:11:39', '2021-02-17 15:12:33', '2021-02-17 15:12:33', 1, 1, 'active'),
(3, 'บวกลบเลขเบื้องต้นโดยใช้ Array', 'หาผลคูณเลขยกกำลังโดยการเขียนโค้ด', 1, '2021-02-17 22:11:39', '2021-02-18 22:11:39', '2021-02-17 15:12:33', '2021-02-17 15:12:33', 1, 1, 'active'),
(4, 'บวกลบเลขเบื้องต้น', 'บวกลบเลขเบื้องต้นโดยการเขียนโค้ด', 3, '2021-02-17 22:11:39', '2021-02-18 22:11:39', '2021-02-17 15:12:33', '2021-02-17 15:12:33', 1, 1, 'active'),
(5, 'บวกลบเลขเบื้องต้นโดยใช้ Array', 'หาผลคูณเลขยกกำลังโดยการเขียนโค้ด', 3, '2021-02-17 22:11:39', '2021-02-18 22:11:39', '2021-02-17 15:12:33', '2021-02-17 15:12:33', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `compilelogs`
--

CREATE TABLE `compilelogs` (
  `compilelogId` int(8) UNSIGNED NOT NULL,
  `compilelogTaskId` int(8) UNSIGNED NOT NULL,
  `compilelogScore` int(4) UNSIGNED NOT NULL,
  `compilelogSubmitNo` int(2) UNSIGNED NOT NULL,
  `compilelogTestResult` varchar(10) NOT NULL,
  `compilelogErrorMessage` varchar(255) DEFAULT NULL,
  `compileloglanguage` varchar(255) NOT NULL,
  `compilelogFileId` int(8) UNSIGNED NOT NULL,
  `compilelogCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `compilelogUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `compilelogCreateBy` int(8) UNSIGNED NOT NULL,
  `compilelogUpdateBy` int(8) UNSIGNED NOT NULL,
  `compilelogStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `compilelogs`
--

INSERT INTO `compilelogs` (`compilelogId`, `compilelogTaskId`, `compilelogScore`, `compilelogSubmitNo`, `compilelogTestResult`, `compilelogErrorMessage`, `compileloglanguage`, `compilelogFileId`, `compilelogCreateDate`, `compilelogUpdateDate`, `compilelogCreateBy`, `compilelogUpdateBy`, `compilelogStatus`) VALUES
(3, 1, 100, 0, '', NULL, 'cpp', 1, '2021-02-18 07:36:31', '2021-02-18 07:36:31', 1, 1, 'active'),
(4, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 07:37:10', '2021-02-18 07:37:10', 1, 1, 'active'),
(5, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 07:44:42', '2021-02-18 07:44:42', 1, 1, 'active'),
(6, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 07:47:42', '2021-02-18 07:47:42', 1, 1, 'active'),
(7, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 07:50:05', '2021-02-18 07:50:05', 1, 1, 'active'),
(8, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 07:50:23', '2021-02-18 07:50:23', 1, 1, 'active'),
(9, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 07:52:24', '2021-02-18 07:52:24', 1, 1, 'active'),
(10, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 08:09:01', '2021-02-18 08:09:01', 1, 1, 'active'),
(11, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 08:12:17', '2021-02-18 08:12:17', 1, 1, 'active'),
(12, 1, 0, 0, '', NULL, 'cpp', 1, '2021-02-18 08:13:37', '2021-02-18 08:13:37', 1, 1, 'active'),
(13, 1, 0, 0, 'Compile Er', 'Line 18 semi colon', 'cpp', 1, '2021-02-24 03:36:50', '2021-02-24 03:36:50', 1, 1, 'active'),
(14, 1, 0, 0, 'Compile Er', 'Line 18 semi colon', 'cpp', 1, '2021-02-24 03:39:18', '2021-02-24 03:39:18', 1, 1, 'active'),
(15, 1, 83, 0, 'Wrong Answ', NULL, 'cpp', 1, '2021-02-24 03:39:41', '2021-02-24 03:39:41', 1, 1, 'active'),
(16, 1, 83, 1, 'Wrong Answ', NULL, 'cpp', 1, '2021-02-24 03:40:30', '2021-02-24 03:40:30', 1, 1, 'active'),
(17, 1, 100, 1, 'Accepted', NULL, 'cpp', 1, '2021-02-24 03:44:35', '2021-02-24 03:44:35', 1, 1, 'active'),
(18, 1, 17, 1, 'Compile Er', 'line 19 semicolon', 'cpp', 1, '2021-02-25 11:55:37', '2021-02-25 11:55:37', 1, 1, 'active'),
(19, 1, 17, 1, 'Compile Er', 'line 19 semicolon', 'cpp', 1, '2021-02-25 11:56:07', '2021-02-25 11:56:07', 1, 1, 'active'),
(20, 1, 17, 1, 'Compile Er', 'line 19 semicolon', 'cpp', 1, '2021-02-25 11:56:14', '2021-02-25 11:56:14', 1, 1, 'active'),
(21, 1, 33, 1, 'Compile Er', 'line 19 semicolon', 'cpp', 1, '2021-02-25 11:57:26', '2021-02-25 11:57:26', 1, 1, 'active'),
(22, 1, 33, 1, 'Compile Er', 'line 19 semicolon', 'cpp', 1, '2021-02-25 11:58:32', '2021-02-25 11:58:32', 1, 1, 'active'),
(23, 1, 17, 1, 'Compile Er', 'line 19 semicolon', 'cpp', 1, '2021-02-25 11:58:45', '2021-02-25 11:58:45', 1, 1, 'active'),
(24, 1, 100, 1, 'Accepted', NULL, 'cpp', 1, '2021-02-25 11:59:43', '2021-02-25 11:59:43', 1, 1, 'active'),
(25, 1, 83, 1, 'Wrong Answ', NULL, 'cpp', 1, '2021-02-25 11:59:56', '2021-02-25 11:59:56', 1, 1, 'active'),
(26, 1, 83, 1, 'Wrong Answ', NULL, 'cpp', 1, '2021-02-25 12:03:39', '2021-02-25 12:03:39', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `courseId` int(8) UNSIGNED NOT NULL,
  `courseCode` varchar(255) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `courseYearId` int(8) UNSIGNED NOT NULL,
  `courseCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `courseUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `courseCreateBy` int(8) UNSIGNED NOT NULL,
  `courseUpdateBy` int(8) UNSIGNED NOT NULL,
  `courseStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`courseId`, `courseCode`, `courseName`, `courseYearId`, `courseCreateDate`, `courseUpdateDate`, `courseCreateBy`, `courseUpdateBy`, `courseStatus`) VALUES
(1, '88814159', 'ภาษาซีพลัสพลัสเบื้องต้น', 1, '2021-02-17 15:10:26', '2021-02-17 15:10:26', 1, 1, 'active'),
(2, '88814259', 'ภาษาซีเบื้องต้น', 1, '2021-02-22 15:10:26', '2021-02-17 15:10:26', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `enrolls`
--

CREATE TABLE `enrolls` (
  `enrollId` int(8) UNSIGNED NOT NULL,
  `enrollUserId` int(8) UNSIGNED NOT NULL,
  `enrollSectionId` int(8) UNSIGNED NOT NULL,
  `enrollRole` enum('student','teacher') NOT NULL,
  `enrollCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `enrollUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `enrollCreateBy` int(8) UNSIGNED NOT NULL,
  `enrollUpdateBy` int(8) UNSIGNED NOT NULL,
  `enrollStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `enrolls`
--

INSERT INTO `enrolls` (`enrollId`, `enrollUserId`, `enrollSectionId`, `enrollRole`, `enrollCreateDate`, `enrollUpdateDate`, `enrollCreateBy`, `enrollUpdateBy`, `enrollStatus`) VALUES
(1, 2, 1, 'student', '2021-02-22 13:39:17', '2021-02-22 13:39:17', 1, 1, 'active'),
(2, 1, 1, 'teacher', '2021-02-22 13:41:38', '2021-02-22 13:41:38', 1, 1, 'active'),
(3, 2, 4, 'student', '2021-02-22 13:45:20', '2021-02-22 13:45:20', 1, 1, 'active'),
(4, 1, 4, 'teacher', '2021-02-24 05:24:26', '2021-02-24 05:24:26', 1, 1, 'active'),
(6, 1, 3, 'teacher', '2021-02-24 08:05:06', '2021-02-24 08:05:06', 1, 1, 'active'),
(7, 1, 5, 'teacher', '2021-02-24 08:05:13', '2021-02-24 08:05:13', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `fileId` int(8) UNSIGNED NOT NULL,
  `filePath` varchar(255) NOT NULL,
  `fileType` enum('source','picture') DEFAULT 'source',
  `fileCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `fileUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `fileCreateBy` int(8) UNSIGNED NOT NULL,
  `fileUpdateBy` int(8) UNSIGNED NOT NULL,
  `fileStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`fileId`, `filePath`, `fileType`, `fileCreateDate`, `fileUpdateDate`, `fileCreateBy`, `fileUpdateBy`, `fileStatus`) VALUES
(1, '..\\storages\\2077\\88814159\\sec-1\\Common math\\add 2 number\\60160170\\no--Infinity\\main.cpp', 'source', '2021-02-17 15:35:15', '2021-02-17 15:35:15', 2, 2, 'active'),
(2, '..\\storages\\2077\\88814159\\sec-1\\Common math\\add 2 number\\60160170\\no--Infinity\\main.cpp', 'source', '2021-02-17 15:36:22', '2021-02-17 15:36:22', 2, 2, 'active'),
(3, '..\\storages\\2077\\88814159\\sec-1\\Common math\\add 2 number\\60160170\\no--Infinity\\main.cpp', 'source', '2021-02-17 15:39:00', '2021-02-17 15:39:00', 2, 2, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `hashtags`
--

CREATE TABLE `hashtags` (
  `hashtagId` int(8) UNSIGNED NOT NULL,
  `hashtagTagId` int(8) UNSIGNED NOT NULL,
  `hashtagProblemId` int(8) UNSIGNED NOT NULL,
  `hashtagCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `hashtagUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `hashtagCreateBy` int(8) UNSIGNED NOT NULL,
  `hashtagUpdateBy` int(8) UNSIGNED NOT NULL,
  `hashtagStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hashtags`
--

INSERT INTO `hashtags` (`hashtagId`, `hashtagTagId`, `hashtagProblemId`, `hashtagCreateDate`, `hashtagUpdateDate`, `hashtagCreateBy`, `hashtagUpdateBy`, `hashtagStatus`) VALUES
(1, 1, 1, '2021-02-17 15:23:29', '2021-02-17 15:23:29', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `pictureId` int(8) UNSIGNED NOT NULL,
  `pictureFileId` int(8) UNSIGNED NOT NULL,
  `pictureProblemId` int(8) UNSIGNED NOT NULL,
  `pictureCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `pictureUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `pictureCreateBy` int(8) UNSIGNED NOT NULL,
  `pictureUpdateBy` int(8) UNSIGNED NOT NULL,
  `pictureStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `problems`
--

CREATE TABLE `problems` (
  `problemId` int(8) UNSIGNED NOT NULL,
  `problemTitle` varchar(255) DEFAULT NULL,
  `problemDescription` text NOT NULL,
  `problemCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `problemUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `problemCreateBy` int(8) UNSIGNED NOT NULL,
  `problemUpdateBy` int(8) UNSIGNED NOT NULL,
  `problemStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `problems`
--

INSERT INTO `problems` (`problemId`, `problemTitle`, `problemDescription`, `problemCreateDate`, `problemUpdateDate`, `problemCreateBy`, `problemUpdateBy`, `problemStatus`) VALUES
(1, 'โจทย์บวกเลข 2 จำนวน', 'ให้นิสิตรับข้อมูลเป็นตัวเลขจำนวน 2 จำนวน แล้วนำมาบวกกัน', '2021-02-15 05:18:20', '2021-02-15 05:18:20', 1, 1, 'active'),
(2, 'โจทย์หาผลคูณเลขยกกำลัง 2 ', 'ให้นิสิตรับข้อมูลเป็นตัวเลขจำนวน 2 จำนวน แล้วนำมาหาผลคูณ', '2021-02-26 05:18:20', '2021-02-26 05:18:20', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `sectionId` int(8) UNSIGNED NOT NULL,
  `sectionNumber` int(4) NOT NULL,
  `sectionCourseId` int(8) UNSIGNED NOT NULL,
  `sectionCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `sectionUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `sectionCreateBy` int(8) UNSIGNED NOT NULL,
  `sectionUpdateBy` int(8) UNSIGNED NOT NULL,
  `sectionStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`sectionId`, `sectionNumber`, `sectionCourseId`, `sectionCreateDate`, `sectionUpdateDate`, `sectionCreateBy`, `sectionUpdateBy`, `sectionStatus`) VALUES
(1, 1, 1, '2021-02-17 15:10:46', '2021-02-17 15:10:46', 1, 1, 'active'),
(3, 2, 1, '2021-02-17 15:10:46', '2021-02-17 15:10:46', 1, 1, 'active'),
(4, 1, 2, '2021-02-22 13:44:59', '2021-02-22 13:44:59', 1, 1, 'active'),
(5, 2, 2, '2021-02-24 08:01:16', '2021-02-24 08:01:16', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tagId` int(8) UNSIGNED NOT NULL,
  `tagName` varchar(255) NOT NULL,
  `tagCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `tagUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `tagCreateBy` int(8) UNSIGNED NOT NULL,
  `tagUpdateBy` int(8) UNSIGNED NOT NULL,
  `tagStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tagId`, `tagName`, `tagCreateDate`, `tagUpdateDate`, `tagCreateBy`, `tagUpdateBy`, `tagStatus`) VALUES
(1, 'Week 01', '2021-02-10 07:32:57', '2021-02-10 07:32:57', 1, 1, 'active'),
(2, 'Week 02', '2021-02-10 07:33:35', '2021-02-10 07:33:48', 1, 1, 'delete'),
(3, 'Week 023', '2021-02-10 07:33:46', '2021-02-10 08:02:03', 1, 1, 'delete'),
(4, 'Array', '2021-02-10 07:34:09', '2021-02-10 07:42:29', 1, 1, 'inactive'),
(5, 'Inheritance', '2021-02-10 07:35:47', '2021-02-10 07:38:32', 1, 1, 'inactive'),
(6, 'Yolo multi camera tracking', '2021-02-10 07:36:01', '2021-02-10 07:36:03', 1, 1, 'delete'),
(7, 'ทดสอบ', '2021-02-10 07:59:34', '2021-02-10 07:59:34', 1, 1, 'active'),
(8, 'ทดสอบ233', '2021-02-10 08:00:46', '2021-02-10 08:00:54', 1, 1, 'delete'),
(9, 'ทดสอบสร้างแท็ก 2', '2021-02-10 08:09:06', '2021-02-10 08:09:28', 1, 1, 'delete'),
(10, 'ทดสอบ', '2021-02-11 12:03:13', '2021-02-11 12:03:13', 1, 1, 'active'),
(11, 'ทดสอบ 3', '2021-02-11 12:10:16', '2021-02-11 12:11:25', 1, 1, 'delete');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskId` int(8) UNSIGNED NOT NULL,
  `taskLimit` int(2) DEFAULT NULL,
  `taskScore` float(6,2) DEFAULT NULL,
  `taskProblemId` int(8) UNSIGNED NOT NULL,
  `taskAssignmentId` int(8) UNSIGNED NOT NULL,
  `taskStartDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `taskEndDate` timestamp NULL DEFAULT NULL,
  `taskCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `taskUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `taskCreateBy` int(8) UNSIGNED NOT NULL,
  `taskUpdateBy` int(8) UNSIGNED NOT NULL,
  `taskStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`taskId`, `taskLimit`, `taskScore`, `taskProblemId`, `taskAssignmentId`, `taskStartDate`, `taskEndDate`, `taskCreateDate`, `taskUpdateDate`, `taskCreateBy`, `taskUpdateBy`, `taskStatus`) VALUES
(1, NULL, 100.00, 1, 2, '2021-02-17 15:12:42', '2021-02-18 15:12:42', '2021-02-17 15:14:05', '2021-02-17 15:14:05', 1, 1, 'active'),
(2, NULL, 100.00, 2, 2, '2021-02-28 15:12:42', '2021-03-07 15:12:42', '2021-02-28 15:14:05', '2021-02-28 15:14:05', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `testsets`
--

CREATE TABLE `testsets` (
  `testsetId` int(8) UNSIGNED NOT NULL,
  `testsetTitle` varchar(255) NOT NULL,
  `testsetDescription` varchar(255) DEFAULT NULL,
  `testsetInput` text DEFAULT NULL,
  `testsetOutput` text NOT NULL,
  `testsetProblemId` int(8) UNSIGNED NOT NULL,
  `testsetIsExample` tinyint(1) NOT NULL,
  `testsetCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `testsetUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `testsetCreateBy` int(8) UNSIGNED NOT NULL,
  `testsetUpdateBy` int(8) UNSIGNED NOT NULL,
  `testsetStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `testsets`
--

INSERT INTO `testsets` (`testsetId`, `testsetTitle`, `testsetDescription`, `testsetInput`, `testsetOutput`, `testsetProblemId`, `testsetIsExample`, `testsetCreateDate`, `testsetUpdateDate`, `testsetCreateBy`, `testsetUpdateBy`, `testsetStatus`) VALUES
(1, 'บวกเลขจำนวนเต็มบวก', 'ตัวรับทั้ง 2 จำนวนเป็นเลขจำนวนเต็มบวก', '1 2', 'Sum is: 3\r\n', 1, 1, '2021-02-15 05:19:40', '2021-02-15 05:19:40', 1, 1, 'active'),
(2, 'บวกเลขจำนวนเต็มลบ', 'ตัวรับทั้ง 2 จำนวนเป็นเลขจำนวนเต็มลบ', '-1 -2', 'Sum is: -3\r\n', 1, 1, '2021-02-15 05:19:40', '2021-02-15 05:19:40', 1, 1, 'active'),
(3, 'บวกเลขจำนวนเต็มบวกและจำนวนเต็มลบ', 'ตัวรับทั้ง 2 จำนวนเป็นเลขจำนวนเต็มยวกและจำนวนเต็มลบ', '-1 2', 'Sum is: 1\r\n', 1, 0, '2021-02-15 05:19:40', '2021-02-15 05:19:40', 1, 1, 'active'),
(4, 'บวกเลขจำนวนเต็มศูนย์', 'ตัวรับทั้ง 2 จำนวนเป็นเลขจำนวนเต็มศูนย์', '0 0', 'Sum is: 0\r\n', 1, 0, '2021-02-15 05:19:40', '2021-02-15 05:19:40', 1, 1, 'active'),
(5, 'บวกเลขจำนวนเต็มบวกและเต็มศูนย์', 'ตัวรับทั้ง 2 จำนวนเป็นเลขจำนวนเต็มบวกและเต็ม\r\nศูนย์', '2 0', 'Sum is: 2\r\n', 1, 0, '2021-02-15 05:19:40', '2021-02-15 05:19:40', 1, 1, 'active'),
(6, 'บวกเลขจำนวนเต็มลบและเต็มศูนย์', 'ตัวรับทั้ง 2 จำนวนเป็นเลขจำนวนเต็มลบและเต็ม\r\nศูนย์', '-1 0', 'Sum is: -1\r\n', 1, 0, '2021-02-15 05:19:40', '2021-02-15 05:19:40', 1, 1, 'active'),
(7, 'คูณกำลังเต็มบวก', 'รับผลคูณเป็นเลขจำนวนเต็มบวก', '2,2', 'result: 4', 2, 1, '2021-02-26 05:47:23', '2021-02-26 05:47:23', 1, 1, 'active'),
(8, 'คูณกำลังเต็มลบ', 'รับผลคูณเป็นเลขจำนวนเต็มบวก', '-2,-2', 'result: 4', 2, 1, '2021-02-26 05:48:01', '2021-02-26 05:48:01', 1, 1, 'active'),
(9, 'คูณกำลังเต็มบวกและลบ', 'รับผลคูณเป็นเลขจำนวนเต็มบวกและจำนวนเต็มลบ', '-2,2', 'result: -4', 2, 1, '2021-02-26 05:48:01', '2021-02-26 05:48:01', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(8) UNSIGNED NOT NULL,
  `userUsername` varchar(20) NOT NULL,
  `userPrefixThai` varchar(20) NOT NULL,
  `userPrefixEnglish` varchar(20) NOT NULL,
  `userFirstnameThai` varchar(255) NOT NULL,
  `userFirstnameEnglish` varchar(255) NOT NULL,
  `userLastnameThai` varchar(255) NOT NULL,
  `userLastnameEnglish` varchar(255) NOT NULL,
  `userCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `userUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `userCreateBy` int(8) UNSIGNED NOT NULL,
  `userUpdateBy` int(8) UNSIGNED NOT NULL,
  `userStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userUsername`, `userPrefixThai`, `userPrefixEnglish`, `userFirstnameThai`, `userFirstnameEnglish`, `userLastnameThai`, `userLastnameEnglish`, `userCreateDate`, `userUpdateDate`, `userCreateBy`, `userUpdateBy`, `userStatus`) VALUES
(1, 'admin', 'นาย', 'Mr.', 'แอดมิน', 'admin', 'แอดมิน', 'admin', '2021-02-10 07:25:27', '2021-02-10 07:25:27', 1, 1, 'active'),
(2, '60160170', 'นาย', 'Mr.', 'นิพิฐพนธ์', 'Niphitphon', 'ถนัดกุลกิจ', 'Thanatkulkit', '2021-02-10 07:25:27', '2021-02-10 07:25:27', 1, 1, 'active'),
(3, 'admin2', 'นาย', 'Mr.', 'แอดมิน2', 'admin2', 'แอดมิน2', 'admin2', '2021-02-10 07:25:27', '2021-02-10 07:25:27', 1, 1, 'active'),
(4, '60160344', 'นาย', 'Mr.', 'พฤกษ์', 'Phurk', 'เทพพิทักษ์', 'Theppitak', '2021-02-28 07:20:48', '2021-02-28 07:20:48', 1, 1, 'active'),
(5, '60160334', 'นางสาว', 'Ms.', 'ชนากานต์', 'Chanakarn', 'โฮ่กี่', 'Hokee', '2021-02-28 08:47:33', '2021-02-28 08:47:33', 1, 1, 'active'),
(6, '60160094', 'นางสาว', 'Ms.', 'ยศพัท', 'Yotsapat', 'ภู่รพงห์', 'Phurahong', '2021-02-28 08:52:01', '2021-02-28 08:52:01', 1, 1, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `years`
--

CREATE TABLE `years` (
  `yearId` int(8) UNSIGNED NOT NULL,
  `yearName` varchar(4) DEFAULT NULL,
  `yearSemester` int(2) DEFAULT NULL,
  `yearCreateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `yearUpdateDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `yearCreateBy` int(8) UNSIGNED NOT NULL,
  `yearUpdateBy` int(8) UNSIGNED NOT NULL,
  `yearStatus` enum('active','inactive','delete') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `years`
--

INSERT INTO `years` (`yearId`, `yearName`, `yearSemester`, `yearCreateDate`, `yearUpdateDate`, `yearCreateBy`, `yearUpdateBy`, `yearStatus`) VALUES
(1, '2560', 1, '2021-02-17 15:10:12', '2021-02-17 15:10:12', 1, 1, 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assesses`
--
ALTER TABLE `assesses`
  ADD PRIMARY KEY (`assessId`),
  ADD KEY `assessAssignmentId` (`assessAssignmentId`),
  ADD KEY `assessTaskProblemId` (`assessTaskProblemId`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignmentId`),
  ADD KEY `assignmentSectionId` (`assignmentSectionId`);

--
-- Indexes for table `compilelogs`
--
ALTER TABLE `compilelogs`
  ADD PRIMARY KEY (`compilelogId`),
  ADD KEY `compilelogTaskId` (`compilelogTaskId`),
  ADD KEY `compilelogFileId` (`compilelogFileId`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courseId`),
  ADD KEY `courseYearId` (`courseYearId`);

--
-- Indexes for table `enrolls`
--
ALTER TABLE `enrolls`
  ADD PRIMARY KEY (`enrollId`),
  ADD KEY `enrollUserId` (`enrollUserId`),
  ADD KEY `enrollSectionId` (`enrollSectionId`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`fileId`);

--
-- Indexes for table `hashtags`
--
ALTER TABLE `hashtags`
  ADD PRIMARY KEY (`hashtagId`),
  ADD KEY `hashtagTagId` (`hashtagTagId`),
  ADD KEY `hashtagProblemId` (`hashtagProblemId`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`pictureId`),
  ADD KEY `pictureFileId` (`pictureFileId`),
  ADD KEY `pictureProblemId` (`pictureProblemId`);

--
-- Indexes for table `problems`
--
ALTER TABLE `problems`
  ADD PRIMARY KEY (`problemId`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`sectionId`),
  ADD KEY `sectionCourseId` (`sectionCourseId`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tagId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskId`),
  ADD KEY `taskProblemId` (`taskProblemId`),
  ADD KEY `taskAssignmentId` (`taskAssignmentId`);

--
-- Indexes for table `testsets`
--
ALTER TABLE `testsets`
  ADD PRIMARY KEY (`testsetId`),
  ADD KEY `testsetProblemId` (`testsetProblemId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `years`
--
ALTER TABLE `years`
  ADD PRIMARY KEY (`yearId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assesses`
--
ALTER TABLE `assesses`
  MODIFY `assessId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignmentId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `compilelogs`
--
ALTER TABLE `compilelogs`
  MODIFY `compilelogId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `courseId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrolls`
--
ALTER TABLE `enrolls`
  MODIFY `enrollId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `fileId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hashtags`
--
ALTER TABLE `hashtags`
  MODIFY `hashtagId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `pictureId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `problems`
--
ALTER TABLE `problems`
  MODIFY `problemId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `sectionId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tagId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `testsets`
--
ALTER TABLE `testsets`
  MODIFY `testsetId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `years`
--
ALTER TABLE `years`
  MODIFY `yearId` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assesses`
--
ALTER TABLE `assesses`
  ADD CONSTRAINT `assesses_ibfk_1` FOREIGN KEY (`assessAssignmentId`) REFERENCES `assignments` (`assignmentId`),
  ADD CONSTRAINT `assesses_ibfk_2` FOREIGN KEY (`assessTaskProblemId`) REFERENCES `tasks` (`taskProblemId`);

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`assignmentSectionId`) REFERENCES `sections` (`sectionId`);

--
-- Constraints for table `compilelogs`
--
ALTER TABLE `compilelogs`
  ADD CONSTRAINT `compilelogs_ibfk_1` FOREIGN KEY (`compilelogTaskId`) REFERENCES `tasks` (`taskId`),
  ADD CONSTRAINT `compilelogs_ibfk_2` FOREIGN KEY (`compilelogFileId`) REFERENCES `files` (`fileId`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`courseYearId`) REFERENCES `years` (`yearId`);

--
-- Constraints for table `enrolls`
--
ALTER TABLE `enrolls`
  ADD CONSTRAINT `enrolls_ibfk_1` FOREIGN KEY (`enrollUserId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `enrolls_ibfk_2` FOREIGN KEY (`enrollSectionId`) REFERENCES `sections` (`sectionId`);

--
-- Constraints for table `hashtags`
--
ALTER TABLE `hashtags`
  ADD CONSTRAINT `hashtags_ibfk_1` FOREIGN KEY (`hashtagTagId`) REFERENCES `tags` (`tagId`),
  ADD CONSTRAINT `hashtags_ibfk_2` FOREIGN KEY (`hashtagProblemId`) REFERENCES `problems` (`problemId`);

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`pictureFileId`) REFERENCES `files` (`fileId`),
  ADD CONSTRAINT `pictures_ibfk_2` FOREIGN KEY (`pictureProblemId`) REFERENCES `problems` (`problemId`);

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`sectionCourseId`) REFERENCES `courses` (`courseId`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`taskProblemId`) REFERENCES `problems` (`problemId`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`taskAssignmentId`) REFERENCES `assignments` (`assignmentId`);

--
-- Constraints for table `testsets`
--
ALTER TABLE `testsets`
  ADD CONSTRAINT `testsets_ibfk_1` FOREIGN KEY (`testsetProblemId`) REFERENCES `problems` (`problemId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

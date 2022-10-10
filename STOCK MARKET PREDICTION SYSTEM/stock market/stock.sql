-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 27, 2019 at 07:31 AM
-- Server version: 5.1.41
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `predication`
--

CREATE TABLE IF NOT EXISTS `predication` (
  `camp` varchar(200) NOT NULL,
  `val` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `predication`
--

INSERT INTO `predication` (`camp`, `val`) VALUES
('xyz', '234'),
('ASD', '789'),
('LKJ', '987');

-- --------------------------------------------------------

--
-- Table structure for table `s`
--

CREATE TABLE IF NOT EXISTS `s` (
  `email` varchar(200) NOT NULL,
  `sen1` varchar(200) NOT NULL,
  `sen2` varchar(200) NOT NULL,
  `sen3` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `s`
--

INSERT INTO `s` (`email`, `sen1`, `sen2`, `sen3`) VALUES
('demo@gmail.com', '20', '30', '40'),
('shelar.srs@gmail.com', '500', '100', '789'),
('shelar.srs@gmail.com', '', '', ''),
('shelar.srs@gmail.com', '', '', ''),
('shelar.srs@gmail.com', '', '', ''),
('shelar.srs@gmail.com', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `camp` varchar(200) NOT NULL,
  `val` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`camp`, `val`) VALUES
('AAA', '555'),
('BBB', '456');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(300) NOT NULL,
  `contactno` varchar(11) NOT NULL,
  `posting_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`, `contactno`, `posting_date`) VALUES
(27, 'demo', 'demo', 'demo@gmail.com', 'demo', '7778889991', '2017-06-20'),
(28, 'sanjay', 'shelar', 'shelar.srs@gmail.com', 'sanjay', '9890704605', '2017-06-21'),
(29, 'sanjay', 'shelar', 'shelar.srs@gmail.com', 'Sanjay$@141', '9890704605', '2019-05-24');

-- --------------------------------------------------------

--
-- Table structure for table `v`
--

CREATE TABLE IF NOT EXISTS `v` (
  `otp` varchar(200) NOT NULL,
  `key` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `v`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

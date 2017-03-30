-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2017 at 01:04 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aroidbkk`
--

-- --------------------------------------------------------

--
-- Table structure for table `cat_order`
--

CREATE TABLE `cat_order` (
  `id_res` int(4) NOT NULL,
  `id_cat` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cat_order`
--

INSERT INTO `cat_order` (`id_res`, `id_cat`) VALUES
(12, 4),
(12, 5);

-- --------------------------------------------------------

--
-- Table structure for table `cat_restaurant`
--

CREATE TABLE `cat_restaurant` (
  `id_cat` int(4) NOT NULL,
  `name_cat` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cat_restaurant`
--

INSERT INTO `cat_restaurant` (`id_cat`, `name_cat`) VALUES
(1, 'ก๋วยเตี๋ยว'),
(2, 'ชาบู/หมูกระทะ'),
(3, 'บุฟเฟ่ต์'),
(4, 'ร้านกาแฟ/ชา'),
(5, 'เครื่องดื่ม/น้ำปั่น'),
(6, 'สเต็ก'),
(7, 'อาหารญี่ปุ่น'),
(8, 'เบเกอรี่'),
(9, 'ไอศกรีม'),
(10, 'พิซซ่า'),
(11, 'อาหารอีสาน'),
(12, 'อาหารตามสั่ง');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id_res` int(4) NOT NULL,
  `coupon_content` text CHARACTER SET utf8 NOT NULL,
  `coupon_code` varchar(7) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id_res`, `coupon_content`, `coupon_code`, `timestamp`) VALUES
(12, 'รับฟรี 1 แก้ว', 'A15484', '2017-03-24 15:11:39'),
(13, 'กินฟรี', '451547', '2017-03-07 15:11:56');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id_res` int(4) NOT NULL,
  `name_res` varchar(50) CHARACTER SET utf8 NOT NULL,
  `type_res` varchar(30) CHARACTER SET utf8 NOT NULL,
  `map_lat` varchar(20) CHARACTER SET utf8 NOT NULL,
  `map_lon` varchar(20) CHARACTER SET utf8 NOT NULL,
  `address_res` text CHARACTER SET utf8 NOT NULL,
  `area_res` varchar(30) CHARACTER SET utf8 NOT NULL,
  `tel` varchar(20) CHARACTER SET utf8 NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `min_price` int(4) NOT NULL,
  `max_price` int(4) NOT NULL,
  `score_atm` int(11) NOT NULL DEFAULT '0',
  `score_taste` int(11) NOT NULL DEFAULT '0',
  `score_service` int(11) NOT NULL DEFAULT '0',
  `score_total` float NOT NULL DEFAULT '0',
  `num_vote` int(5) NOT NULL DEFAULT '0',
  `service_1` int(1) NOT NULL DEFAULT '0',
  `service_2` int(1) NOT NULL DEFAULT '0',
  `service_3` int(1) NOT NULL DEFAULT '0',
  `service_4` int(1) NOT NULL DEFAULT '0',
  `service_5` int(1) NOT NULL DEFAULT '0',
  `img` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id_res`, `name_res`, `type_res`, `map_lat`, `map_lon`, `address_res`, `area_res`, `tel`, `content`, `min_price`, `max_price`, `score_atm`, `score_taste`, `score_service`, `score_total`, `num_vote`, `service_1`, `service_2`, `service_3`, `service_4`, `service_5`, `img`) VALUES
(47, 'นมเย็น ณ ลาดกระบัง', 'ก๋วยเตี๋ยว', '13.764931682823326', '100.5383068171966', 'ฟหกหฟกหฟก', 'บางกะปิ', '08474', 'กหฟกหฟกหฟกหก', 20, 30, 0, 0, 0, 8.1, 0, 1, 0, 0, 1, 0, '1490441129163'),
(48, 'จุด 3 จุด', 'สเต็ก', '13.764931682823326', '100.5383068171966', 'หกฟหก', 'บางขุนเทียน', '0874809909', 'ฟหกหฟก', 15, 300, 8, 5, 9, 3.6, 1, 1, 0, 0, 1, 0, '1490441377134'),
(49, 'ปังนัง ปัตตานี', 'ร้านกาแฟ/ชา', '13.72790543485809', '100.77040738836058', 'เกกีงาม ซอย 2', 'ลาดกระบัง', '0874809909', 'ร้านเปิดทุกวันจ้าาาาาา', 20, 150, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, '1490471359627'),
(50, 'แซ่บวัน รัชดา', 'อาหารอีสาน', '13.7689044', '100.57260070000007', '43/5 หน้า AIA', 'ห้วยขวาง', '084809454', 'fgdfgfdg', 50, 400, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, '1490472585007'),
(51, 'ร้านป้าเจี๊ยบ', 'อาหารตามสั่ง', '13.761201040719179', '100.54024337210535', 'หน้าปากซอยเนินตูม', 'สายไหม', '0874809909', 'สั่งได้เลยตามใจชอบจ้าาาาาาา', 5, 500, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, '1490537632753'),
(52, 'DEAN & DELUCA (ดีน แอนด์ เดลูก้า) มหานคร คิ้วบ์', 'ก๋วยเตี๋ยว', '13.806944187419612', '100.53607521929621', '96 โครงการ Mahanakhon ถ.นราธิวาสราชนครินทร์ กรุงเทพมหานคร (ตึก Mahanakhon Cube ถนน นราธิวาสราชนครินทร์)', 'พญาไท', '0874809909', 'ร้านนี้เปิดตั้งแต่ 7 โมงเช้าถึงห้าทุ่ม Concept ของร้านเป็น international gourmet market \nเชฟที่นี่จะมาจากหลายชาติ อาหารก็จะมีของหลายชาติเช่นกัน แต่ละเดือนก็จะมีเมนูพิเศษออกมาเรื่อยๆ \nที่ร้านนี้เป็น All day breakfast จะมาช่วงมื้อบ่ายหรือตอนไหนก็สามารถสั่งได้ เมนูแนะนำคือ \n\n1. Egg Benedict smoked salmon ใช้ปลาแซลมอนจากสก็อตแลนด์ เป็น egg benedict ที่รสชาติดีมาก ไม่เลี่ยน น่าจะถูกปากคนไทย เสิร์ฟคู่กับมันฝรั่งคลุกสมุนไพรและเครื่องเทศ รสชาติอร่อยลงตัวเลยทีเดียว \n\n2. Bacon Egg Avocado Sandwich เป็นขนมปังที่ทางร้านอบเอง มาพร้อมกับไข่ดาวแบบไม่สุก เบคอน \nหน่อไม้ฝรั่ง และอโวคาโด้แบบไม่หวงเครื่อง เป็นแซนวิชที่ทั้งอร่อยและอิ่ม \n\n3. Dean&Deluca Waffle สำหรับคนชอบของหวาน เป็น Waffle Tower เสิร์ฟพร้อมเบอร์รี่ต่างๆ ราดซอส จุดเด่น อยู่ที่แป้งหอมอร่อยที่เป็นแบรนด์ของ Dean & Deluca ซึ่งถ้าชอบก็สามารถซื้อกลับไปทำเองที่บ้านได้ด้วย \n\nสำหรับเมนูเครื่องดื่มแนะนำเป็น New York Peach Soda เป็นเมนูที่ขายดีที่สุด กินแล้วสดชื่นมาก เหมาะกับอากาศร้อนๆ โซดามีให้เลือกหลายรสชาติ แต่อันที่ขายดีที่สุดนี้จะเป็นรสพีช ซึ่งผสมเนื้อพีชอยู่ด้านล่าง และมีน้ำแข็งรสมินท์อยู่ด้านบน เข้ากันอย่างลงตัว \n\nและเมนูสุดท้ายเป็นเมนูเครื่องดื่ม Signature ของร้าน คือ Mango Sticky Rice Smoothie หรือก็คือข้าวเหนียวมะม่วงนี่เอง โดยที่เอามะม่วงมาปั่นกับข้าวเหนียวจริงๆ แต่ก็ไม่ได้มีกลิ่นมะม่วงมากนัก คนที่ถนัดทานมะม่วงก็น่าจะทานได้ มีกลิ่นหอมของข้าวเหนียวและมีครีมด้านบน อร่อยและหนักท้องพอสมควรเลย', 50, 790, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, '1490539921592'),
(53, 'โอดิบ โอวัลติน', 'เครื่องดื่ม/น้ำปั่น', '13.727321782396137', '100.77021426931151', 'ศูนย์อาหารลาดกระบัง', 'ลาดกระบัง', '023536333', 'ขายน้ำปั่นทุกอย่าง\nป้าใจดีมากๆ\nให้วิปครีมด้วย', 20, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '1490541019872');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cat_restaurant`
--
ALTER TABLE `cat_restaurant`
  ADD PRIMARY KEY (`id_cat`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id_res`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id_res`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id_res` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

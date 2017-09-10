-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Сен 10 2017 г., 13:36
-- Версия сервера: 5.7.14
-- Версия PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `wordpress_test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `wp_businesscardcreator_design`
--

CREATE TABLE `wp_businesscardcreator_design` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Version` int(11) NOT NULL,
  `Slug` varchar(255) NOT NULL,
  `Description` text,
  `UserId` int(11) DEFAULT NULL,
  `FieldsData` mediumtext NOT NULL,
  `DesignData` mediumtext NOT NULL,
  `Preview` mediumtext,
  `Create_Date` datetime DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `Preview_Order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `wp_businesscardcreator_design`
--

INSERT INTO `wp_businesscardcreator_design` (`id`, `Name`, `Version`, `Slug`, `Description`, `UserId`, `FieldsData`, `DesignData`, `Preview`, `Create_Date`, `isActive`, `Preview_Order`) VALUES
(1, 'pageNotFound', 1, 'pageNotFound', NULL, NULL, '{"addresses":[],"emails":[],"logos":[],"organisations":[],"owners":["DESIGN NOT FOUND"],"phones":[],"positions":[],"sites":[]}', '{"addresses":[],"background":{"_backgroundColor":"#fff","height_mm":55,"src":"","width_mm":85},"emails":[],"lines":[],"logos":[],"organisations":[],"owners":[{"colorStr":"000","fontFamily":"Open Sans","fontSize_mm":6,"fontStyle":"normal","fontWeight":"bold","left_mm":10,"textDecoration":"none","top_mm":10}],"phones":[],"positions":[],"sites":[]}', NULL, NULL, 1, 0),
(2, 'Design 2', 1, 'des2', '', NULL, '{"addresses":["New York, NY, USA"],"emails":["marvelsubs@midtowncomics.com"],"logos":["http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des2/logo_0."],"organisations":["Marvel Entertainment LLC"],"owners":["James Howlett"],"phones":["+(1212)576-400-00"],"positions":["Logan"],"sites":["marvel.com"]}', '{"addresses":[{"colorStr":"000","fontFamily":"Open Sans","fontSize_mm":1.2,"fontStyle":"normal","fontWeight":"normal","left_mm":51.428571428571,"textDecoration":"none","top_mm":34}],"background":{"_backgroundColor":"#f5f5dc","height_mm":55,"src":"http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des2/bg.png","width_mm":85},"emails":[{"colorStr":"000","fontFamily":"Open Sans","fontSize_mm":1.2,"fontStyle":"normal","fontWeight":"normal","left_mm":51.428571428571,"textDecoration":"none","top_mm":40}],"lines":[{"_color":"00f","_thickness":1,"design":"solid","isHorizontal":true,"left_mm":0,"length_mm":84.714285714286,"top_mm":30}],"logos":[{"height_mm":21.714285714286,"left_mm":16.857142857143,"top_mm":5,"width_mm":45.285714285714}],"organisations":[{"colorStr":"000","fontFamily":"Open Sans","fontSize_mm":1.2,"fontStyle":"normal","fontWeight":"bold","left_mm":5,"textDecoration":"none","top_mm":41.142857142857}],"owners":[{"colorStr":"00f","fontFamily":"Open Sans","fontSize_mm":2.2,"fontStyle":"normal","fontWeight":"bold","left_mm":5,"textDecoration":"none","top_mm":35.142857142857}],"phones":[{"colorStr":"000","fontFamily":"Open Sans","fontSize_mm":1.2,"fontStyle":"normal","fontWeight":"normal","left_mm":51.428571428571,"textDecoration":"none","top_mm":37}],"positions":[{"colorStr":"000","fontFamily":"Open Sans","fontSize_mm":1.2,"fontStyle":"normal","fontWeight":"normal","left_mm":5,"textDecoration":"none","top_mm":38.142857142857}],"sites":[{"colorStr":"000","fontFamily":"Open Sans","fontSize_mm":1.2,"fontStyle":"normal","fontWeight":"normal","left_mm":51.428571428571,"textDecoration":"none","top_mm":43}]}', 'http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des2/preview.jpg', NULL, 1, 1),
(3, 'Design 3', 1, 'des3', '', NULL, '{"addresses":["New York, NY, USA"],"emails":["marvelsubs@midtowncomics.com"],"logos":["http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des3/logo_0."],"organisations":["Marvel Entertainment LLC"],"owners":["James Howlett"],"phones":["+(1212)576-400-00"],"positions":["Logan"],"sites":["marvel.com"]}', '{"addresses":[{"colorStr":"FFFFCC","fontFamily":"Open Sans","fontSize_mm":2.2,"fontStyle":"normal","fontWeight":"normal","left_mm":17.285714285714,"textDecoration":"none","top_mm":51.857142857143}],"background":{"_backgroundColor":"#f5f5dc","height_mm":85,"src":"http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des3/bg.png","width_mm":55},"emails":[{"colorStr":"FFFFCC","fontFamily":"Open Sans","fontSize_mm":2,"fontStyle":"normal","fontWeight":"normal","left_mm":10.714285714286,"textDecoration":"none","top_mm":61.142857142857}],"lines":[{"_color":"FFFF00","_thickness":4,"design":"solid","isHorizontal":true,"left_mm":0,"length_mm":54.714285714286,"top_mm":30}],"logos":[{"height_mm":20.714285714286,"left_mm":5,"top_mm":5,"width_mm":45}],"organisations":[{"colorStr":"FFFFCC","fontFamily":"Open Sans","fontSize_mm":2.2,"fontStyle":"normal","fontWeight":"bold","left_mm":13.571428571429,"textDecoration":"none","top_mm":47.714285714286}],"owners":[{"colorStr":"FFFFCC","fontFamily":"Open Sans","fontSize_mm":3.2,"fontStyle":"normal","fontWeight":"bold","left_mm":16,"textDecoration":"none","top_mm":36.142857142857}],"phones":[{"colorStr":"FFFFCC","fontFamily":"Open Sans","fontSize_mm":2.2,"fontStyle":"normal","fontWeight":"normal","left_mm":17.285714285714,"textDecoration":"none","top_mm":56.714285714286}],"positions":[{"colorStr":"FFFFCC","fontFamily":"Open Sans","fontSize_mm":2.2,"fontStyle":"normal","fontWeight":"normal","left_mm":23.571428571429,"textDecoration":"none","top_mm":43.142857142857}],"sites":[{"colorStr":"FFFFCC","fontFamily":"Open Sans","fontSize_mm":2.2,"fontStyle":"normal","fontWeight":"normal","left_mm":20.714285714286,"textDecoration":"none","top_mm":65.857142857143}]}', 'http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des3/preview.jpg', NULL, 1, 2),
(10, '', 0, '8e049c81dc5ee459eb6a14856191c4cc', '', 1, '{"owners":["James Howlett"],"positions":["Logan"],"organisations":["Marvel Entertainment LLC"],"addresses":["New York, NY, USA"],"phones":["+(1212)576-400-00"],"emails":["marvelsubs@midtowncomics.com"],"sites":["marvel.com"],"logos":["http:\\/\\/localhost\\/wordpress\\/wp-content\\/plugins\\/business-card-creator\\/img\\/1\\/8e049c81dc5ee459eb6a14856191c4cc\\/logo_0.png"]}', '{"owners":[{"fontFamily":"Open Sans","fontSize_mm":2.2,"fontWeight":"bold","fontStyle":"normal","textDecoration":"none","colorStr":"00f","left_mm":5,"top_mm":35.142857142857}],"positions":[{"fontFamily":"Open Sans","fontSize_mm":1.2,"fontWeight":"normal","fontStyle":"normal","textDecoration":"none","colorStr":"000","left_mm":5,"top_mm":38.142857142857}],"organisations":[{"fontFamily":"Open Sans","fontSize_mm":1.2,"fontWeight":"bold","fontStyle":"normal","textDecoration":"none","colorStr":"000","left_mm":5,"top_mm":41.142857142857}],"addresses":[{"fontFamily":"Open Sans","fontSize_mm":1.2,"fontWeight":"normal","fontStyle":"normal","textDecoration":"none","colorStr":"000","left_mm":51.428571428571,"top_mm":34}],"phones":[{"fontFamily":"Open Sans","fontSize_mm":1.2,"fontWeight":"normal","fontStyle":"normal","textDecoration":"none","colorStr":"000","left_mm":51.428571428571,"top_mm":37}],"emails":[{"fontFamily":"Open Sans","fontSize_mm":1.2,"fontWeight":"normal","fontStyle":"normal","textDecoration":"none","colorStr":"000","left_mm":51.428571428571,"top_mm":40}],"sites":[{"fontFamily":"Open Sans","fontSize_mm":1.2,"fontWeight":"normal","fontStyle":"normal","textDecoration":"none","colorStr":"000","left_mm":51.428571428571,"top_mm":43}],"logos":[{"width_mm":42,"height_mm":44,"left_mm":16.857142857143,"top_mm":5}],"lines":[{"left_mm":0,"top_mm":30,"length_mm":84.714285714286,"_thickness":1,"isHorizontal":true,"design":"solid","_color":"00f"}],"background":{"_backgroundColor":"#f5f5dc","src":"http:\\/\\/localhost\\/wordpress\\/wp-content\\/plugins\\/business-card-creator\\/img\\/1\\/8e049c81dc5ee459eb6a14856191c4cc\\/bg","width_mm":85,"height_mm":55}}', 'http://localhost/wordpress/wp-content/plugins/business-card-creator/img/1/8e049c81dc5ee459eb6a14856191c4cc/preview.jpg', NULL, 1, 100);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `wp_businesscardcreator_design`
--
ALTER TABLE `wp_businesscardcreator_design`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `wp_businesscardcreator_design`
--
ALTER TABLE `wp_businesscardcreator_design`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

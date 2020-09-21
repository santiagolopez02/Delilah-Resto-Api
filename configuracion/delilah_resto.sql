-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2020 a las 22:34:21
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah/resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `id` int(11) NOT NULL,
  `metodoPago` enum('EFECTIVO','TARJETA') NOT NULL,
  `total` float NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orden`
--

INSERT INTO `orden` (`id`, `metodoPago`, `total`, `userId`) VALUES
(11, 'EFECTIVO', 0, 2),
(12, 'EFECTIVO', 0, 2),
(13, 'EFECTIVO', 0, 2),
(14, 'EFECTIVO', 0, 2),
(15, 'EFECTIVO', 0, 2),
(16, 'EFECTIVO', 0, 2),
(17, 'EFECTIVO', 748, 2),
(18, 'EFECTIVO', 1320, 1),
(19, 'EFECTIVO', 5024, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `categoria` enum('Comida','Bebida','Postre') NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `categoria`, `precio`) VALUES
(1, 'Hamburguesa', 'Comida', 124),
(3, 'peras', 'Postre', 400),
(4, 'banana', 'Comida', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productoorden`
--

CREATE TABLE `productoorden` (
  `id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` float NOT NULL,
  `ordenId` int(11) DEFAULT NULL,
  `productoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productoorden`
--

INSERT INTO `productoorden` (`id`, `cantidad`, `subtotal`, `ordenId`, `productoId`) VALUES
(1, 0, 0, NULL, NULL),
(2, 0, 0, NULL, NULL),
(3, 0, 0, NULL, NULL),
(4, 0, 0, NULL, NULL),
(5, 0, 0, NULL, NULL),
(6, 0, 0, NULL, NULL),
(7, 2, 0, NULL, NULL),
(8, 1, 0, NULL, NULL),
(9, 1, 0, NULL, NULL),
(10, 2, 0, NULL, NULL),
(11, 1, 0, NULL, NULL),
(12, 1, 0, NULL, NULL),
(13, 2, 0, NULL, NULL),
(14, 1, 0, NULL, NULL),
(15, 1, 0, NULL, NULL),
(16, 2, 248, NULL, NULL),
(17, 1, 400, NULL, NULL),
(18, 1, 100, NULL, NULL),
(19, 2, 248, NULL, NULL),
(20, 1, 400, NULL, NULL),
(21, 1, 100, NULL, NULL),
(22, 2, 248, NULL, NULL),
(23, 1, 400, NULL, NULL),
(24, 1, 100, NULL, NULL),
(25, 2, 248, NULL, NULL),
(26, 1, 400, NULL, NULL),
(27, 1, 100, NULL, NULL),
(28, 2, 248, NULL, NULL),
(29, 1, 400, NULL, NULL),
(30, 1, 100, NULL, NULL),
(31, 5, 620, NULL, NULL),
(32, 1, 400, NULL, NULL),
(33, 3, 300, NULL, NULL),
(34, 1, 124, NULL, NULL),
(35, 11, 4400, NULL, NULL),
(36, 5, 500, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `contraseña` text NOT NULL,
  `direccion` text NOT NULL,
  `email` text NOT NULL,
  `telefono` text NOT NULL,
  `isAdm` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `contraseña`, `direccion`, `email`, `telefono`, `isAdm`) VALUES
(1, 'santiago', 'asd123', 'tesd23123', 'sasd123@gmail.com', '+asd2eqw232', 0),
(2, 'santiago lopez', 'asd124124124', '5135156fafasf', 'sasd123@41241asd.com', '+asd2eqw232', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `productoorden`
--
ALTER TABLE `productoorden`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `productoorden_productoId_ordenId_unique` (`ordenId`,`productoId`),
  ADD KEY `productoId` (`productoId`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productoorden`
--
ALTER TABLE `productoorden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `usuario` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `productoorden`
--
ALTER TABLE `productoorden`
  ADD CONSTRAINT `productoorden_ibfk_1` FOREIGN KEY (`ordenId`) REFERENCES `orden` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productoorden_ibfk_2` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

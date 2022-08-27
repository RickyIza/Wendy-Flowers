-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-08-2022 a las 02:03:26
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `post`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `usuario` text COLLATE utf8_spanish_ci NOT NULL,
  `password` text COLLATE utf8_spanish_ci NOT NULL,
  `perfil` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `foto` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado` int(11) DEFAULT 1,
  `ultimo_login` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `usuario`, `password`, `perfil`, `foto`, `estado`, `ultimo_login`, `fecha`) VALUES
(1, 'usuario administrador', 'admin', 'admin123', 'administrador', '', 1, '2022-08-12 18:27:04', '2022-08-12 16:27:57'),
(2, 'Ricky', 'raiza1', 'raiza1', 'Administrador', NULL, 1, '2022-08-26 16:37:49', '2022-08-26 21:37:49'),
(3, 'ricky', 'admain', '12313', '', NULL, NULL, '2022-08-26 16:38:02', '2022-08-26 21:38:02'),
(4, 'Alex', 'alexva', 'alex', 'Administrador', NULL, NULL, '2022-08-26 16:38:20', '2022-08-26 21:38:20'),
(5, 'Daysi Obando', 'daps12', '1231', 'Administrador', NULL, 1, '2022-08-26 16:42:02', '2022-08-26 21:42:02'),
(6, 'Ricky', 'raiza123', 'njr10', 'Vendedor', 'vistas/img/usuarios/raiza123/931.jpg', 1, '2022-08-26 17:47:57', '2022-08-26 22:47:57'),
(7, 'asa', '123sa', '12312', 'Administrador', 'vistas/img/usuarios/123sa/637.jpg', 1, '2022-08-26 17:49:56', '2022-08-26 22:49:56'),
(8, 'alex', '12313', '12313', 'Administrador', 'vistas/img/usuarios/12313/100.png', 1, '2022-08-26 18:39:47', '2022-08-26 23:39:47');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

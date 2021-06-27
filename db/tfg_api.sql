-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2021 a las 20:47:49
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg_api`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergenos`
--

CREATE TABLE `alergenos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nomAlergeno` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `alergenos`
--

INSERT INTO `alergenos` (`id`, `nomAlergeno`, `img`) VALUES
(1, 'Gluten', '../../../../img/alergenos/gluten.png'),
(2, 'Crustáceos', '../../../../img/alergenos/crustaceans.png'),
(3, 'Huevos', '../../../../img/alergenos/egg.png'),
(4, 'Pescado', '../../../../img/alergenos/fish.png'),
(5, 'Cacahuetes', '../../../../img/alergenos/peanuts.png'),
(6, 'Soja', '../../../../img/alergenos/soybean.png'),
(7, 'Lácteos', '../../../../img/alergenos/milk.png'),
(8, 'Frutos de cáscara', '../../../../img/alergenos/almond.png'),
(9, 'Apio', '../../../../img/alergenos/celery.png'),
(10, 'Mostaza', '../../../../img/alergenos/mustard.png'),
(11, 'Granos de sesamo', '../../../../img/alergenos/sesame.png'),
(12, 'Dióxido de azufre y sulfitos', '../../../../img/alergenos/sulfide.png'),
(13, 'Moluscos', '../../../../img/alergenos/mollusc.png'),
(14, 'Altramuces', '../../../../img/alergenos/lupin.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergeno_plato`
--

CREATE TABLE `alergeno_plato` (
  `alergeno_id` bigint(20) UNSIGNED NOT NULL,
  `plato_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombreCompleto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dia` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `horarioAperturaP1` time DEFAULT NULL,
  `horarioCierreP1` time DEFAULT NULL,
  `horarioAperturaP2` time DEFAULT NULL,
  `horarioCierreP2` time DEFAULT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(15, '2014_10_12_000000_create_users_table', 1),
(16, '2014_10_12_100000_create_password_resets_table', 1),
(17, '2019_08_19_000000_create_failed_jobs_table', 1),
(18, '2021_05_22_111357_create_restaurants_table', 1),
(19, '2021_05_22_114724_create_clients_table', 1),
(20, '2021_05_31_094738_create_tables_table', 1),
(21, '2021_06_02_105717_create_tipos_cocinas_table', 1),
(22, '2021_06_02_173747_restaurant_tipos_cocina', 1),
(23, '2021_06_03_150534_create_horarios_table', 1),
(24, '2021_06_07_102212_create_platos_table', 1),
(25, '2021_06_07_103400_create_alergenos_table', 1),
(26, '2021_06_07_105854_alergeno_plato', 1),
(27, '2021_06_08_204139_create_opinions_table', 1),
(28, '2021_06_10_115633_create_reservas_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinions`
--

CREATE TABLE `opinions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nota` int(11) NOT NULL DEFAULT 0,
  `comentario` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_plato` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vegano` char(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` double(5,2) NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `table_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `diaReserva` date NOT NULL,
  `horaReserva` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `numTelefono` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccionPostal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitud` double(10,7) DEFAULT NULL,
  `longitud` double(10,7) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurant_tipos_cocina`
--

CREATE TABLE `restaurant_tipos_cocina` (
  `tipos_cocina_id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tables`
--

CREATE TABLE `tables` (
  `idMesa` bigint(20) UNSIGNED NOT NULL,
  `numMesa` int(10) UNSIGNED NOT NULL,
  `numOcupantes` int(10) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_cocinas`
--

CREATE TABLE `tipos_cocinas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tipoCocina` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipos_cocinas`
--

INSERT INTO `tipos_cocinas` (`id`, `tipoCocina`) VALUES
(1, 'Árabe'),
(2, 'Afgana'),
(3, 'Africana'),
(4, 'Albanesa'),
(5, 'Alemana'),
(6, 'Americana'),
(7, 'Apuliana'),
(8, 'Argelina'),
(9, 'Argentina'),
(10, 'Armenia'),
(11, 'Asador'),
(12, 'Asiria'),
(13, 'Asiática'),
(14, 'Australiana'),
(15, 'Austríaca'),
(16, 'Azerbayana'),
(17, 'Bahamesa'),
(18, 'Baiti'),
(19, 'Bangladeshi'),
(20, 'Barbacoa'),
(21, 'Belga'),
(22, 'Birmana'),
(23, 'Brasileña'),
(24, 'Británica'),
(25, 'Cajún y criolla'),
(26, 'Calabresa'),
(27, 'Camboyana'),
(28, 'Caribeña'),
(29, 'Catalana'),
(30, 'Caucásica'),
(31, 'Ceilanesa'),
(32, 'Centroamericana'),
(33, 'Centroeuropea'),
(34, 'Checa'),
(35, 'Chilena'),
(36, 'China'),
(37, 'Cocina de Hokkaidó'),
(38, 'Cocina de Kioto'),
(39, 'Cocina de Kyûshû'),
(40, 'Cocina de Pekín'),
(41, 'Colombiana'),
(42, 'Comida rápida'),
(43, 'Confitería japonesa'),
(44, 'Contemporánea'),
(45, 'Coreana'),
(46, 'Costarricense'),
(47, 'Croata'),
(48, 'Cubana'),
(49, 'Danesa'),
(50, 'De Asia central'),
(51, 'De Campania'),
(52, 'De Europa oriental'),
(53, 'De Oriente Medio'),
(54, 'Del Lacio'),
(55, 'Del centro de Italia'),
(56, 'Del sur de Italia'),
(57, 'Del norte de Italia'),
(58, 'Ecuatoriana'),
(59, 'Egipcia'),
(60, 'Emiliana'),
(61, 'Escandinava'),
(62, 'Escocesa'),
(63, 'Eslovena'),
(64, 'Española'),
(65, 'Etiope'),
(66, 'Europea'),
(67, 'Filipina'),
(68, 'Francesa'),
(69, 'Fujian'),
(70, 'Fusión'),
(71, 'Fusión japonesa'),
(72, 'Galesa'),
(73, 'Georgiana'),
(74, 'Griega'),
(75, 'Guatemalteca'),
(76, 'Hawaiana'),
(77, 'Holandesa'),
(78, 'Húngara'),
(79, 'India americana'),
(80, 'Indonesia'),
(81, 'Internacional'),
(82, 'Irlandesa'),
(83, 'Israelí'),
(84, 'Italiana'),
(85, 'Jamaicana'),
(86, 'Kaiseki'),
(87, 'Kappo'),
(88, 'Latina'),
(89, 'Latviana'),
(90, 'Libanesa'),
(91, 'Liguriana'),
(92, 'Lombarda'),
(93, 'Malaya'),
(94, 'Marisco'),
(95, 'Marroquí'),
(96, 'Mediterránea'),
(97, 'Mexicana'),
(98, 'Mongola'),
(99, 'Napolitana'),
(100, 'Neozelandesa'),
(101, 'Nepalí'),
(102, 'Nigeriana'),
(103, 'Noruega'),
(104, 'Pakístani'),
(105, 'Persa'),
(106, 'Peruana'),
(107, 'Pizza'),
(108, 'Polaca'),
(109, 'Polinesia'),
(110, 'Portugesa'),
(111, 'Puertorriqueña'),
(112, 'Romana'),
(113, 'Romaña'),
(114, 'Rumana'),
(115, 'Rusa'),
(116, 'Saludable'),
(117, 'Salvadoreña'),
(118, 'Sarda'),
(119, 'Shojin'),
(120, 'Siciliana'),
(121, 'Singarupeña'),
(122, 'Sopas'),
(123, 'Street food / Comida en la calle'),
(124, 'Sudamericana'),
(125, 'Sueca'),
(126, 'Suiza'),
(127, 'Suroeste'),
(128, 'Sushi'),
(129, 'Taliandesa'),
(130, 'Taiwanesa'),
(131, 'Tibetana'),
(132, 'Toscana'),
(133, 'Tunecina'),
(134, 'Turca'),
(135, 'Ucraniana'),
(136, 'Uzbeka'),
(137, 'Venezolana'),
(138, 'Vietnamita'),
(139, 'Xinjiang'),
(140, 'Yunnan');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userable_id` int(11) NOT NULL,
  `userable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imgPath` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alergenos`
--
ALTER TABLE `alergenos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `alergeno_plato`
--
ALTER TABLE `alergeno_plato`
  ADD KEY `alergeno_plato_alergeno_id_foreign` (`alergeno_id`),
  ADD KEY `alergeno_plato_plato_id_foreign` (`plato_id`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `horarios_restaurant_id_foreign` (`restaurant_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `opinions`
--
ALTER TABLE `opinions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `opinions_client_id_foreign` (`client_id`),
  ADD KEY `opinions_restaurant_id_foreign` (`restaurant_id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `platos_restaurant_id_foreign` (`restaurant_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservas_restaurant_id_foreign` (`restaurant_id`),
  ADD KEY `reservas_table_id_foreign` (`table_id`);

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `restaurants_direccionpostal_unique` (`direccionPostal`);

--
-- Indices de la tabla `restaurant_tipos_cocina`
--
ALTER TABLE `restaurant_tipos_cocina`
  ADD KEY `restaurant_tipos_cocina_tipos_cocina_id_foreign` (`tipos_cocina_id`),
  ADD KEY `restaurant_tipos_cocina_restaurant_id_foreign` (`restaurant_id`);

--
-- Indices de la tabla `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`idMesa`),
  ADD KEY `tables_restaurant_id_foreign` (`restaurant_id`);

--
-- Indices de la tabla `tipos_cocinas`
--
ALTER TABLE `tipos_cocinas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_name_unique` (`name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alergenos`
--
ALTER TABLE `alergenos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `opinions`
--
ALTER TABLE `opinions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tables`
--
ALTER TABLE `tables`
  MODIFY `idMesa` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_cocinas`
--
ALTER TABLE `tipos_cocinas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alergeno_plato`
--
ALTER TABLE `alergeno_plato`
  ADD CONSTRAINT `alergeno_plato_alergeno_id_foreign` FOREIGN KEY (`alergeno_id`) REFERENCES `alergenos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alergeno_plato_plato_id_foreign` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `horarios_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opinions`
--
ALTER TABLE `opinions`
  ADD CONSTRAINT `opinions_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `opinions_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `platos`
--
ALTER TABLE `platos`
  ADD CONSTRAINT `platos_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_table_id_foreign` FOREIGN KEY (`table_id`) REFERENCES `tables` (`idMesa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `restaurant_tipos_cocina`
--
ALTER TABLE `restaurant_tipos_cocina`
  ADD CONSTRAINT `restaurant_tipos_cocina_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_tipos_cocina_tipos_cocina_id_foreign` FOREIGN KEY (`tipos_cocina_id`) REFERENCES `tipos_cocinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

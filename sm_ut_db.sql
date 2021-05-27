-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 27 nov. 2020 à 08:40
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sm_ut_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `bon_reception`
--

DROP TABLE IF EXISTS `bon_reception`;
CREATE TABLE IF NOT EXISTS `bon_reception` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `user_email` varchar(45) NOT NULL COMMENT 'mail de l''utilisateur ayant opéré l''action',
  `nom` varchar(145) NOT NULL,
  `numero` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bon_reception`
--

INSERT INTO `bon_reception` (`id`, `date`, `user_email`, `nom`, `numero`) VALUES
(1, '2020-09-15', 'bamboguirassy', 'Bon de réception - 5F5BA32622BA5', '5F5BA32622BA5'),
(2, '2020-09-08', 'bamboguirassy', 'Bon de réception - 5F5BA3361D357', '5F5BA3361D357'),
(3, '2020-09-25', 'bamboguirassy', 'Bon de réception - 5F5BA33DA1FAA', '5F5BA33DA1FAA'),
(4, '2020-09-12', 'bamboguirassy', 'Bon de réception - 5F5CB287482C6', '5F5CB287482C6');

-- --------------------------------------------------------

--
-- Structure de la table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
CREATE TABLE IF NOT EXISTS `consultation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dossier` int(11) DEFAULT NULL,
  `pathologie_diagnostiquee` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `docteur` int(11) DEFAULT NULL,
  `user_email` varchar(45) NOT NULL COMMENT 'mail de l''utilisateur ayant opéré l''action',
  PRIMARY KEY (`id`),
  KEY `fk_consultation_dossier_idx` (`dossier`),
  KEY `fk_consultation_pathologie1_idx` (`pathologie_diagnostiquee`),
  KEY `fk_consultation_docteur1_idx` (`docteur`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `consultation`
--

INSERT INTO `consultation` (`id`, `dossier`, `pathologie_diagnostiquee`, `date`, `docteur`, `user_email`) VALUES
(1, 1, 13, '2020-01-01', 4, 'bamboguirassy'),
(2, 1, 12, '2020-05-21', 1, 'bamboguirassy'),
(3, 1, 7, '2020-08-12', 3, 'bamboguirassy'),
(4, 1, 4, '2020-10-01', 1, 'bamboguirassy'),
(5, 2, 14, '2020-06-17', 4, 'bamboguirassy'),
(6, 2, 9, '2020-09-22', 1, 'bamboguirassy'),
(7, 3, 11, '2020-04-14', 1, 'bamboguirassy'),
(8, 3, 5, '2020-10-01', 3, 'bamboguirassy'),
(9, 4, 2, '2020-09-24', 4, 'bamboguirassy'),
(10, 4, 1, '2020-10-01', 4, 'bamboguirassy'),
(11, 5, 8, '2020-05-20', 1, 'bamboguirassy'),
(12, 5, 4, '2020-08-11', 4, 'bamboguirassy'),
(13, 1, 1, '2020-10-02', 4, 'bamboguirassy');

-- --------------------------------------------------------

--
-- Structure de la table `docteur`
--

DROP TABLE IF EXISTS `docteur`;
CREATE TABLE IF NOT EXISTS `docteur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prenoms` varchar(45) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `specialite` varchar(145) DEFAULT NULL,
  `filename` varchar(145) DEFAULT NULL,
  `filepath` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `docteur`
--

INSERT INTO `docteur` (`id`, `prenoms`, `nom`, `specialite`, `filename`, `filepath`) VALUES
(1, 'Docteur Moussa', 'Fofana', 'Mixin', '5f5b752f2c97e.jpeg', 'http://127.0.0.1:8000/uploads/docteur/photo/5f5b752f2c97e.jpeg'),
(3, 'Docteur Bambo', 'Guirassy', 'Cardialogie', '5f5b764d38542.jpeg', 'http://127.0.0.1:8000/uploads/docteur/photo/5f5b764d38542.jpeg'),
(4, 'Dr', 'DHIEDIOU', 'Généraliste', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `dossier`
--

DROP TABLE IF EXISTS `dossier`;
CREATE TABLE IF NOT EXISTS `dossier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(45) NOT NULL,
  `prenoms` varchar(45) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `date_naissance` date NOT NULL,
  `cni` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `type_patient` varchar(45) NOT NULL COMMENT 'per, pats, famille',
  `lien_parente` varchar(45) DEFAULT NULL COMMENT 'definir si type_patient = famille\nepoux ou enfant',
  `matricule` varchar(45) NOT NULL,
  `prenom_travailleur` varchar(45) DEFAULT NULL,
  `nom_travailleur` varchar(45) DEFAULT NULL,
  `genre` varchar(45) NOT NULL COMMENT 'homme ou femme',
  `date_creation` date NOT NULL,
  `user_email` varchar(45) NOT NULL COMMENT 'mail de l''utilisateur ayant opéré l''action',
  `etat` tinyint(1) NOT NULL,
  `structure` varchar(145) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `dossier`
--

INSERT INTO `dossier` (`id`, `numero`, `prenoms`, `nom`, `date_naissance`, `cni`, `telephone`, `type_patient`, `lien_parente`, `matricule`, `prenom_travailleur`, `nom_travailleur`, `genre`, `date_creation`, `user_email`, `etat`, `structure`) VALUES
(1, '5F75B28C220B8', 'Professeur Mouhmadou', 'THIAM', '1963-10-16', NULL, '772859658', 'PER', NULL, '110285/J', NULL, NULL, 'Homme', '2020-10-01', 'bamboguirassy', 1, 'UFR SET'),
(2, '5F75B2C57B636', 'Monsieur Moussa', 'FOFANA', '1991-10-01', '1916200200225', '+221780165026', 'PATS', NULL, '120254/B', NULL, NULL, 'Homme', '2020-10-01', 'bamboguirassy', 1, 'RECTORAT'),
(3, '5F75B34661BCA', 'Madame Aminata', 'SAMB', '1991-12-27', NULL, '773509313', 'FAMILLE', 'épouse', '120254/B', 'Moussa', 'FOFANA', 'Femme', '2020-10-01', 'bamboguirassy', 1, 'RECTORAT'),
(4, '5F75B3AA52854', 'Hawa', 'FOFANA', '2019-10-01', NULL, '773509313', 'FAMILLE', 'fille', '120254/B', 'Moussa FOFANA', 'PATS', 'Femme', '2020-10-01', 'bamboguirassy', 1, 'RECTORAT'),
(5, '5F75B47064770', 'El Hadji Ahmadou', 'GUEYE', '1995-05-04', NULL, '779856851', 'ETUDIANT', NULL, '16030106465', NULL, NULL, 'Homme', '2020-10-01', 'bamboguirassy', 1, 'UFR SET');

-- --------------------------------------------------------

--
-- Structure de la table `fos_group`
--

DROP TABLE IF EXISTS `fos_group`;
CREATE TABLE IF NOT EXISTS `fos_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `code` varchar(145) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4B019DDB5E237E06` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `fos_group`
--

INSERT INTO `fos_group` (`id`, `name`, `roles`, `code`) VALUES
(1, 'Super Admin', 'a:90:{i:0;s:17:\"ROLE_GROUP_CREATE\";i:1;s:16:\"ROLE_GROUP_INDEX\";i:2;s:15:\"ROLE_GROUP_SHOW\";i:3;s:16:\"ROLE_GROUP_CLONE\";i:4;s:17:\"ROLE_GROUP_DELETE\";i:5;s:15:\"ROLE_GROUP_EDIT\";i:6;s:16:\"ROLE_USER_CREATE\";i:7;s:15:\"ROLE_USER_INDEX\";i:8;s:14:\"ROLE_USER_SHOW\";i:9;s:15:\"ROLE_USER_CLONE\";i:10;s:16:\"ROLE_USER_DELETE\";i:11;s:14:\"ROLE_USER_EDIT\";i:12;s:19:\"ROLE_DOCTEUR_CREATE\";i:13;s:18:\"ROLE_DOCTEUR_INDEX\";i:14;s:17:\"ROLE_DOCTEUR_SHOW\";i:15;s:18:\"ROLE_DOCTEUR_CLONE\";i:16;s:19:\"ROLE_DOCTEUR_DELETE\";i:17;s:17:\"ROLE_DOCTEUR_EDIT\";i:18;s:22:\"ROLE_PATHOLOGIE_CREATE\";i:19;s:21:\"ROLE_PATHOLOGIE_INDEX\";i:20;s:20:\"ROLE_PATHOLOGIE_SHOW\";i:21;s:21:\"ROLE_PATHOLOGIE_CLONE\";i:22;s:22:\"ROLE_PATHOLOGIE_DELETE\";i:23;s:20:\"ROLE_PATHOLOGIE_EDIT\";i:24;s:31:\"ROLE_STRUCTUREPARTENAIRE_CREATE\";i:25;s:30:\"ROLE_STRUCTUREPARTENAIRE_INDEX\";i:26;s:29:\"ROLE_STRUCTUREPARTENAIRE_SHOW\";i:27;s:30:\"ROLE_STRUCTUREPARTENAIRE_CLONE\";i:28;s:31:\"ROLE_STRUCTUREPARTENAIRE_DELETE\";i:29;s:29:\"ROLE_STRUCTUREPARTENAIRE_EDIT\";i:30;s:19:\"ROLE_DOSSIER_CREATE\";i:31;s:18:\"ROLE_DOSSIER_INDEX\";i:32;s:17:\"ROLE_DOSSIER_SHOW\";i:33;s:18:\"ROLE_DOSSIER_CLONE\";i:34;s:19:\"ROLE_DOSSIER_DELETE\";i:35;s:17:\"ROLE_DOSSIER_EDIT\";i:36;s:24:\"ROLE_CONSULTATION_CREATE\";i:37;s:23:\"ROLE_CONSULTATION_INDEX\";i:38;s:22:\"ROLE_CONSULTATION_SHOW\";i:39;s:23:\"ROLE_CONSULTATION_CLONE\";i:40;s:24:\"ROLE_CONSULTATION_DELETE\";i:41;s:22:\"ROLE_CONSULTATION_EDIT\";i:42;s:22:\"ROLE_INPUTATION_CREATE\";i:43;s:21:\"ROLE_INPUTATION_INDEX\";i:44;s:20:\"ROLE_INPUTATION_SHOW\";i:45;s:21:\"ROLE_INPUTATION_CLONE\";i:46;s:22:\"ROLE_INPUTATION_DELETE\";i:47;s:20:\"ROLE_INPUTATION_EDIT\";i:48;s:22:\"ROLE_RENDEZVOUS_CREATE\";i:49;s:21:\"ROLE_RENDEZVOUS_INDEX\";i:50;s:20:\"ROLE_RENDEZVOUS_SHOW\";i:51;s:21:\"ROLE_RENDEZVOUS_CLONE\";i:52;s:22:\"ROLE_RENDEZVOUS_DELETE\";i:53;s:20:\"ROLE_RENDEZVOUS_EDIT\";i:54;s:24:\"ROLE_REPOSMEDICAL_CREATE\";i:55;s:23:\"ROLE_REPOSMEDICAL_INDEX\";i:56;s:22:\"ROLE_REPOSMEDICAL_SHOW\";i:57;s:23:\"ROLE_REPOSMEDICAL_CLONE\";i:58;s:24:\"ROLE_REPOSMEDICAL_DELETE\";i:59;s:22:\"ROLE_REPOSMEDICAL_EDIT\";i:60;s:20:\"ROLE_SYMPTOME_CREATE\";i:61;s:19:\"ROLE_SYMPTOME_INDEX\";i:62;s:18:\"ROLE_SYMPTOME_SHOW\";i:63;s:19:\"ROLE_SYMPTOME_CLONE\";i:64;s:20:\"ROLE_SYMPTOME_DELETE\";i:65;s:18:\"ROLE_SYMPTOME_EDIT\";i:66;s:27:\"ROLE_MEDICAMENTREMIS_CREATE\";i:67;s:26:\"ROLE_MEDICAMENTREMIS_INDEX\";i:68;s:25:\"ROLE_MEDICAMENTREMIS_SHOW\";i:69;s:26:\"ROLE_MEDICAMENTREMIS_CLONE\";i:70;s:27:\"ROLE_MEDICAMENTREMIS_DELETE\";i:71;s:25:\"ROLE_MEDICAMENTREMIS_EDIT\";i:72;s:24:\"ROLE_BONRECEPTION_CREATE\";i:73;s:23:\"ROLE_BONRECEPTION_INDEX\";i:74;s:22:\"ROLE_BONRECEPTION_SHOW\";i:75;s:23:\"ROLE_BONRECEPTION_CLONE\";i:76;s:24:\"ROLE_BONRECEPTION_DELETE\";i:77;s:22:\"ROLE_BONRECEPTION_EDIT\";i:78;s:22:\"ROLE_MEDICAMENT_CREATE\";i:79;s:21:\"ROLE_MEDICAMENT_INDEX\";i:80;s:20:\"ROLE_MEDICAMENT_SHOW\";i:81;s:21:\"ROLE_MEDICAMENT_CLONE\";i:82;s:22:\"ROLE_MEDICAMENT_DELETE\";i:83;s:20:\"ROLE_MEDICAMENT_EDIT\";i:84;s:31:\"ROLE_MEDICAMENTRECEPTION_CREATE\";i:85;s:30:\"ROLE_MEDICAMENTRECEPTION_INDEX\";i:86;s:29:\"ROLE_MEDICAMENTRECEPTION_SHOW\";i:87;s:30:\"ROLE_MEDICAMENTRECEPTION_CLONE\";i:88;s:31:\"ROLE_MEDICAMENTRECEPTION_DELETE\";i:89;s:29:\"ROLE_MEDICAMENTRECEPTION_EDIT\";}', 'SA'),
(4, 'Administrateur', 'a:12:{i:0;s:17:\"ROLE_GROUP_CREATE\";i:1;s:16:\"ROLE_GROUP_INDEX\";i:2;s:15:\"ROLE_GROUP_SHOW\";i:3;s:16:\"ROLE_GROUP_CLONE\";i:4;s:17:\"ROLE_GROUP_DELETE\";i:5;s:15:\"ROLE_GROUP_EDIT\";i:6;s:16:\"ROLE_USER_CREATE\";i:7;s:15:\"ROLE_USER_INDEX\";i:8;s:14:\"ROLE_USER_SHOW\";i:9;s:15:\"ROLE_USER_CLONE\";i:10;s:16:\"ROLE_USER_DELETE\";i:11;s:14:\"ROLE_USER_EDIT\";}', 'ADMIN'),
(5, 'Assistante', 'a:8:{i:0;s:16:\"ROLE_GROUP_INDEX\";i:1;s:15:\"ROLE_GROUP_SHOW\";i:2;s:16:\"ROLE_GROUP_CLONE\";i:3;s:16:\"ROLE_USER_CREATE\";i:4;s:15:\"ROLE_USER_INDEX\";i:5;s:14:\"ROLE_USER_SHOW\";i:6;s:15:\"ROLE_USER_CLONE\";i:7;s:14:\"ROLE_USER_EDIT\";}', 'ASSIST'),
(7, 'Patient', 'a:12:{i:0;s:17:\"ROLE_GROUP_CREATE\";i:1;s:16:\"ROLE_GROUP_INDEX\";i:2;s:15:\"ROLE_GROUP_SHOW\";i:3;s:16:\"ROLE_GROUP_CLONE\";i:4;s:17:\"ROLE_GROUP_DELETE\";i:5;s:15:\"ROLE_GROUP_EDIT\";i:6;s:16:\"ROLE_USER_CREATE\";i:7;s:15:\"ROLE_USER_INDEX\";i:8;s:14:\"ROLE_USER_SHOW\";i:9;s:15:\"ROLE_USER_CLONE\";i:10;s:16:\"ROLE_USER_DELETE\";i:11;s:14:\"ROLE_USER_EDIT\";}', 'PATIENT'),
(8, 'Docteur', 'a:12:{i:0;s:17:\"ROLE_GROUP_CREATE\";i:1;s:16:\"ROLE_GROUP_INDEX\";i:2;s:15:\"ROLE_GROUP_SHOW\";i:3;s:16:\"ROLE_GROUP_CLONE\";i:4;s:17:\"ROLE_GROUP_DELETE\";i:5;s:15:\"ROLE_GROUP_EDIT\";i:6;s:16:\"ROLE_USER_CREATE\";i:7;s:15:\"ROLE_USER_INDEX\";i:8;s:14:\"ROLE_USER_SHOW\";i:9;s:15:\"ROLE_USER_CLONE\";i:10;s:16:\"ROLE_USER_DELETE\";i:11;s:14:\"ROLE_USER_EDIT\";}', 'DOCTEUR'),
(17, 'Patient0', 'a:12:{i:0;s:17:\"ROLE_GROUP_CREATE\";i:1;s:16:\"ROLE_GROUP_INDEX\";i:2;s:15:\"ROLE_GROUP_SHOW\";i:3;s:16:\"ROLE_GROUP_CLONE\";i:4;s:17:\"ROLE_GROUP_DELETE\";i:5;s:15:\"ROLE_GROUP_EDIT\";i:6;s:16:\"ROLE_USER_CREATE\";i:7;s:15:\"ROLE_USER_INDEX\";i:8;s:14:\"ROLE_USER_SHOW\";i:9;s:15:\"ROLE_USER_CLONE\";i:10;s:16:\"ROLE_USER_DELETE\";i:11;s:14:\"ROLE_USER_EDIT\";}', 'PATIENT0');

-- --------------------------------------------------------

--
-- Structure de la table `fos_user`
--

DROP TABLE IF EXISTS `fos_user`;
CREATE TABLE IF NOT EXISTS `fos_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username_canonical` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_canonical` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `salt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `confirmation_token` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_requested_at` datetime DEFAULT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `prenom` varchar(145) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(145) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(145) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(145) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_name` varchar(145) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fonction` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_957A647992FC23A8` (`username_canonical`),
  UNIQUE KEY `UNIQ_957A6479A0D96FBF` (`email_canonical`),
  UNIQUE KEY `UNIQ_957A6479C05FB297` (`confirmation_token`)
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `fos_user`
--

INSERT INTO `fos_user` (`id`, `username`, `username_canonical`, `email`, `email_canonical`, `enabled`, `salt`, `password`, `last_login`, `confirmation_token`, `password_requested_at`, `roles`, `prenom`, `nom`, `telephone`, `source`, `path_image`, `file_name`, `fonction`) VALUES
(1, 'bamboguirassy', 'bamboguirassy', 'didegassama@gmail.com', 'didegassama@gmail.com', 1, 'T9kVKHjmHQPyPVoHd4fTQ9FB/NbS7AYqS8cru7RMs9s', '$2y$13$nNQoWq1fW9J/Hl9Z.ZCIz.oh9HeFzPAQnem4b15bihcvAA5.WRdk2', '2020-10-09 09:15:53', NULL, NULL, 'a:0:{}', 'Bambo', 'Guirassy', '+221780165026', 'sm', 'http://127.0.0.1:8000/uploads/user/profil/5f5ace2f88366.jpeg', '5f5ace2f88366.jpeg', 'Super Administrateur'),
(3, 'charles.tessier@georges.org', 'charles.tessier@georges.org', 'charles.tessier@georges.org', 'charles.tessier@georges.org', 0, NULL, 'uguqpLfnIHx', NULL, NULL, NULL, 'a:0:{}', 'Michelle', 'Jeanne Grondin', NULL, 'sm', NULL, NULL, NULL),
(4, 'nathalie.charpentier@laposte.net', 'nathalie.charpentier@laposte.net', 'nathalie.charpentier@laposte.net', 'nathalie.charpentier@laposte.net', 0, NULL, 'FE596QG->qwJ', NULL, NULL, NULL, 'a:0:{}', 'Isaac', 'Nath-Sophie Merle', NULL, 'sm', NULL, NULL, NULL),
(5, 'vfaivre@parent.fr', 'vfaivre@parent.fr', 'vfaivre@parent.fr', 'vfaivre@parent.fr', 1, NULL, '5lBMg=A[=QeSbVcj3f', NULL, NULL, NULL, 'a:0:{}', 'Anastasie', 'Luc-Thierry Roger', NULL, 'sm', NULL, NULL, NULL),
(6, 'franck22@dijoux.fr', 'franck22@dijoux.fr', 'franck22@dijoux.fr', 'franck22@dijoux.fr', 0, NULL, 'SXUd}Uz1aEgSoSZ@v<', NULL, NULL, NULL, 'a:0:{}', 'Lucy', 'Camille Roger', NULL, 'sm', NULL, NULL, NULL),
(7, 'andre.cohen@dufour.fr', 'andre.cohen@dufour.fr', 'andre.cohen@dufour.fr', 'andre.cohen@dufour.fr', 1, NULL, '>oB-3z,7.#X4', NULL, NULL, NULL, 'a:0:{}', 'Louis', 'Aimé Le Philippe', NULL, 'sm', NULL, NULL, NULL),
(8, 'pbouchet@ifrance.com', 'pbouchet@ifrance.com', 'pbouchet@ifrance.com', 'pbouchet@ifrance.com', 1, NULL, 'g8utM(a.UG6U~', NULL, NULL, NULL, 'a:0:{}', 'Amélie', 'Sébastien du Martinez', NULL, 'sm', NULL, NULL, NULL),
(9, 'pturpin@yahoo.fr', 'pturpin@yahoo.fr', 'pturpin@yahoo.fr', 'pturpin@yahoo.fr', 1, NULL, 'FyI^sx2cWw', NULL, NULL, NULL, 'a:0:{}', 'Julien', 'Margaux Lopes', NULL, 'sm', NULL, NULL, NULL),
(10, 'theophile69@dupre.fr', 'theophile69@dupre.fr', 'theophile69@dupre.fr', 'theophile69@dupre.fr', 1, NULL, 'H#fcBg|[I3I', NULL, NULL, NULL, 'a:0:{}', 'Denis', 'Gilles Joly', NULL, 'sm', NULL, NULL, NULL),
(13, 'dominique.renard@noos.fr', 'dominique.renard@noos.fr', 'dominique.renard@noos.fr', 'dominique.renard@noos.fr', 0, NULL, 'f(>|\"Cg?[v8!.S<Hh?I1', NULL, NULL, NULL, 'a:0:{}', 'Dominique', 'Georges Renaud', NULL, 'sm', NULL, NULL, NULL),
(14, 'lucy09@ifrance.com', 'lucy09@ifrance.com', 'lucy09@ifrance.com', 'lucy09@ifrance.com', 1, NULL, 's9\'9kvmim5`+c`1$!n:V', NULL, NULL, NULL, 'a:0:{}', 'Émilie', 'Arthur Leveque-Jean', NULL, 'sm', NULL, NULL, NULL),
(15, 'clerc.manon@gmail.com', 'clerc.manon@gmail.com', 'clerc.manon@gmail.com', 'clerc.manon@gmail.com', 0, NULL, '-|~o\"h@JB@g].L&8$)I|', NULL, NULL, NULL, 'a:0:{}', 'Sophie', 'Stéphanie-Manon Navarro', NULL, 'sm', NULL, NULL, NULL),
(16, 'claude97@philippe.com', 'claude97@philippe.com', 'claude97@philippe.com', 'claude97@philippe.com', 0, NULL, 'DY|>~1u&{fg#IBJ43Er', NULL, NULL, NULL, 'a:0:{}', 'Victor', 'Zacharie Pierre', NULL, 'sm', NULL, NULL, NULL),
(17, 'nicolas.adrienne@voila.fr', 'nicolas.adrienne@voila.fr', 'nicolas.adrienne@voila.fr', 'nicolas.adrienne@voila.fr', 0, NULL, 'fTk^4,>?=VNh2GJ', NULL, NULL, NULL, 'a:0:{}', 'Nathalie', 'Joséphine Weber', NULL, 'sm', NULL, NULL, NULL),
(18, 'lefevre.victoire@ifrance.com', 'lefevre.victoire@ifrance.com', 'lefevre.victoire@ifrance.com', 'lefevre.victoire@ifrance.com', 1, NULL, '4x$!twH(K', NULL, NULL, NULL, 'a:0:{}', 'Auguste', 'Adélaïde Lefebvre', NULL, 'sm', NULL, NULL, NULL),
(19, 'ocolin@guyon.net', 'ocolin@guyon.net', 'ocolin@guyon.net', 'ocolin@guyon.net', 1, NULL, 'X6q86/Eh*dVX', NULL, NULL, NULL, 'a:0:{}', 'Patrick', 'René Aubert', NULL, 'sm', NULL, NULL, NULL),
(20, 'germain.adele@clerc.net', 'germain.adele@clerc.net', 'germain.adele@clerc.net', 'germain.adele@clerc.net', 0, NULL, '[=cfNR', NULL, NULL, NULL, 'a:0:{}', 'Édouard', 'Monique Chartier-Breton', NULL, 'sm', NULL, NULL, NULL),
(21, 'elodie17@free.fr', 'elodie17@free.fr', 'elodie17@free.fr', 'elodie17@free.fr', 0, NULL, '0tQ\"w[~m/H-m5[92ZxO', NULL, NULL, NULL, 'a:0:{}', 'Aurélie', 'Franck Carre-Jean', NULL, 'sm', NULL, NULL, NULL),
(22, 'rpetitjean@leroy.org', 'rpetitjean@leroy.org', 'rpetitjean@leroy.org', 'rpetitjean@leroy.org', 0, NULL, 'OY5.m)', NULL, NULL, NULL, 'a:0:{}', 'William', 'Françoise Delannoy', NULL, 'sm', NULL, NULL, NULL),
(23, 'coste.michele@seguin.net', 'coste.michele@seguin.net', 'coste.michele@seguin.net', 'coste.michele@seguin.net', 1, NULL, 'M1hxP\"b1{{]w', NULL, NULL, NULL, 'a:0:{}', 'Jeannine', 'Bertrand Begue', NULL, 'sm', NULL, NULL, NULL),
(24, 'thibault.gilles@gilles.org', 'thibault.gilles@gilles.org', 'thibault.gilles@gilles.org', 'thibault.gilles@gilles.org', 0, NULL, 'wH_:vx07IZ', NULL, NULL, NULL, 'a:0:{}', 'Jacqueline', 'Hélène Perret', NULL, 'sm', NULL, NULL, NULL),
(25, 'loiseau.adele@clement.net', 'loiseau.adele@clement.net', 'loiseau.adele@clement.net', 'loiseau.adele@clement.net', 1, NULL, 'msfphk91).aRe[!{[', NULL, NULL, NULL, 'a:0:{}', 'Olivier', 'Guy Hardy', NULL, 'sm', NULL, NULL, NULL),
(26, 'nmartel@wanadoo.fr', 'nmartel@wanadoo.fr', 'nmartel@wanadoo.fr', 'nmartel@wanadoo.fr', 1, NULL, 'p]X0<X[9MJ:', NULL, NULL, NULL, 'a:0:{}', 'Juliette', 'Roland Tanguy', NULL, 'sm', NULL, NULL, NULL),
(27, 'zacharie.vasseur@club-internet.fr', 'zacharie.vasseur@club-internet.fr', 'zacharie.vasseur@club-internet.fr', 'zacharie.vasseur@club-internet.fr', 0, NULL, 'd5,H(,#fGAk(9Zk\'Z?', NULL, NULL, NULL, 'a:0:{}', 'Jules', 'Françoise du Camus', NULL, 'sm', NULL, NULL, NULL),
(28, 'lucas.leon@ifrance.com', 'lucas.leon@ifrance.com', 'lucas.leon@ifrance.com', 'lucas.leon@ifrance.com', 0, NULL, 'N&Ih1@M/1Rxf', NULL, NULL, NULL, 'a:0:{}', 'Olivier', 'Dominique-Xavier Guillet', NULL, 'sm', NULL, NULL, NULL),
(29, 'raymond.peron@dbmail.com', 'raymond.peron@dbmail.com', 'raymond.peron@dbmail.com', 'raymond.peron@dbmail.com', 1, NULL, 'R{;*^0j*8q2;7d-U5/g', NULL, NULL, NULL, 'a:0:{}', 'Agathe', 'Alexandria-Caroline Martel', NULL, 'sm', NULL, NULL, NULL),
(30, 'louis.chretien@dbmail.com', 'louis.chretien@dbmail.com', 'louis.chretien@dbmail.com', 'louis.chretien@dbmail.com', 1, NULL, 'T/ykQ[g?[Z~*<XCn', NULL, NULL, NULL, 'a:0:{}', 'Noël', 'Olivie Jacob-Guillot', NULL, 'sm', NULL, NULL, NULL),
(31, 'hugues.gosselin@voisin.fr', 'hugues.gosselin@voisin.fr', 'hugues.gosselin@voisin.fr', 'hugues.gosselin@voisin.fr', 0, NULL, '7P}-+#B\"qZ/EEda0\"', NULL, NULL, NULL, 'a:0:{}', 'Grégoire', 'Paul Imbert', NULL, 'sm', NULL, NULL, NULL),
(32, 'martin.zoe@bigot.net', 'martin.zoe@bigot.net', 'martin.zoe@bigot.net', 'martin.zoe@bigot.net', 1, NULL, 's]fuMYOH', NULL, NULL, NULL, 'a:0:{}', 'Maryse', 'Nathalie Gilbert', NULL, 'sm', NULL, NULL, NULL),
(33, 'patricia89@berthelot.com', 'patricia89@berthelot.com', 'patricia89@berthelot.com', 'patricia89@berthelot.com', 0, NULL, 'm=|9Hy09?`)+q&byz', NULL, NULL, NULL, 'a:0:{}', 'Marthe', 'Alexandria Gilles', NULL, 'sm', NULL, NULL, NULL),
(34, 'isanchez@lucas.net', 'isanchez@lucas.net', 'isanchez@lucas.net', 'isanchez@lucas.net', 1, NULL, '<^v7b\\gNNA@kB|oztc', NULL, NULL, NULL, 'a:0:{}', 'Odette', 'Éléonore-Isabelle Poirier', NULL, 'sm', NULL, NULL, NULL),
(35, 'marques.frederique@wanadoo.fr', 'marques.frederique@wanadoo.fr', 'marques.frederique@wanadoo.fr', 'marques.frederique@wanadoo.fr', 1, NULL, 'OJ\"?~K<.!RM@$,\"', NULL, NULL, NULL, 'a:0:{}', 'Christine', 'Aurélie Le Louis', NULL, 'sm', NULL, NULL, NULL),
(36, 'ebertrand@guillaume.fr', 'ebertrand@guillaume.fr', 'ebertrand@guillaume.fr', 'ebertrand@guillaume.fr', 1, NULL, '#*N3IX', NULL, NULL, NULL, 'a:0:{}', 'Arthur', 'Philippe Georges', NULL, 'sm', NULL, NULL, NULL),
(37, 'stephanie.hubert@bernier.net', 'stephanie.hubert@bernier.net', 'stephanie.hubert@bernier.net', 'stephanie.hubert@bernier.net', 0, NULL, 's2A*aO$\\29|yA2`', NULL, NULL, NULL, 'a:0:{}', 'Claire', 'Suzanne de la Lopes', NULL, 'sm', NULL, NULL, NULL),
(38, 'vperrier@ifrance.com', 'vperrier@ifrance.com', 'vperrier@ifrance.com', 'vperrier@ifrance.com', 1, NULL, '68j#P+', NULL, NULL, NULL, 'a:0:{}', 'Guillaume', 'Auguste Riviere', NULL, 'sm', NULL, NULL, NULL),
(39, 'vrolland@maury.net', 'vrolland@maury.net', 'vrolland@maury.net', 'vrolland@maury.net', 0, NULL, 'XO6DO>V3', NULL, NULL, NULL, 'a:0:{}', 'Céline', 'Bernard du Lemoine', NULL, 'sm', NULL, NULL, NULL),
(40, 'marguerite.perrin@thierry.fr', 'marguerite.perrin@thierry.fr', 'marguerite.perrin@thierry.fr', 'marguerite.perrin@thierry.fr', 1, NULL, '1A-OY*;?Y(L2Z_[D', NULL, NULL, NULL, 'a:0:{}', 'Bernard', 'Henriette de Jean', NULL, 'sm', NULL, NULL, NULL),
(41, 'joubert.genevieve@sfr.fr', 'joubert.genevieve@sfr.fr', 'joubert.genevieve@sfr.fr', 'joubert.genevieve@sfr.fr', 0, NULL, 'q:G<8rWF1', NULL, NULL, NULL, 'a:0:{}', 'Édouard', 'Rémy Pichon', NULL, 'sm', NULL, NULL, NULL),
(42, 'renee.gerard@masse.org', 'renee.gerard@masse.org', 'renee.gerard@masse.org', 'renee.gerard@masse.org', 0, NULL, 'a@M@AJ})sxn\'tm$', NULL, NULL, NULL, 'a:0:{}', 'Sylvie', 'Patrick-René Lemoine', NULL, 'sm', NULL, NULL, NULL),
(43, 'barbe.margaud@dbmail.com', 'barbe.margaud@dbmail.com', 'barbe.margaud@dbmail.com', 'barbe.margaud@dbmail.com', 0, NULL, '9NW)mZLU0X7D{%', NULL, NULL, NULL, 'a:0:{}', 'Aurore', 'Aimé Baudry', NULL, 'sm', NULL, NULL, NULL),
(44, 'gregoire.aurore@hoarau.fr', 'gregoire.aurore@hoarau.fr', 'gregoire.aurore@hoarau.fr', 'gregoire.aurore@hoarau.fr', 1, NULL, 'a.>\\{_.9cj', NULL, NULL, NULL, 'a:0:{}', 'Noël', 'Étienne du Dumont', NULL, 'sm', NULL, NULL, NULL),
(45, 'benoit33@yahoo.fr', 'benoit33@yahoo.fr', 'benoit33@yahoo.fr', 'benoit33@yahoo.fr', 0, NULL, ')e{1S&wdBre8unu/X', NULL, NULL, NULL, 'a:0:{}', 'Antoine', 'Audrey Louis', NULL, 'sm', NULL, NULL, NULL),
(46, 'gdelannoy@marion.com', 'gdelannoy@marion.com', 'gdelannoy@marion.com', 'gdelannoy@marion.com', 1, NULL, 'k\"FGoe8C|3', NULL, NULL, NULL, 'a:0:{}', 'Julie', 'René Lopes', NULL, 'sm', NULL, NULL, NULL),
(47, 'lucas.bonnin@colin.fr', 'lucas.bonnin@colin.fr', 'lucas.bonnin@colin.fr', 'lucas.bonnin@colin.fr', 0, NULL, 'P{_RHO', NULL, NULL, NULL, 'a:0:{}', 'Antoinette', 'Margot Roche', NULL, 'sm', NULL, NULL, NULL),
(48, 'pereira.henri@yahoo.fr', 'pereira.henri@yahoo.fr', 'pereira.henri@yahoo.fr', 'pereira.henri@yahoo.fr', 1, NULL, 'w65V:_#rjlE8d?c\'E', NULL, NULL, NULL, 'a:0:{}', 'Anastasie', 'Alfred Humbert', NULL, 'sm', NULL, NULL, NULL),
(49, 'qnicolas@marchal.com', 'qnicolas@marchal.com', 'qnicolas@marchal.com', 'qnicolas@marchal.com', 1, NULL, '}b`jm:\'!', NULL, NULL, NULL, 'a:0:{}', 'Antoine', 'Guillaume Valentin-Buisson', NULL, 'sm', NULL, NULL, NULL),
(50, 'bigot.claudine@yahoo.fr', 'bigot.claudine@yahoo.fr', 'bigot.claudine@yahoo.fr', 'bigot.claudine@yahoo.fr', 0, NULL, 'GiNF0.2u/l', NULL, NULL, NULL, 'a:0:{}', 'Dorothée', 'Anastasie Renaud', NULL, 'sm', NULL, NULL, NULL),
(51, 'adrienne.moreau@live.com', 'adrienne.moreau@live.com', 'adrienne.moreau@live.com', 'adrienne.moreau@live.com', 0, NULL, 'Fdo)Vjkh`GkZ|v', NULL, NULL, NULL, 'a:0:{}', 'Marcelle', 'Lorraine Michel', NULL, 'sm', NULL, NULL, NULL),
(52, 'nathalie.olivier@voila.fr', 'nathalie.olivier@voila.fr', 'nathalie.olivier@voila.fr', 'nathalie.olivier@voila.fr', 0, NULL, 'D/KSuk}tTj%Wr*U', NULL, NULL, NULL, 'a:0:{}', 'Aimée', 'Frédérique-Suzanne Brunet', NULL, 'sm', NULL, NULL, NULL),
(53, 'anastasie60@robin.org', 'anastasie60@robin.org', 'anastasie60@robin.org', 'anastasie60@robin.org', 0, NULL, 'l)o%qzlN[bzpQ90C', NULL, NULL, NULL, 'a:0:{}', 'Robert', 'Gabriel Le Lecomte', NULL, 'sm', NULL, NULL, NULL),
(54, 'erey@bouygtel.fr', 'erey@bouygtel.fr', 'erey@bouygtel.fr', 'erey@bouygtel.fr', 0, NULL, 'crHK{YRS', NULL, NULL, NULL, 'a:0:{}', 'Thibault', 'Clémence Devaux-Foucher', NULL, 'sm', NULL, NULL, NULL),
(55, 'charlotte.briand@sfr.fr', 'charlotte.briand@sfr.fr', 'charlotte.briand@sfr.fr', 'charlotte.briand@sfr.fr', 0, NULL, 'He)}j^sgxbp+I%!x', NULL, NULL, NULL, 'a:0:{}', 'Frédéric', 'Aimé-Nicolas Fournier', NULL, 'sm', NULL, NULL, NULL),
(56, 'martin.thierry@noos.fr', 'martin.thierry@noos.fr', 'martin.thierry@noos.fr', 'martin.thierry@noos.fr', 0, NULL, '64>3VRazMsAzV!+~^`)C', NULL, NULL, NULL, 'a:0:{}', 'Jeannine', 'Dorothée Allard', NULL, 'sm', NULL, NULL, NULL),
(57, 'lmarty@free.fr', 'lmarty@free.fr', 'lmarty@free.fr', 'lmarty@free.fr', 0, NULL, 'c-M1NWdGh,a_}fyDk', NULL, NULL, NULL, 'a:0:{}', 'Corinne', 'Adrienne-Nathalie Bonneau', NULL, 'sm', NULL, NULL, NULL),
(58, 'pdumas@orange.fr', 'pdumas@orange.fr', 'pdumas@orange.fr', 'pdumas@orange.fr', 1, NULL, 'cy5k%3&|ufW(f(I<+', NULL, NULL, NULL, 'a:0:{}', 'David', 'Guy Leclercq', NULL, 'sm', NULL, NULL, NULL),
(59, 'brichard@free.fr', 'brichard@free.fr', 'brichard@free.fr', 'brichard@free.fr', 0, NULL, ',%0bHs>d1#L', NULL, NULL, NULL, 'a:0:{}', 'Thibault', 'Anaïs Charrier', NULL, 'sm', NULL, NULL, NULL),
(60, 'agnes.charles@voila.fr', 'agnes.charles@voila.fr', 'agnes.charles@voila.fr', 'agnes.charles@voila.fr', 1, NULL, '[x`\\c=p*%@\'', NULL, NULL, NULL, 'a:0:{}', 'Julie', 'Richard de la Marie', NULL, 'sm', NULL, NULL, NULL),
(61, 'jean.brunel@free.fr', 'jean.brunel@free.fr', 'jean.brunel@free.fr', 'jean.brunel@free.fr', 1, NULL, 'Yvj]c0j', NULL, NULL, NULL, 'a:0:{}', 'Michelle', 'Georges Teixeira', NULL, 'sm', NULL, NULL, NULL),
(62, 'laure.denis@voila.fr', 'laure.denis@voila.fr', 'laure.denis@voila.fr', 'laure.denis@voila.fr', 0, NULL, 'X\"5l`OhhCGIk?)<b_', NULL, NULL, NULL, 'a:0:{}', 'Théophile', 'Auguste Francois', NULL, 'sm', NULL, NULL, NULL),
(63, 'hmoreau@bouygtel.fr', 'hmoreau@bouygtel.fr', 'hmoreau@bouygtel.fr', 'hmoreau@bouygtel.fr', 1, NULL, '8vL4rlczsYlnd.', NULL, NULL, NULL, 'a:0:{}', 'Joseph', 'Sophie Langlois', NULL, 'sm', NULL, NULL, NULL),
(64, 'bernier.nathalie@rodriguez.fr', 'bernier.nathalie@rodriguez.fr', 'bernier.nathalie@rodriguez.fr', 'bernier.nathalie@rodriguez.fr', 1, NULL, '5jr(Sf!!1AfP)i|*D', NULL, NULL, NULL, 'a:0:{}', 'Claude', 'Georges Levy-Raynaud', NULL, 'sm', NULL, NULL, NULL),
(65, 'adrien.faure@coste.com', 'adrien.faure@coste.com', 'adrien.faure@coste.com', 'adrien.faure@coste.com', 1, NULL, 'qvJEoZ`!LmdnmZx(', NULL, NULL, NULL, 'a:0:{}', 'Eugène', 'Jacques Peltier', NULL, 'sm', NULL, NULL, NULL),
(66, 'rodrigues.paulette@brun.fr', 'rodrigues.paulette@brun.fr', 'rodrigues.paulette@brun.fr', 'rodrigues.paulette@brun.fr', 0, NULL, '-/56[`O=(FtJ9>$v3', NULL, NULL, NULL, 'a:0:{}', 'Théophile', 'Gilbert Deschamps', NULL, 'sm', NULL, NULL, NULL),
(67, 'eleonore.benoit@gaudin.fr', 'eleonore.benoit@gaudin.fr', 'eleonore.benoit@gaudin.fr', 'eleonore.benoit@gaudin.fr', 1, NULL, ',Hx)qQr8pWyc4', NULL, NULL, NULL, 'a:0:{}', 'Jacques', 'Stéphanie Didier', NULL, 'sm', NULL, NULL, NULL),
(68, 'mboulay@hotmail.fr', 'mboulay@hotmail.fr', 'mboulay@hotmail.fr', 'mboulay@hotmail.fr', 0, NULL, 'K9-xx6', NULL, NULL, NULL, 'a:0:{}', 'Marcelle', 'Emmanuel de Lelievre', NULL, 'sm', NULL, NULL, NULL),
(69, 'alain05@sfr.fr', 'alain05@sfr.fr', 'alain05@sfr.fr', 'alain05@sfr.fr', 0, NULL, 'Xq2dQ65Fl$[F8(hJS', NULL, NULL, NULL, 'a:0:{}', 'Paul', 'Émile de la Mary', NULL, 'sm', NULL, NULL, NULL),
(70, 'simon.antoine@labbe.com', 'simon.antoine@labbe.com', 'simon.antoine@labbe.com', 'simon.antoine@labbe.com', 1, NULL, 'H\\`EJ+kD6ywF=ZT#~L', NULL, NULL, NULL, 'a:0:{}', 'Cécile', 'Denis Poirier', NULL, 'sm', NULL, NULL, NULL),
(71, 'roche.thibaut@club-internet.fr', 'roche.thibaut@club-internet.fr', 'roche.thibaut@club-internet.fr', 'roche.thibaut@club-internet.fr', 1, NULL, '1$p\\;QM},e>\"4v>o=e8]', NULL, NULL, NULL, 'a:0:{}', 'Roland', 'Stéphane Faure', NULL, 'sm', NULL, NULL, NULL),
(72, 'pfontaine@hoareau.com', 'pfontaine@hoareau.com', 'pfontaine@hoareau.com', 'pfontaine@hoareau.com', 1, NULL, 'mXxq^d', NULL, NULL, NULL, 'a:0:{}', 'Laetitia', 'Théophile Marchal', NULL, 'sm', NULL, NULL, NULL),
(73, 'dorothee.meunier@club-internet.fr', 'dorothee.meunier@club-internet.fr', 'dorothee.meunier@club-internet.fr', 'dorothee.meunier@club-internet.fr', 0, NULL, 'R\"}[dSS', NULL, NULL, NULL, 'a:0:{}', 'Amélie', 'Antoinette Dupont-Delattre', NULL, 'sm', NULL, NULL, NULL),
(74, 'julien.masson@millet.net', 'julien.masson@millet.net', 'julien.masson@millet.net', 'julien.masson@millet.net', 1, NULL, '%jCbcm(A{T(', NULL, NULL, NULL, 'a:0:{}', 'Jacqueline', 'Hortense Normand-Letellier', NULL, 'sm', NULL, NULL, NULL),
(75, 'weber.claudine@perrier.fr', 'weber.claudine@perrier.fr', 'weber.claudine@perrier.fr', 'weber.claudine@perrier.fr', 1, NULL, 'go|86oM', NULL, NULL, NULL, 'a:0:{}', 'Grégoire', 'Thomas Hebert', NULL, 'sm', NULL, NULL, NULL),
(76, 'durand.eric@morel.fr', 'durand.eric@morel.fr', 'durand.eric@morel.fr', 'durand.eric@morel.fr', 0, NULL, 'qg\'f0:QRM![Ofo', NULL, NULL, NULL, 'a:0:{}', 'Maurice', 'Gilbert Rodrigues', NULL, 'sm', NULL, NULL, NULL),
(77, 'mvalette@bouygtel.fr', 'mvalette@bouygtel.fr', 'mvalette@bouygtel.fr', 'mvalette@bouygtel.fr', 0, NULL, '+q<0|p~(:&&Xq', NULL, NULL, NULL, 'a:0:{}', 'Agathe', 'Cécile Dupuis', NULL, 'sm', NULL, NULL, NULL),
(78, 'gabrielle95@martins.net', 'gabrielle95@martins.net', 'gabrielle95@martins.net', 'gabrielle95@martins.net', 0, NULL, '}ti|Y+', NULL, NULL, NULL, 'a:0:{}', 'Nicole', 'Michel Thierry', NULL, 'sm', NULL, NULL, NULL),
(79, 'agathe83@goncalves.fr', 'agathe83@goncalves.fr', 'agathe83@goncalves.fr', 'agathe83@goncalves.fr', 1, NULL, 'I)7ZzSU', NULL, NULL, NULL, 'a:0:{}', 'Laetitia', 'Margaux Le Gall', NULL, 'sm', NULL, NULL, NULL),
(80, 'zpascal@rossi.org', 'zpascal@rossi.org', 'zpascal@rossi.org', 'zpascal@rossi.org', 1, NULL, 'fdcx\"8LI', NULL, NULL, NULL, 'a:0:{}', 'Luc', 'Pauline Dijoux', NULL, 'sm', NULL, NULL, NULL),
(81, 'joubert.elodie@sfr.fr', 'joubert.elodie@sfr.fr', 'joubert.elodie@sfr.fr', 'joubert.elodie@sfr.fr', 1, NULL, ':LGe[*5', NULL, NULL, NULL, 'a:0:{}', 'Alexandria', 'Augustin Auger', NULL, 'sm', NULL, NULL, NULL),
(82, 'agnes.meunier@regnier.com', 'agnes.meunier@regnier.com', 'agnes.meunier@regnier.com', 'agnes.meunier@regnier.com', 1, NULL, 'qeMB4I', NULL, NULL, NULL, 'a:0:{}', 'Thierry', 'Alphonse-Timothée Dubois', NULL, 'sm', NULL, NULL, NULL),
(83, 'pottier.matthieu@yahoo.fr', 'pottier.matthieu@yahoo.fr', 'pottier.matthieu@yahoo.fr', 'pottier.matthieu@yahoo.fr', 0, NULL, 'jz[DId7`~', NULL, NULL, NULL, 'a:0:{}', 'Claire', 'Arnaude-Martine Fouquet', NULL, 'sm', NULL, NULL, NULL),
(84, 'lambert.patrick@ifrance.com', 'lambert.patrick@ifrance.com', 'lambert.patrick@ifrance.com', 'lambert.patrick@ifrance.com', 1, NULL, 'fc=4MR', NULL, NULL, NULL, 'a:0:{}', 'Jacques', 'Christiane Weiss', NULL, 'sm', NULL, NULL, NULL),
(85, 'arthur32@vallet.com', 'arthur32@vallet.com', 'arthur32@vallet.com', 'arthur32@vallet.com', 0, NULL, 'yHh&{smVH@-', NULL, NULL, NULL, 'a:0:{}', 'William', 'Constance Aubert', NULL, 'sm', NULL, NULL, NULL),
(86, 'zbourgeois@gillet.net', 'zbourgeois@gillet.net', 'zbourgeois@gillet.net', 'zbourgeois@gillet.net', 1, NULL, 'dg/IXLin}~JcHcn`', NULL, NULL, NULL, 'a:0:{}', 'Alexandre', 'Alex Launay', NULL, 'sm', NULL, NULL, NULL),
(87, 'roland.loiseau@coulon.com', 'roland.loiseau@coulon.com', 'roland.loiseau@coulon.com', 'roland.loiseau@coulon.com', 1, NULL, '@KR5-g>)Ff_j', NULL, NULL, NULL, 'a:0:{}', 'Valérie', 'Gabriel Delorme', NULL, 'sm', NULL, NULL, NULL),
(88, 'voisin.zacharie@perret.com', 'voisin.zacharie@perret.com', 'voisin.zacharie@perret.com', 'voisin.zacharie@perret.com', 0, NULL, 'ftj\'ABBLo+5|<7qt', NULL, NULL, NULL, 'a:0:{}', 'Adélaïde', 'Adrienne Paul', NULL, 'sm', NULL, NULL, NULL),
(89, 'mallet.francois@fischer.net', 'mallet.francois@fischer.net', 'mallet.francois@fischer.net', 'mallet.francois@fischer.net', 0, NULL, '\"vB4h0=Te@pUJ6J\'gt', NULL, NULL, NULL, 'a:0:{}', 'Alexandrie', 'Léon Thierry', NULL, 'sm', NULL, NULL, NULL),
(90, 'guillaume.leger@wanadoo.fr', 'guillaume.leger@wanadoo.fr', 'guillaume.leger@wanadoo.fr', 'guillaume.leger@wanadoo.fr', 0, NULL, '8#ant`;|%[\\D0(8gdQ&;', NULL, NULL, NULL, 'a:0:{}', 'Suzanne', 'Henri Morel', NULL, 'sm', NULL, NULL, NULL),
(91, 'capucine.leveque@bertin.org', 'capucine.leveque@bertin.org', 'capucine.leveque@bertin.org', 'capucine.leveque@bertin.org', 0, NULL, 'BYVf)1LVxE', NULL, NULL, NULL, 'a:0:{}', 'Margot', 'Nicole du Grondin', NULL, 'sm', NULL, NULL, NULL),
(92, 'adele82@hamel.fr', 'adele82@hamel.fr', 'adele82@hamel.fr', 'adele82@hamel.fr', 0, NULL, '*SbVlNf', NULL, NULL, NULL, 'a:0:{}', 'Éric', 'Roland Faure-Lecomte', NULL, 'sm', NULL, NULL, NULL),
(93, 'rene.gilbert@free.fr', 'rene.gilbert@free.fr', 'rene.gilbert@free.fr', 'rene.gilbert@free.fr', 0, NULL, '&!7C18=.>TOr(', NULL, NULL, NULL, 'a:0:{}', 'Paulette', 'Aurore Gay', NULL, 'sm', NULL, NULL, NULL),
(94, 'erolland@tele2.fr', 'erolland@tele2.fr', 'erolland@tele2.fr', 'erolland@tele2.fr', 1, NULL, ';Ix]D1a,mewa-k', NULL, NULL, NULL, 'a:0:{}', 'Lucas', 'François Le Valentin', NULL, 'sm', NULL, NULL, NULL),
(95, 'philippe90@pons.org', 'philippe90@pons.org', 'philippe90@pons.org', 'philippe90@pons.org', 1, NULL, 'M.jen9.', NULL, NULL, NULL, 'a:0:{}', 'Jules', 'Guy Martinez', NULL, 'sm', NULL, NULL, NULL),
(96, 'frederic07@dasilva.com', 'frederic07@dasilva.com', 'frederic07@dasilva.com', 'frederic07@dasilva.com', 1, NULL, '\"`cU8{e', NULL, NULL, NULL, 'a:0:{}', 'Hugues', 'Grégoire Durand', NULL, 'sm', NULL, NULL, NULL),
(97, 'isimon@schneider.fr', 'isimon@schneider.fr', 'isimon@schneider.fr', 'isimon@schneider.fr', 1, NULL, '\\pQiohmDvaq:W2', NULL, NULL, NULL, 'a:0:{}', 'Alexandria', 'Paulette Foucher', NULL, 'sm', NULL, NULL, NULL),
(98, 'ehoareau@ifrance.com', 'ehoareau@ifrance.com', 'ehoareau@ifrance.com', 'ehoareau@ifrance.com', 1, NULL, '`cnO/o?+wH[U', NULL, NULL, NULL, 'a:0:{}', 'Julie', 'René Gallet', NULL, 'sm', NULL, NULL, NULL),
(99, 'gabrielle53@guillon.com', 'gabrielle53@guillon.com', 'gabrielle53@guillon.com', 'gabrielle53@guillon.com', 1, NULL, '$Hz+(fo@N?o$/pkpP\"]~', NULL, NULL, NULL, 'a:0:{}', 'Alexandrie', 'Amélie Ferreira', NULL, 'sm', NULL, NULL, NULL),
(100, 'schneider.thierry@hubert.fr', 'schneider.thierry@hubert.fr', 'schneider.thierry@hubert.fr', 'schneider.thierry@hubert.fr', 0, NULL, 'lfjXk:`@N<', NULL, NULL, NULL, 'a:0:{}', 'Isaac', 'Lucie Costa', NULL, 'sm', NULL, NULL, NULL),
(101, 'blaunay@bouygtel.fr', 'blaunay@bouygtel.fr', 'blaunay@bouygtel.fr', 'blaunay@bouygtel.fr', 1, NULL, 'NTQUxC%1`39MSN~PCPY\"', NULL, NULL, NULL, 'a:0:{}', 'Benoît', 'Yves Da Silva-Faivre', NULL, 'sm', NULL, NULL, NULL),
(102, 'laetitia.lejeune@marechal.net', 'laetitia.lejeune@marechal.net', 'laetitia.lejeune@marechal.net', 'laetitia.lejeune@marechal.net', 1, NULL, 'v>lCI#.!DWo&U:', NULL, NULL, NULL, 'a:0:{}', 'Élise', 'Claire Fernandez', NULL, 'sm', NULL, NULL, NULL),
(103, 'nathalie63@live.com', 'nathalie63@live.com', 'nathalie63@live.com', 'nathalie63@live.com', 1, NULL, '3Qd:N+ADqO|p8.%WRqe6', NULL, NULL, NULL, 'a:0:{}', 'Marie', 'Jules Hamel', NULL, 'sm', NULL, NULL, NULL),
(104, 'rtanguy@mace.fr', 'rtanguy@mace.fr', 'rtanguy@mace.fr', 'rtanguy@mace.fr', 1, NULL, '7JdC%`q]x', NULL, NULL, NULL, 'a:0:{}', 'Pauline', 'Thérèse Dumas', NULL, 'sm', NULL, NULL, NULL),
(105, 'lopez.luc@masson.fr', 'lopez.luc@masson.fr', 'lopez.luc@masson.fr', 'lopez.luc@masson.fr', 1, NULL, '<M6$xlR', NULL, NULL, NULL, 'a:0:{}', 'Dorothée', 'Dominique Perez', NULL, 'sm', NULL, NULL, NULL),
(106, 'josephine.marques@carlier.fr', 'josephine.marques@carlier.fr', 'josephine.marques@carlier.fr', 'josephine.marques@carlier.fr', 0, NULL, '1rLCQ(ccn', NULL, NULL, NULL, 'a:0:{}', 'Henri', 'Raymond Gimenez', NULL, 'sm', NULL, NULL, NULL),
(107, 'durand.rene@duhamel.com', 'durand.rene@duhamel.com', 'durand.rene@duhamel.com', 'durand.rene@duhamel.com', 0, NULL, 'EI?E9_1pYLa9@L:Rmb', NULL, NULL, NULL, 'a:0:{}', 'Alix', 'Philippe Etienne', NULL, 'sm', NULL, NULL, NULL),
(108, 'lucie27@dossantos.com', 'lucie27@dossantos.com', 'lucie27@dossantos.com', 'lucie27@dossantos.com', 0, NULL, 'T!%0.YzO3hm`)d', NULL, NULL, NULL, 'a:0:{}', 'Michel', 'Marine Hardy', NULL, 'sm', NULL, NULL, NULL),
(109, 'honore.valette@tele2.fr', 'honore.valette@tele2.fr', 'honore.valette@tele2.fr', 'honore.valette@tele2.fr', 1, NULL, 'ktUJs?17Eoy#', NULL, NULL, NULL, 'a:0:{}', 'Philippe', 'Célina Perrot', NULL, 'sm', NULL, NULL, NULL),
(110, 'limbert@laposte.net', 'limbert@laposte.net', 'limbert@laposte.net', 'limbert@laposte.net', 1, NULL, 'ST\"nwE<0Ie3LJ*E4Q}{', NULL, NULL, NULL, 'a:0:{}', 'Lucie', 'Danielle Petit', NULL, 'sm', NULL, NULL, NULL),
(111, 'fcordier@prevost.com', 'fcordier@prevost.com', 'fcordier@prevost.com', 'fcordier@prevost.com', 0, NULL, 'Q9eIZL', NULL, NULL, NULL, 'a:0:{}', 'Hortense', 'Virginie Masse-Tanguy', NULL, 'sm', NULL, NULL, NULL),
(112, 'jacques14@tele2.fr', 'jacques14@tele2.fr', 'jacques14@tele2.fr', 'jacques14@tele2.fr', 1, NULL, 'Gyn@XITTRh', NULL, NULL, NULL, 'a:0:{}', 'Théodore', 'Alexandria Perret', NULL, 'sm', NULL, NULL, NULL),
(113, 'bertrand.samson@tele2.fr', 'bertrand.samson@tele2.fr', 'bertrand.samson@tele2.fr', 'bertrand.samson@tele2.fr', 1, NULL, ')wKJC{xs-', NULL, NULL, NULL, 'a:0:{}', 'Astrid', 'Xavier de Robert', NULL, 'sm', NULL, NULL, NULL),
(114, 'christelle.deoliveira@pichon.fr', 'christelle.deoliveira@pichon.fr', 'christelle.deoliveira@pichon.fr', 'christelle.deoliveira@pichon.fr', 1, NULL, 'ukk>oo\"ZGS6q/fc1', NULL, NULL, NULL, 'a:0:{}', 'Eugène', 'Simone Chevallier', NULL, 'sm', NULL, NULL, NULL),
(115, 'urodrigues@lenoir.com', 'urodrigues@lenoir.com', 'urodrigues@lenoir.com', 'urodrigues@lenoir.com', 0, NULL, 'OAjL!4D[\\w,UX', NULL, NULL, NULL, 'a:0:{}', 'Renée', 'Adèle du Vidal', NULL, 'sm', NULL, NULL, NULL),
(116, 'wmoulin@vidal.net', 'wmoulin@vidal.net', 'wmoulin@vidal.net', 'wmoulin@vidal.net', 0, NULL, ';JS/?0', NULL, NULL, NULL, 'a:0:{}', 'Gabrielle', 'René Verdier', NULL, 'sm', NULL, NULL, NULL),
(117, 'augustin88@gauthier.fr', 'augustin88@gauthier.fr', 'augustin88@gauthier.fr', 'augustin88@gauthier.fr', 0, NULL, 'RV`)^lFf', NULL, NULL, NULL, 'a:0:{}', 'Chantal', 'Renée du Lefebvre', NULL, 'sm', NULL, NULL, NULL),
(118, 'suzanne42@hotmail.fr', 'suzanne42@hotmail.fr', 'suzanne42@hotmail.fr', 'suzanne42@hotmail.fr', 1, NULL, '+CiCt139', NULL, NULL, NULL, 'a:0:{}', 'Grégoire', 'Alexandre Perrin', NULL, 'sm', NULL, NULL, NULL),
(119, 'marianne.levy@noos.fr', 'marianne.levy@noos.fr', 'marianne.levy@noos.fr', 'marianne.levy@noos.fr', 1, NULL, 'Po\\Gie\'XGDb?xW', NULL, NULL, NULL, 'a:0:{}', 'Guy', 'Robert Nguyen', NULL, 'sm', NULL, NULL, NULL),
(120, 'tmorvan@langlois.fr', 'tmorvan@langlois.fr', 'tmorvan@langlois.fr', 'tmorvan@langlois.fr', 1, NULL, '<O1a5lwj/E', NULL, NULL, NULL, 'a:0:{}', 'Aurélie', 'Suzanne de la Riou', NULL, 'sm', NULL, NULL, NULL),
(121, 'louise.daniel@wanadoo.fr', 'louise.daniel@wanadoo.fr', 'louise.daniel@wanadoo.fr', 'louise.daniel@wanadoo.fr', 0, NULL, 'q(%]Ln(GL9ES/DcGF2~!', NULL, NULL, NULL, 'a:0:{}', 'Thierry', 'Anouk Le Goff', NULL, 'sm', NULL, NULL, NULL),
(122, 'boulay.michelle@hotmail.fr', 'boulay.michelle@hotmail.fr', 'boulay.michelle@hotmail.fr', 'boulay.michelle@hotmail.fr', 1, NULL, 'P>m$bNrT!v%&-jSE^bGx', NULL, NULL, NULL, 'a:0:{}', 'Sébastien', 'Franck Barre', NULL, 'sm', NULL, NULL, NULL),
(123, 'gbarre@wanadoo.fr', 'gbarre@wanadoo.fr', 'gbarre@wanadoo.fr', 'gbarre@wanadoo.fr', 1, NULL, '}vig:K[5[V', NULL, NULL, NULL, 'a:0:{}', 'Emmanuel', 'Madeleine Vaillant', NULL, 'sm', NULL, NULL, NULL),
(124, 'kmoreau@pichon.fr', 'kmoreau@pichon.fr', 'kmoreau@pichon.fr', 'kmoreau@pichon.fr', 0, NULL, '#N(q|0[b9S1.Cj.=!=i', NULL, NULL, NULL, 'a:0:{}', 'Véronique', 'Alexandria de la Meunier', NULL, 'sm', NULL, NULL, NULL),
(125, 'michele.legrand@neveu.com', 'michele.legrand@neveu.com', 'michele.legrand@neveu.com', 'michele.legrand@neveu.com', 1, NULL, '{*Km1Qcvsm_wSBRZ+7^', NULL, NULL, NULL, 'a:0:{}', 'Guy', 'Frédéric Delmas', NULL, 'sm', NULL, NULL, NULL),
(126, 'collet.franck@samson.com', 'collet.franck@samson.com', 'collet.franck@samson.com', 'collet.franck@samson.com', 0, NULL, 'pQbA+p.g', NULL, NULL, NULL, 'a:0:{}', 'Thibaut', 'Xavier Delattre', NULL, 'sm', NULL, NULL, NULL),
(127, 'petit.theodore@free.fr', 'petit.theodore@free.fr', 'petit.theodore@free.fr', 'petit.theodore@free.fr', 0, NULL, 'JL5Gb_~', NULL, NULL, NULL, 'a:0:{}', 'Claude', 'Jean Pereira-Leger', NULL, 'sm', NULL, NULL, NULL),
(128, 'charrier.alexandria@lagarde.fr', 'charrier.alexandria@lagarde.fr', 'charrier.alexandria@lagarde.fr', 'charrier.alexandria@lagarde.fr', 1, NULL, '-$\'Y&%V', NULL, NULL, NULL, 'a:0:{}', 'Dominique', 'Mathilde-Célina Delaunay', NULL, 'sm', NULL, NULL, NULL),
(129, 'eevrard@mace.com', 'eevrard@mace.com', 'eevrard@mace.com', 'eevrard@mace.com', 0, NULL, '%>lwn91]W*SO})Dq)]', NULL, NULL, NULL, 'a:0:{}', 'Marcelle', 'Martine Gay-Rolland', NULL, 'sm', NULL, NULL, NULL),
(130, 'agathe88@boyer.com', 'agathe88@boyer.com', 'agathe88@boyer.com', 'agathe88@boyer.com', 1, NULL, '_rEuM%VJI~?*owd', NULL, NULL, NULL, 'a:0:{}', 'Raymond', 'Alfred Leclercq', NULL, 'sm', NULL, NULL, NULL),
(131, 'michelle.dacosta@devaux.com', 'michelle.dacosta@devaux.com', 'michelle.dacosta@devaux.com', 'michelle.dacosta@devaux.com', 1, NULL, '^\\7gR\\8Dcgu#`S', NULL, NULL, NULL, 'a:0:{}', 'Gabrielle', 'Nicolas Rey', NULL, 'sm', NULL, NULL, NULL),
(132, 'jnoel@voila.fr', 'jnoel@voila.fr', 'jnoel@voila.fr', 'jnoel@voila.fr', 1, NULL, 'O7^F|uM!', NULL, NULL, NULL, 'a:0:{}', 'Agathe', 'Emmanuel-Alain Brunel', NULL, 'sm', NULL, NULL, NULL),
(133, 'afleury@voila.fr', 'afleury@voila.fr', 'afleury@voila.fr', 'afleury@voila.fr', 1, NULL, '>dqx4HVOuo', NULL, NULL, NULL, 'a:0:{}', 'Marc', 'Océane Etienne-Boutin', NULL, 'sm', NULL, NULL, NULL),
(134, 'bbarre@tele2.fr', 'bbarre@tele2.fr', 'bbarre@tele2.fr', 'bbarre@tele2.fr', 1, NULL, '*rlG4>q', NULL, NULL, NULL, 'a:0:{}', 'Christiane', 'Hugues Lemonnier', NULL, 'sm', NULL, NULL, NULL),
(135, 'dorothee.perez@schneider.fr', 'dorothee.perez@schneider.fr', 'dorothee.perez@schneider.fr', 'dorothee.perez@schneider.fr', 0, NULL, 'N\"u~<b-C9hD', NULL, NULL, NULL, 'a:0:{}', 'Arthur', 'Lucie Rey', NULL, 'sm', NULL, NULL, NULL),
(136, 'aubert.theodore@dbmail.com', 'aubert.theodore@dbmail.com', 'aubert.theodore@dbmail.com', 'aubert.theodore@dbmail.com', 1, NULL, 'U?V1=16A4', NULL, NULL, NULL, 'a:0:{}', 'Lucas', 'Vincent Boyer', NULL, 'sm', NULL, NULL, NULL),
(137, 'georges.frederique@yahoo.fr', 'georges.frederique@yahoo.fr', 'georges.frederique@yahoo.fr', 'georges.frederique@yahoo.fr', 1, NULL, 'TuerCsfVCZ=$sB|Z(!ct', NULL, NULL, NULL, 'a:0:{}', 'Louis', 'Laurent Leleu', NULL, 'sm', NULL, NULL, NULL),
(138, 'louise.peron@gimenez.fr', 'louise.peron@gimenez.fr', 'louise.peron@gimenez.fr', 'louise.peron@gimenez.fr', 1, NULL, 'SdBTOkwWR1~_Z[VaD^wJ', NULL, NULL, NULL, 'a:0:{}', 'Alexandria', 'Inès Blot', NULL, 'sm', NULL, NULL, NULL),
(139, 'duhamel.clemence@orange.fr', 'duhamel.clemence@orange.fr', 'duhamel.clemence@orange.fr', 'duhamel.clemence@orange.fr', 1, NULL, '*u/5!2&85x:', NULL, NULL, NULL, 'a:0:{}', 'Michel', 'Alexandria Buisson', NULL, 'sm', NULL, NULL, NULL),
(140, 'pierre.sauvage@baudry.com', 'pierre.sauvage@baudry.com', 'pierre.sauvage@baudry.com', 'pierre.sauvage@baudry.com', 1, NULL, 'J?c&s7', NULL, NULL, NULL, 'a:0:{}', 'Noémi', 'Sophie-Nathalie Gallet', NULL, 'sm', NULL, NULL, NULL),
(141, 'catherine65@perrot.com', 'catherine65@perrot.com', 'catherine65@perrot.com', 'catherine65@perrot.com', 0, NULL, ',T6_<W]AhM', NULL, NULL, NULL, 'a:0:{}', 'Maryse', 'Louis Bouvet', NULL, 'sm', NULL, NULL, NULL),
(142, 'nath.baudry@gaillard.fr', 'nath.baudry@gaillard.fr', 'nath.baudry@gaillard.fr', 'nath.baudry@gaillard.fr', 1, NULL, '_H?{K5)~!MFV', NULL, NULL, NULL, 'a:0:{}', 'Philippe', 'Nathalie Mallet', NULL, 'sm', NULL, NULL, NULL),
(143, 'allard.gilbert@charles.org', 'allard.gilbert@charles.org', 'allard.gilbert@charles.org', 'allard.gilbert@charles.org', 0, NULL, 'Q7#LG\'D', NULL, NULL, NULL, 'a:0:{}', 'Christine', 'Adélaïde Guyon', NULL, 'sm', NULL, NULL, NULL),
(144, 'emmanuel00@noos.fr', 'emmanuel00@noos.fr', 'emmanuel00@noos.fr', 'emmanuel00@noos.fr', 1, NULL, 'u\'O^?i=;7Q!', NULL, NULL, NULL, 'a:0:{}', 'Thomas', 'Auguste Caron', NULL, 'sm', NULL, NULL, NULL),
(145, 'madeleine.lebon@michaud.net', 'madeleine.lebon@michaud.net', 'madeleine.lebon@michaud.net', 'madeleine.lebon@michaud.net', 1, NULL, '\'}KcLH&6:P7H5fR', NULL, NULL, NULL, 'a:0:{}', 'Benjamin', 'Océane Renard', NULL, 'sm', NULL, NULL, NULL),
(146, 'augustin.petit@laposte.net', 'augustin.petit@laposte.net', 'augustin.petit@laposte.net', 'augustin.petit@laposte.net', 0, NULL, 'J;4Ca6', NULL, NULL, NULL, 'a:0:{}', 'Monique', 'Pénélope Barre', NULL, 'sm', NULL, NULL, NULL),
(147, 'antoinette.caron@lagarde.com', 'antoinette.caron@lagarde.com', 'antoinette.caron@lagarde.com', 'antoinette.caron@lagarde.com', 0, NULL, 'Vxz&\\eq!9Plpp!M%b<PJ', NULL, NULL, NULL, 'a:0:{}', 'Madeleine', 'Inès Etienne', NULL, 'sm', NULL, NULL, NULL),
(148, 'pauline44@club-internet.fr', 'pauline44@club-internet.fr', 'pauline44@club-internet.fr', 'pauline44@club-internet.fr', 1, NULL, '6fsjf-rE;{', NULL, NULL, NULL, 'a:0:{}', 'Antoine', 'François Hebert', NULL, 'sm', NULL, NULL, NULL),
(149, 'poirier.honore@ifrance.com', 'poirier.honore@ifrance.com', 'poirier.honore@ifrance.com', 'poirier.honore@ifrance.com', 1, NULL, 'n+i8>\\QwJ@xbKrUUP#', NULL, NULL, NULL, 'a:0:{}', 'Auguste', 'Célina Faivre', NULL, 'sm', NULL, NULL, NULL),
(150, 'alexandria.ollivier@live.com', 'alexandria.ollivier@live.com', 'alexandria.ollivier@live.com', 'alexandria.ollivier@live.com', 0, NULL, '/l>q{R3', NULL, NULL, NULL, 'a:0:{}', 'Georges', 'Gabrielle Dupuy-Verdier', NULL, 'sm', NULL, NULL, NULL),
(151, 'marcelle.giraud@barthelemy.com', 'marcelle.giraud@barthelemy.com', 'marcelle.giraud@barthelemy.com', 'marcelle.giraud@barthelemy.com', 0, NULL, '=!wB.?kPNyoNYcHcj', NULL, NULL, NULL, 'a:0:{}', 'Gérard', 'Hugues du Pires', NULL, 'sm', NULL, NULL, NULL),
(152, 'suzanne.regnier@orange.fr', 'suzanne.regnier@orange.fr', 'suzanne.regnier@orange.fr', 'suzanne.regnier@orange.fr', 0, NULL, 'ytoSZLGcLWB%,_', NULL, NULL, NULL, 'a:0:{}', 'Étienne', 'Antoinette Joubert', NULL, 'sm', NULL, NULL, NULL),
(153, 'corinne23@devaux.org', 'corinne23@devaux.org', 'corinne23@devaux.org', 'corinne23@devaux.org', 0, NULL, 'c9m)kHlWAUs/wM', NULL, NULL, NULL, 'a:0:{}', 'Paul', 'Henri Hardy', NULL, 'sm', NULL, NULL, NULL),
(154, 'pierre.noel@durand.com', 'pierre.noel@durand.com', 'pierre.noel@durand.com', 'pierre.noel@durand.com', 0, NULL, 'dP2G,M*', NULL, NULL, NULL, 'a:0:{}', 'Gilbert', 'Audrey Perrin', NULL, 'sm', NULL, NULL, NULL),
(155, 'arnaude.martins@benoit.net', 'arnaude.martins@benoit.net', 'arnaude.martins@benoit.net', 'arnaude.martins@benoit.net', 0, NULL, '#G5K9H`aD,m.yE', NULL, NULL, NULL, 'a:0:{}', 'Josette', 'Antoine Pasquier-Moreno', NULL, 'sm', NULL, NULL, NULL),
(156, 'xgaudin@bodin.com', 'xgaudin@bodin.com', 'xgaudin@bodin.com', 'xgaudin@bodin.com', 1, NULL, '2hPKg3?k9\"<8wh.ux2', NULL, NULL, NULL, 'a:0:{}', 'Roland', 'Suzanne De Sousa', NULL, 'sm', NULL, NULL, NULL),
(157, 'hdurand@auger.fr', 'hdurand@auger.fr', 'hdurand@auger.fr', 'hdurand@auger.fr', 1, NULL, 'E^VI8i8KBmM', NULL, NULL, NULL, 'a:0:{}', 'Émilie', 'Stéphanie-Catherine Dupuis', NULL, 'sm', NULL, NULL, NULL),
(158, 'kbernier@club-internet.fr', 'kbernier@club-internet.fr', 'kbernier@club-internet.fr', 'kbernier@club-internet.fr', 0, NULL, 'eoTXRnZ_\"g]', NULL, NULL, NULL, 'a:0:{}', 'Stéphanie', 'Sébastien Riou', NULL, 'sm', NULL, NULL, NULL),
(159, 'jjacob@hotmail.fr', 'jjacob@hotmail.fr', 'jjacob@hotmail.fr', 'jjacob@hotmail.fr', 1, NULL, 'y/{lk]1|G{', NULL, NULL, NULL, 'a:0:{}', 'Margot', 'Guillaume du Bonneau', NULL, 'sm', NULL, NULL, NULL),
(160, 'christiane.benard@courtois.com', 'christiane.benard@courtois.com', 'christiane.benard@courtois.com', 'christiane.benard@courtois.com', 1, NULL, 't5[Zi%\"Pmcq;', NULL, NULL, NULL, 'a:0:{}', 'Louise', 'Hélène Seguin-Barbe', NULL, 'sm', NULL, NULL, NULL),
(161, 'nmallet@noos.fr', 'nmallet@noos.fr', 'nmallet@noos.fr', 'nmallet@noos.fr', 1, NULL, '/zw/\'_r?9gWoGZ\'^', NULL, NULL, NULL, 'a:0:{}', 'Denis', 'Clémence Hamon', NULL, 'sm', NULL, NULL, NULL),
(162, 'qfernandes@tele2.fr', 'qfernandes@tele2.fr', 'qfernandes@tele2.fr', 'qfernandes@tele2.fr', 1, NULL, '1\'~<Q{qJ7mth+@', NULL, NULL, NULL, 'a:0:{}', 'Odette', 'Philippe Bourgeois', NULL, 'sm', NULL, NULL, NULL),
(163, 'helene59@dbmail.com', 'helene59@dbmail.com', 'helene59@dbmail.com', 'helene59@dbmail.com', 0, NULL, '*cgUONo6<Kg/', NULL, NULL, NULL, 'a:0:{}', 'Richard', 'Auguste Mathieu', NULL, 'sm', NULL, NULL, NULL),
(164, 'william.barbe@bourgeois.com', 'william.barbe@bourgeois.com', 'william.barbe@bourgeois.com', 'william.barbe@bourgeois.com', 1, NULL, ';k-d?07', NULL, NULL, NULL, 'a:0:{}', 'Honoré', 'Christophe Gallet', NULL, 'sm', NULL, NULL, NULL),
(165, 'alexandre.fischer@normand.fr', 'alexandre.fischer@normand.fr', 'alexandre.fischer@normand.fr', 'alexandre.fischer@normand.fr', 1, NULL, '_w?wgx+r\":(H', NULL, NULL, NULL, 'a:0:{}', 'Margot', 'Michelle Le Meunier', NULL, 'sm', NULL, NULL, NULL),
(166, 'dcoste@carre.net', 'dcoste@carre.net', 'dcoste@carre.net', 'dcoste@carre.net', 1, NULL, '7b+^V_C+fbZZHM\"', NULL, NULL, NULL, 'a:0:{}', 'Henri', 'Marianne Vallee', NULL, 'sm', NULL, NULL, NULL),
(167, 'anais22@tiscali.fr', 'anais22@tiscali.fr', 'anais22@tiscali.fr', 'anais22@tiscali.fr', 0, NULL, '&hCAZSv*+G8y%=-JSBdn', NULL, NULL, NULL, 'a:0:{}', 'Frédéric', 'Maryse Rossi', NULL, 'sm', NULL, NULL, NULL),
(168, 'raymond36@maurice.fr', 'raymond36@maurice.fr', 'raymond36@maurice.fr', 'raymond36@maurice.fr', 0, NULL, 'M1)!v\"\\-}@?z`LAbW', NULL, NULL, NULL, 'a:0:{}', 'Adèle', 'William de Blondel', NULL, 'sm', NULL, NULL, NULL),
(169, 'jeannine50@ifrance.com', 'jeannine50@ifrance.com', 'jeannine50@ifrance.com', 'jeannine50@ifrance.com', 0, NULL, 'L?fy1McXVP%*', NULL, NULL, NULL, 'a:0:{}', 'Andrée', 'Sophie Guillon', NULL, 'sm', NULL, NULL, NULL),
(170, 'jean14@laposte.net', 'jean14@laposte.net', 'jean14@laposte.net', 'jean14@laposte.net', 0, NULL, 'JIL!;o^<|lAAc;', NULL, NULL, NULL, 'a:0:{}', 'Astrid', 'Catherine Martins', NULL, 'sm', NULL, NULL, NULL),
(171, 'nathalie.barthelemy@ifrance.com', 'nathalie.barthelemy@ifrance.com', 'nathalie.barthelemy@ifrance.com', 'nathalie.barthelemy@ifrance.com', 0, NULL, '?8TbnFNbn\\!n', NULL, NULL, NULL, 'a:0:{}', 'Nath', 'Marine Duval', NULL, 'sm', NULL, NULL, NULL),
(172, 'rlopez@free.fr', 'rlopez@free.fr', 'rlopez@free.fr', 'rlopez@free.fr', 0, NULL, '#r%uC&pH:vc', NULL, NULL, NULL, 'a:0:{}', 'Michelle', 'Pénélope Dijoux', NULL, 'sm', NULL, NULL, NULL),
(173, 'benoit60@voila.fr', 'benoit60@voila.fr', 'benoit60@voila.fr', 'benoit60@voila.fr', 0, NULL, 'xbyg+`o&!/M5', NULL, NULL, NULL, 'a:0:{}', 'William', 'Alice-Gabrielle Nicolas', NULL, 'sm', NULL, NULL, NULL),
(174, 'ngiraud@lopez.com', 'ngiraud@lopez.com', 'ngiraud@lopez.com', 'ngiraud@lopez.com', 1, NULL, '}23sv6SYX0g', NULL, NULL, NULL, 'a:0:{}', 'Guillaume', 'Lorraine Munoz', NULL, 'sm', NULL, NULL, NULL),
(175, 'hhuet@tiscali.fr', 'hhuet@tiscali.fr', 'hhuet@tiscali.fr', 'hhuet@tiscali.fr', 1, NULL, '[{BThC,K;+jWP', NULL, NULL, NULL, 'a:0:{}', 'Charlotte', 'Julien Foucher', NULL, 'sm', NULL, NULL, NULL),
(176, 'hubert.claire@guibert.net', 'hubert.claire@guibert.net', 'hubert.claire@guibert.net', 'hubert.claire@guibert.net', 1, NULL, '0xLxXW.`>z.kx8uwT0:s', NULL, NULL, NULL, 'a:0:{}', 'Suzanne', 'Astrid Guerin', NULL, 'sm', NULL, NULL, NULL),
(177, 'yves.roche@marie.net', 'yves.roche@marie.net', 'yves.roche@marie.net', 'yves.roche@marie.net', 0, NULL, '5Vq[uNV$S#\"k$z', NULL, NULL, NULL, 'a:0:{}', 'Susan', 'Véronique-Pauline Duval', NULL, 'sm', NULL, NULL, NULL),
(178, 'royer.emmanuelle@wanadoo.fr', 'royer.emmanuelle@wanadoo.fr', 'royer.emmanuelle@wanadoo.fr', 'royer.emmanuelle@wanadoo.fr', 1, NULL, 'f9\\h7UipT_,N/~(N7,;', NULL, NULL, NULL, 'a:0:{}', 'Constance', 'Étienne Salmon', NULL, 'sm', NULL, NULL, NULL),
(179, 'arnaude.perrot@fournier.fr', 'arnaude.perrot@fournier.fr', 'arnaude.perrot@fournier.fr', 'arnaude.perrot@fournier.fr', 0, NULL, '?\"u>ahW_P|tut]3=\"zk:', NULL, NULL, NULL, 'a:0:{}', 'Jean', 'Georges Blin', NULL, 'sm', NULL, NULL, NULL),
(180, 'guillet.remy@free.fr', 'guillet.remy@free.fr', 'guillet.remy@free.fr', 'guillet.remy@free.fr', 0, NULL, ':#G&jA3<', NULL, NULL, NULL, 'a:0:{}', 'François', 'Martin Dupuy', NULL, 'sm', NULL, NULL, NULL),
(181, 'stephane.besson@brun.org', 'stephane.besson@brun.org', 'stephane.besson@brun.org', 'stephane.besson@brun.org', 0, NULL, '5}@(@q8miu<', NULL, NULL, NULL, 'a:0:{}', 'Hortense', 'Lucas de Hoarau', NULL, 'sm', NULL, NULL, NULL),
(182, 'margot.martins@free.fr', 'margot.martins@free.fr', 'margot.martins@free.fr', 'margot.martins@free.fr', 1, NULL, 'Ec-z~fJjvo', NULL, NULL, NULL, 'a:0:{}', 'Marcelle', 'Margaud Grenier', NULL, 'sm', NULL, NULL, NULL),
(184, 'cfournier@julien.com', 'cfournier@julien.com', 'cfournier@julien.com', 'cfournier@julien.com', 0, NULL, 'U\'UEU,i|&!u_fqViNg', NULL, NULL, NULL, 'a:0:{}', 'Alice', 'Élise Lemonnier', NULL, 'sm', NULL, NULL, NULL),
(186, 'jerome79@aubert.fr', 'jerome79@aubert.fr', 'jerome79@aubert.fr', 'jerome79@aubert.fr', 0, NULL, '>r*Lm1k0k@r|%%QT5', NULL, NULL, NULL, 'a:0:{}', 'Olivier', 'Diane Jacob', NULL, 'sm', NULL, NULL, NULL),
(187, 'nicole.pruvost@remy.net', 'nicole.pruvost@remy.net', 'nicole.pruvost@remy.net', 'nicole.pruvost@remy.net', 1, NULL, '^OFC6-ckx/=', NULL, NULL, NULL, 'a:0:{}', 'Joséphine', 'Margot Wagner', NULL, 'sm', NULL, NULL, NULL),
(188, 'gilbert93@live.com', 'gilbert93@live.com', 'gilbert93@live.com', 'gilbert93@live.com', 1, NULL, 'o\\YVFoc', NULL, NULL, NULL, 'a:0:{}', 'Marthe', 'André-Xavier Fabre', NULL, 'sm', NULL, NULL, NULL),
(189, 'victoire69@club-internet.fr', 'victoire69@club-internet.fr', 'victoire69@club-internet.fr', 'victoire69@club-internet.fr', 0, NULL, 'flzkZSrE@3Y2Aa`cJ5h^', NULL, NULL, NULL, 'a:0:{}', 'Valérie', 'Denise-Victoire Lebreton', NULL, 'sm', NULL, NULL, NULL),
(190, 'antoinette54@martel.org', 'antoinette54@martel.org', 'antoinette54@martel.org', 'antoinette54@martel.org', 1, NULL, '<MCBQ&Kug<<#WHS3jJc', NULL, NULL, NULL, 'a:0:{}', 'Madeleine', 'Frédérique Gomes', NULL, 'sm', NULL, NULL, NULL),
(191, 'chevallier.josette@couturier.fr', 'chevallier.josette@couturier.fr', 'chevallier.josette@couturier.fr', 'chevallier.josette@couturier.fr', 0, NULL, 'VQ.RO;]a1^iq6q\\PuR\'', NULL, NULL, NULL, 'a:0:{}', 'Geneviève', 'Isaac Pereira', NULL, 'sm', NULL, NULL, NULL),
(192, 'lombard.thomas@lemonnier.org', 'lombard.thomas@lemonnier.org', 'lombard.thomas@lemonnier.org', 'lombard.thomas@lemonnier.org', 1, NULL, 'oD^B@;Q/)g#HH', NULL, NULL, NULL, 'a:0:{}', 'William', 'Madeleine Besnard', NULL, 'sm', NULL, NULL, NULL),
(193, 'aperez@club-internet.fr', 'aperez@club-internet.fr', 'aperez@club-internet.fr', 'aperez@club-internet.fr', 0, NULL, 'B0>]aZ', NULL, NULL, NULL, 'a:0:{}', 'Bernadette', 'Monique du Rodrigues', NULL, 'sm', NULL, NULL, NULL),
(194, 'pschmitt@hotmail.fr', 'pschmitt@hotmail.fr', 'pschmitt@hotmail.fr', 'pschmitt@hotmail.fr', 1, NULL, '\"1iZi}O', NULL, NULL, NULL, 'a:0:{}', 'Hélène', 'Gilles-Henri Guibert', NULL, 'sm', NULL, NULL, NULL),
(195, 'zchretien@sfr.fr', 'zchretien@sfr.fr', 'zchretien@sfr.fr', 'zchretien@sfr.fr', 0, NULL, 'sd?&AlY(zlfM:gz}', NULL, NULL, NULL, 'a:0:{}', 'David', 'François Peltier', NULL, 'sm', NULL, NULL, NULL),
(196, 'bernadette.bertin@dias.org', 'bernadette.bertin@dias.org', 'bernadette.bertin@dias.org', 'bernadette.bertin@dias.org', 1, NULL, '{or>/*?R=YY~uQIvoL', NULL, NULL, NULL, 'a:0:{}', 'Josette', 'Adrien Dupuy', NULL, 'sm', NULL, NULL, NULL),
(197, 'aimee.chevalier@noos.fr', 'aimee.chevalier@noos.fr', 'aimee.chevalier@noos.fr', 'aimee.chevalier@noos.fr', 1, NULL, 'du-5!^8WyuQ', NULL, NULL, NULL, 'a:0:{}', 'William', 'Sophie Delaunay', NULL, 'sm', NULL, NULL, NULL),
(198, 'vaillant.martin@live.com', 'vaillant.martin@live.com', 'vaillant.martin@live.com', 'vaillant.martin@live.com', 0, NULL, 'y4kI!30MEVF([%', NULL, NULL, NULL, 'a:0:{}', 'Étienne', 'Bernadette Noel', NULL, 'sm', NULL, NULL, NULL),
(199, 'philippe.delattre@live.com', 'philippe.delattre@live.com', 'philippe.delattre@live.com', 'philippe.delattre@live.com', 1, NULL, 'M{s)MdG=]8', NULL, NULL, NULL, 'a:0:{}', 'Michelle', 'Yves Vidal', NULL, 'sm', NULL, NULL, NULL),
(200, 'hgosselin@noos.fr', 'hgosselin@noos.fr', 'hgosselin@noos.fr', 'hgosselin@noos.fr', 1, NULL, '}EAe3oww38HUH', NULL, NULL, NULL, 'a:0:{}', 'Antoine', 'Sabine Vallee-Morin', NULL, 'sm', NULL, NULL, NULL),
(201, 'pierre.legall@laposte.net', 'pierre.legall@laposte.net', 'pierre.legall@laposte.net', 'pierre.legall@laposte.net', 0, NULL, ';`%\"33J|!r.wUm.d', NULL, NULL, NULL, 'a:0:{}', 'Vincent', 'Alfred Lombard-Lenoir', NULL, 'sm', NULL, NULL, NULL),
(212, 'ndeyependa.diagne@univ-thies.sn', 'ndeyependa.diagne@univ-thies.sn', 'ndeyependa.diagne@univ-thies.sn', 'ndeyependa.diagne@univ-thies.sn', 1, NULL, '$2y$13$R93U3AvxnSNLJc/3nr/eRuyTl7wPzJj.mVcSM5yM6xEUDXfEuBXo6', NULL, 'a2303d93ce704af9227c39650a9fbfe9', '2020-09-12 15:54:41', 'a:0:{}', 'Ndeye Penda', 'Diagne', '778569856', 'sm', NULL, NULL, 'Développeuse'),
(213, 'aaziz.thiam@univ-thies.sn', 'aaziz.thiam@univ-thies.sn', 'aaziz.thiam@univ-thies.sn', 'aaziz.thiam@univ-thies.sn', 1, NULL, '$2y$13$Bhx/eJPHoyxH52qee3/tBOeZGrjuB8EvLa/1fu/90AVg01w.84xL2', NULL, 'cc74f91983d7a4ae1ad520de0cc7bb23', '2020-09-12 15:56:33', 'a:0:{}', 'Abdou Aziz', 'Thiam', '778569858', 'sm', NULL, NULL, 'Junior Dev');

-- --------------------------------------------------------

--
-- Structure de la table `fos_user_group`
--

DROP TABLE IF EXISTS `fos_user_group`;
CREATE TABLE IF NOT EXISTS `fos_user_group` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `IDX_583D1F3EA76ED395` (`user_id`),
  KEY `IDX_583D1F3EFE54D947` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `fos_user_group`
--

INSERT INTO `fos_user_group` (`user_id`, `group_id`) VALUES
(1, 1),
(3, 4),
(3, 5),
(4, 1),
(5, 1),
(6, 4),
(7, 4),
(8, 1),
(9, 5),
(10, 5),
(13, 5),
(14, 5),
(15, 1),
(16, 4),
(17, 5),
(18, 1),
(19, 1),
(20, 5),
(21, 4),
(22, 5),
(23, 4),
(24, 1),
(25, 5),
(26, 4),
(27, 4),
(28, 5),
(29, 5),
(30, 5),
(31, 5),
(32, 1),
(33, 5),
(34, 1),
(35, 5),
(36, 4),
(37, 5),
(38, 1),
(39, 4),
(40, 4),
(41, 5),
(42, 4),
(43, 5),
(44, 1),
(45, 5),
(46, 5),
(47, 1),
(48, 5),
(49, 1),
(50, 4),
(51, 4),
(52, 5),
(53, 4),
(54, 1),
(55, 1),
(56, 5),
(57, 4),
(58, 4),
(59, 4),
(60, 4),
(61, 5),
(62, 1),
(63, 4),
(64, 1),
(65, 1),
(66, 1),
(67, 5),
(68, 4),
(69, 4),
(70, 1),
(71, 4),
(72, 1),
(73, 4),
(74, 4),
(75, 5),
(76, 5),
(77, 1),
(78, 5),
(79, 5),
(80, 1),
(81, 1),
(82, 5),
(83, 5),
(84, 4),
(85, 4),
(86, 1),
(87, 1),
(88, 4),
(89, 4),
(90, 5),
(91, 5),
(92, 1),
(93, 1),
(94, 5),
(95, 5),
(96, 5),
(97, 1),
(98, 1),
(99, 4),
(100, 4),
(101, 1),
(102, 1),
(103, 1),
(104, 5),
(105, 4),
(106, 1),
(107, 4),
(108, 5),
(109, 1),
(110, 5),
(111, 4),
(112, 1),
(113, 1),
(114, 5),
(115, 4),
(116, 4),
(117, 4),
(118, 5),
(119, 4),
(120, 4),
(121, 5),
(122, 1),
(123, 4),
(124, 5),
(125, 4),
(126, 1),
(127, 4),
(128, 1),
(129, 1),
(130, 1),
(131, 5),
(132, 5),
(133, 4),
(134, 4),
(135, 4),
(136, 1),
(137, 4),
(138, 4),
(139, 5),
(140, 4),
(141, 5),
(142, 4),
(143, 1),
(144, 4),
(145, 5),
(146, 1),
(147, 1),
(148, 1),
(149, 5),
(150, 5),
(151, 1),
(152, 4),
(153, 4),
(154, 5),
(155, 5),
(156, 5),
(157, 1),
(158, 4),
(159, 1),
(160, 5),
(161, 4),
(162, 1),
(163, 4),
(164, 4),
(165, 5),
(166, 4),
(167, 1),
(168, 5),
(169, 1),
(170, 5),
(171, 1),
(172, 5),
(173, 4),
(174, 4),
(175, 5),
(176, 5),
(177, 5),
(178, 1),
(179, 1),
(180, 4),
(181, 5),
(182, 4),
(184, 4),
(186, 4),
(187, 1),
(188, 4),
(189, 1),
(190, 5),
(191, 4),
(192, 5),
(193, 4),
(194, 1),
(195, 1),
(196, 5),
(197, 1),
(198, 1),
(199, 4),
(200, 4),
(201, 5),
(212, 1),
(213, 1);

-- --------------------------------------------------------

--
-- Structure de la table `inputation`
--

DROP TABLE IF EXISTS `inputation`;
CREATE TABLE IF NOT EXISTS `inputation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dossier` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `structure_hospitaliere` int(11) DEFAULT NULL,
  `user_email` varchar(45) NOT NULL COMMENT 'mail de l''utilisateur ayant opéré l''action',
  PRIMARY KEY (`id`),
  KEY `fk_inputation_dossier1_idx` (`dossier`),
  KEY `fk_inputation_structure_hospitaliere1_idx` (`structure_hospitaliere`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `inputation`
--

INSERT INTO `inputation` (`id`, `dossier`, `date`, `structure_hospitaliere`, `user_email`) VALUES
(1, 1, '2020-10-02', 8, 'bamboguirassy');

-- --------------------------------------------------------

--
-- Structure de la table `medicament`
--

DROP TABLE IF EXISTS `medicament`;
CREATE TABLE IF NOT EXISTS `medicament` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(145) NOT NULL,
  `filename` varchar(145) DEFAULT NULL,
  `filepath` varchar(245) DEFAULT NULL,
  `quantite_stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `medicament`
--

INSERT INTO `medicament` (`id`, `nom`, `filename`, `filepath`, `quantite_stock`) VALUES
(1, 'DOLIPRANE', NULL, NULL, 94),
(2, 'EFFERALGAN', NULL, NULL, 99),
(3, 'DAFALGAN', NULL, NULL, 98),
(4, 'LEVOTHYROX', NULL, NULL, 98),
(5, 'IMODIUM', NULL, NULL, 99),
(6, 'KARDEGIC', NULL, NULL, 100),
(7, 'SPASFON', NULL, NULL, 100),
(8, 'SPEDIFEN', NULL, NULL, 97),
(9, 'FORLAX', NULL, NULL, 100),
(10, 'GAVISCON', NULL, NULL, 100),
(11, 'DAFLON', NULL, NULL, 98),
(12, 'RHINOFLUIMUCIL', NULL, NULL, 100),
(13, 'INEXIUM', NULL, NULL, 100),
(14, 'AUGMENTIN', NULL, NULL, 100),
(15, 'PROPOFAN', NULL, NULL, 100);

-- --------------------------------------------------------

--
-- Structure de la table `medicament_reception`
--

DROP TABLE IF EXISTS `medicament_reception`;
CREATE TABLE IF NOT EXISTS `medicament_reception` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medicament` int(11) DEFAULT NULL,
  `bon_reception` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_medicament_has_bon_reception_bon_reception1_idx` (`bon_reception`),
  KEY `fk_medicament_has_bon_reception_medicament1_idx` (`medicament`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `medicament_remis`
--

DROP TABLE IF EXISTS `medicament_remis`;
CREATE TABLE IF NOT EXISTS `medicament_remis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consultation` int(11) DEFAULT NULL,
  `medicament` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_medicament_consultation_consultation1_idx` (`consultation`),
  KEY `fk_medicament_consultation_medicament1_idx` (`medicament`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
CREATE TABLE IF NOT EXISTS `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migration_versions`
--

INSERT INTO `migration_versions` (`version`, `executed_at`) VALUES
('20200910151726', '2020-09-10 15:18:03'),
('20200912122950', '2020-09-12 12:30:49'),
('20200912123330', '2020-09-12 12:33:37');

-- --------------------------------------------------------

--
-- Structure de la table `pathologie`
--

DROP TABLE IF EXISTS `pathologie`;
CREATE TABLE IF NOT EXISTS `pathologie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `pathologie`
--

INSERT INTO `pathologie` (`id`, `nom`, `description`) VALUES
(1, 'Paludisme', NULL),
(2, 'Grippe', NULL),
(3, 'BPP', NULL),
(4, 'Path Digest', NULL),
(5, 'Path ORL', NULL),
(6, 'HTA', NULL),
(7, 'cardio', NULL),
(8, 'dermato', NULL),
(9, 'ophta', NULL),
(10, 'ortho', NULL),
(11, 'GINECO', NULL),
(12, 'URO', NULL),
(13, 'DIABETE', NULL),
(14, 'STOMATO', NULL),
(15, 'AUTRES', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `rendez_vous`
--

DROP TABLE IF EXISTS `rendez_vous`;
CREATE TABLE IF NOT EXISTS `rendez_vous` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_creation` datetime NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `date_rendez_vous` datetime NOT NULL,
  `presence` tinyint(1) DEFAULT NULL COMMENT 'false par défaut, on le met à true si le patient se présente.',
  `dossier` int(11) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `fk_rendez-vous_dossier1_idx` (`dossier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `repos_medical`
--

DROP TABLE IF EXISTS `repos_medical`;
CREATE TABLE IF NOT EXISTS `repos_medical` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dossier` int(11) NOT NULL,
  `date` date NOT NULL,
  `nombre_jour` int(11) DEFAULT NULL,
  `docteur` int(11) NOT NULL COMMENT 'docteur ayant prescrit le repos medical',
  `user_email` varchar(45) NOT NULL COMMENT 'mail de l''utilisateur ayant opéré l''action',
  PRIMARY KEY (`id`),
  KEY `fk_repos_medical_dossier1_idx` (`dossier`),
  KEY `fk_repos_medical_docteur1_idx` (`docteur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `repos_medical`
--

INSERT INTO `repos_medical` (`id`, `dossier`, `date`, `nombre_jour`, `docteur`, `user_email`) VALUES
(1, 1, '2020-10-02', 5, 4, 'bamboguirassy');

-- --------------------------------------------------------

--
-- Structure de la table `structure_partenaire`
--

DROP TABLE IF EXISTS `structure_partenaire`;
CREATE TABLE IF NOT EXISTS `structure_partenaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(145) NOT NULL,
  `adresse` text,
  `telephone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `structure_partenaire`
--

INSERT INTO `structure_partenaire` (`id`, `nom`, `adresse`, `telephone`) VALUES
(8, 'Clinique Visio-Médical Coumba', 'Mbour 3, prés de la rte Thiès-Sindia', '339810001'),
(9, 'Hopital Régional de Thiès', NULL, NULL),
(10, 'Hopital Principal de Dakar', NULL, '338541258'),
(11, 'Hopital Saint Jean de Dieu de Thiès', 'HLM Thialy', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `symptome`
--

DROP TABLE IF EXISTS `symptome`;
CREATE TABLE IF NOT EXISTS `symptome` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consultation` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_symptome_consultation1_idx` (`consultation`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `symptome`
--

INSERT INTO `symptome` (`id`, `consultation`, `nom`) VALUES
(1, 13, 'Toux'),
(2, 13, 'Mal de tête');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `consultation`
--
ALTER TABLE `consultation`
  ADD CONSTRAINT `fk_consultation_docteur1` FOREIGN KEY (`docteur`) REFERENCES `docteur` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_consultation_dossier` FOREIGN KEY (`dossier`) REFERENCES `dossier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_consultation_pathologie1` FOREIGN KEY (`pathologie_diagnostiquee`) REFERENCES `pathologie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `fos_user_group`
--
ALTER TABLE `fos_user_group`
  ADD CONSTRAINT `FK_583D1F3EA76ED395` FOREIGN KEY (`user_id`) REFERENCES `fos_user` (`id`),
  ADD CONSTRAINT `FK_583D1F3EFE54D947` FOREIGN KEY (`group_id`) REFERENCES `fos_group` (`id`);

--
-- Contraintes pour la table `inputation`
--
ALTER TABLE `inputation`
  ADD CONSTRAINT `fk_inputation_dossier1` FOREIGN KEY (`dossier`) REFERENCES `dossier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_inputation_structure_hospitaliere1` FOREIGN KEY (`structure_hospitaliere`) REFERENCES `structure_partenaire` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `medicament_reception`
--
ALTER TABLE `medicament_reception`
  ADD CONSTRAINT `fk_medicament_has_bon_reception_bon_reception1` FOREIGN KEY (`bon_reception`) REFERENCES `bon_reception` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_medicament_has_bon_reception_medicament1` FOREIGN KEY (`medicament`) REFERENCES `medicament` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `medicament_remis`
--
ALTER TABLE `medicament_remis`
  ADD CONSTRAINT `fk_medicament_consultation_consultation1` FOREIGN KEY (`consultation`) REFERENCES `consultation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_medicament_consultation_medicament1` FOREIGN KEY (`medicament`) REFERENCES `medicament` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD CONSTRAINT `fk_rendez-vous_dossier1` FOREIGN KEY (`dossier`) REFERENCES `dossier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `repos_medical`
--
ALTER TABLE `repos_medical`
  ADD CONSTRAINT `fk_repos_medical_docteur1` FOREIGN KEY (`docteur`) REFERENCES `docteur` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_repos_medical_dossier1` FOREIGN KEY (`dossier`) REFERENCES `dossier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `symptome`
--
ALTER TABLE `symptome`
  ADD CONSTRAINT `fk_symptome_consultation1` FOREIGN KEY (`consultation`) REFERENCES `consultation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

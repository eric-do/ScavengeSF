-- MySQL dump 10.13  Distrib 5.7.25, for osx10.14 (x86_64)
--
-- Host: localhost    Database: mvp
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `achievements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `code` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
INSERT INTO `achievements` VALUES (1,'San Francisco Visitor','Answered 1 question about San Francisco','sfvisitor'),(2,'San Francisco Explorer','Answered 5 questions about San Francisco','sfexplorer'),(3,'San Francisco Expert','Answered 10 questions about San Francisco','sfexpert'),(4,'Tokyo Visitor','Answered 1 question about Tokyo','tokvisitor'),(5,'Tokyo Explorer','Answered 5 questions about Tokyo','tokexplorer'),(6,'Tokyo Expert','Answered 10 questions about Tokyo','tokexpert'),(7,'Rome Visitor','Answered 1 question about Rome','romvisitor'),(8,'Rome Explorer','Answered 5 questions about Rome','romexplorer'),(9,'Rome Expert','Answered 10 questions about Rome','romexpert'),(10,'Ho Chi Minh City Visitor','Answered 1 question about Ho Chi Minh City','hcmcvisitor'),(11,'Ho Chi Minh City Expert','Answered 10 questions about Ho Chi Minh City','hcmcexpert');
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `correct` tinyint(1) NOT NULL,
  `questionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'Red',1,1),(2,'Blue',0,1),(3,'Gold',0,1),(4,'Green',0,1),(5,'4',0,2),(6,'2',1,2),(7,'3',0,2),(8,'1',0,2),(9,'Mission Street',0,3),(10,'Geary Boulevard',0,3),(11,'3rd Street',1,3),(12,'The Embarcadero',0,3),(13,'1845',0,4),(14,'1911',0,4),(15,'1736',0,4),(16,'1753',1,4),(17,'Mission Street',0,5),(18,'Geary Boulevard',0,5),(19,'3rd Street',0,5),(20,'The Embarcadero',1,5),(21,'Bow and arrow',1,6),(22,'An explorer',0,6),(23,'A child',0,6),(24,'A ship',0,6),(25,'A triceratops',0,7),(26,'A wooly mammoth',0,7),(27,'A T-rex',1,7),(28,'A tiger',0,7),(36,'The Angels',0,9),(37,'The Raiders',0,9),(38,'The Giants',1,9),(39,'The Red Sox',0,9),(40,'One',1,NULL),(41,'Two',0,NULL),(62,'One',0,NULL),(67,'Answer 1',0,NULL),(68,'Answer 2',1,NULL),(69,'Answer 3',0,NULL),(70,'Answer 4',0,NULL),(75,'Answer 1',0,NULL),(76,'Answer 2',1,NULL),(77,'Answer 3',0,NULL),(78,'Answer 4',0,NULL),(79,'One',1,NULL),(80,'One',1,NULL),(81,'Two',1,NULL);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `landmarks`
--

DROP TABLE IF EXISTS `landmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `landmarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `locationId` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `locationId` (`locationId`),
  CONSTRAINT `landmarks_ibfk_1` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landmarks`
--

LOCK TABLES `landmarks` WRITE;
/*!40000 ALTER TABLE `landmarks` DISABLE KEYS */;
INSERT INTO `landmarks` VALUES (1,'Golden Gate Bridge',1,'/images/landmarks/goldengate.jpg'),(2,'SF MOMA',1,'/images/landmarks/sfmoma.jpg'),(3,'Dolores Park',1,'/images/landmarks/dolores.jpeg'),(4,'Ferry Building',1,'/images/landmarks/ferrybuilding.jpg'),(5,'Academy of Sciences',1,'/images/landmarks/calacademy.jpg'),(6,'Oracle Park',1,'/images/landmarks/oraclepark.jpg'),(7,'Shinjuku Goen National Garden',2,'/images/landmarks/shinjukugoen.jpg'),(8,'Meiji Jingu Shrine',2,'/images/landmarks/meiji.jpg'),(9,'Tokyo Skytree',2,'/images/landmarks/skytree.jpg'),(10,'Pantheon',3,'/images/landmarks/pantheon.jpeg'),(11,'Colosseum',3,'/images/landmarks/colosseum.jpg'),(14,'Ho Chi Minh Square',4,'/images/landmarks/hcmc_square.jpg');
/*!40000 ALTER TABLE `landmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `code` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'San Francisco','/images/locations/sanfrancisco.jpg','sf'),(2,'Tokyo','/images/locations/tokyo.jpg','tok'),(3,'Rome','/images/locations/rome.jpg','rom'),(4,'Ho Chi Minh City','/images/locations/hcmc.jpg','hcmc');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `rating` float DEFAULT NULL,
  `landmarkId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `landmarkId` (`landmarkId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`landmarkId`) REFERENCES `landmarks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'What color is the Golden Gate Bridge?',5,1),(2,'How many arches are in the Golden Gate?',4.1,1),(3,'On what street is SF MOMA located?',3,2),(4,'Find the Miguel Hidalgo monument. What is his birth year?',2,3),(5,'On what street is the Ferry Building located?',1,4),(6,'What shape is the momument on Embarcadero and Howard?',5,4),(7,'What animal is the giant skeleton of in the main lobby?',4,5),(9,'Oracle park is home to what baseball team?',3,6),(10,'Which of the following is not one of the 3 park gates?',2,7),(11,'How many rows of sake barrels are there near the park entrance?',1,8),(12,'Which is taller: Tokyo Skytree or Tokyo Tower?',5,9),(13,'What in inscribed on the front of the Pantheon?',4,10),(14,'Which of the painters below has a tomb in the Pantheon?',3,10),(15,'How many rows of windows are there in the Colosseum?',2,11),(17,'What district is Ho Chi Minh Square located?',1,14);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_achievements`
--

DROP TABLE IF EXISTS `user_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_achievements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `achievementId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_achievements`
--

LOCK TABLES `user_achievements` WRITE;
/*!40000 ALTER TABLE `user_achievements` DISABLE KEYS */;
INSERT INTO `user_achievements` VALUES (1,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1);
/*!40000 ALTER TABLE `user_achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_questions`
--

DROP TABLE IF EXISTS `user_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `questionId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_questions`
--

LOCK TABLES `user_questions` WRITE;
/*!40000 ALTER TABLE `user_questions` DISABLE KEYS */;
INSERT INTO `user_questions` VALUES (1,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(2,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',7),(3,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(4,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(5,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(6,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(7,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(8,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(9,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(10,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',2),(11,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(13,'\'!(0)',1),(17,'\'!(0)',1),(21,'\'!(0)',1),(25,'\'!(0)',1),(29,'\'!(0)',1),(33,'\'!(0)',1),(37,'\'!(0)',1),(40,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1),(41,'28BFM2Ts34Y5fBHiH2XLFpj9YWw1',1);
/*!40000 ALTER TABLE `user_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_votes`
--

DROP TABLE IF EXISTS `user_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `questionId` int(11) NOT NULL,
  `direction` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=700 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_votes`
--

LOCK TABLES `user_votes` WRITE;
/*!40000 ALTER TABLE `user_votes` DISABLE KEYS */;
INSERT INTO `user_votes` VALUES (123,'1',1,1),(214,'1',3,1),(215,'1',2,1),(216,'1',4,1),(241,'1',5,-1),(656,'1',7,1),(699,'[object Object]',1,1);
/*!40000 ALTER TABLE `user_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `uid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ericdo.617@gmail.com',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-27 12:04:20

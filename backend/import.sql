INSERT INTO locations (name)
VALUES 'San Francisco';

INSERT INTO locations (name)
VALUES 'Tokyo';

INSERT INTO locations (name)
VALUES 'Rome';

INSERT INTO locations (name)
VALUES 'Hanoi';

-- SAN FRANCISCO
INSERT INTO landmarks (locationId, name) VALUES (1, "Golden Gate Bridge");
INSERT INTO landmarks (locationId, name) VALUES (1, "SF MOMA");
INSERT INTO landmarks (locationId, name) VALUES (1, "Delores Park");
INSERT INTO landmarks (locationId, name) VALUES (1, "Ferry Building");
INSERT INTO landmarks (locationId, name) VALUES (1, "Academy of Sciences");
INSERT INTO landmarks (locationId, name) VALUES (1, "Oracle Park");

-- TOKYO
INSERT INTO landmarks (locationId, name) VALUES (2, "Shinjuku Goen National Garden");
INSERT INTO landmarks (locationId, name) VALUES (2, "Meiji Jingu Shrine");
INSERT INTO landmarks (locationId, name) VALUES (2, "Tokyo Skytree");

-- ROME
INSERT INTO landmarks (locationId, name) VALUES (3, "Pantheon");
INSERT INTO landmarks (locationId, name) VALUES (3, "Colosseum");
INSERT INTO landmarks (locationId, name) VALUES (3, "Basilica di Santa Maria Maggiore");

-- HO CHI MINH CITY
INSERT INTO landmarks (locationId, name) VALUES (4, "Ben Thanh Street Food Market");
INSERT INTO landmarks (locationId, name) VALUES (4, "Ho Chi Minh Square");

-- SAN FRANCISCO
INSERT INTO questions (landmarkId, text) VALUES (1, "What color is the Golden Gate Bridge?");
INSERT INTO questions (landmarkId, text) VALUES (1, "How many arches are in the Golden Gate?");
INSERT INTO questions (landmarkId, text) VALUES (2, "On what street is SF MOMA located?");
INSERT INTO questions (landmarkId, text) VALUES (3, "Find the Miguel Hidalgo monument. What is his birth year?");
INSERT INTO questions (landmarkId, text) VALUES (4, "On what street is the Ferry Building located?");
INSERT INTO questions (landmarkId, text) VALUES (4, "What shape is the momument on Embarcadero and Howard?");
INSERT INTO questions (landmarkId, text) VALUES (5, "What animal is the giant skeleton of in the main lobby?");
INSERT INTO questions (landmarkId, text) VALUES (5, "What animal is the giant skeleton of in the main lobby?");
INSERT INTO questions (landmarkId, text) VALUES (6, "Oracle park is home to what baseball team?");

-- TOKYO
INSERT INTO questions (landmarkId, text) VALUES (7, "Which of the following is not one of the 3 park gates?");
INSERT INTO questions (landmarkId, text) VALUES (8, "How many rows of sake barrels are there near the park entrance?");
INSERT INTO questions (landmarkId, text) VALUES (9, "Which is taller: Tokyo Skytree or Tokyo Tower?");

-- ROME
INSERT INTO questions (landmarkId, text) VALUES (10, "What in inscribed on the front of the Pantheon?");
INSERT INTO questions (landmarkId, text) VALUES (10, "Which of the painters below has a tomb in the Pantheon?");
INSERT INTO questions (landmarkId, text) VALUES (11, "How many rows of windows are there in the Colosseum?");
INSERT INTO questions (landmarkId, text) VALUES (12, "On what street is the Basilica located?");

-- VIETNAM
INSERT INTO questions (landmarkId, text) VALUES (14, "What district is Ho Chi Minh Square located?");

-- QUESTIONS
INSERT INTO answers (questionId, text, correct) VALUES (1, "Red", 1);
INSERT INTO answers (questionId, text, correct) VALUES (1, "Blue", 0);
INSERT INTO answers (questionId, text, correct) VALUES (1, "Gold", 0);
INSERT INTO answers (questionId, text, correct) VALUES (1, "Green", 0);

INSERT INTO answers (questionId, text, correct) VALUES (2, "4", 0);
INSERT INTO answers (questionId, text, correct) VALUES (2, "2", 1);
INSERT INTO answers (questionId, text, correct) VALUES (2, "3", 0);
INSERT INTO answers (questionId, text, correct) VALUES (2, "1", 0);

INSERT INTO answers (questionId, text, correct) VALUES (3, "Mission Street", 0);
INSERT INTO answers (questionId, text, correct) VALUES (3, "Geary Boulevard", 0);
INSERT INTO answers (questionId, text, correct) VALUES (3, "3rd Street", 1);
INSERT INTO answers (questionId, text, correct) VALUES (3, "The Embarcadero", 0);

INSERT INTO answers (questionId, text, correct) VALUES (4, "1845", 0);
INSERT INTO answers (questionId, text, correct) VALUES (4, "1911", 0);
INSERT INTO answers (questionId, text, correct) VALUES (4, "1736", 0);
INSERT INTO answers (questionId, text, correct) VALUES (4, "1753", 1);

INSERT INTO answers (questionId, text, correct) VALUES (5, "Mission Street", 0);
INSERT INTO answers (questionId, text, correct) VALUES (5, "Geary Boulevard", 0);
INSERT INTO answers (questionId, text, correct) VALUES (5, "3rd Street", 0);
INSERT INTO answers (questionId, text, correct) VALUES (5, "The Embarcadero", 1);

INSERT INTO answers (questionId, text, correct) VALUES (6, "Bow and arrow", 1);
INSERT INTO answers (questionId, text, correct) VALUES (6, "An explorer", 0);
INSERT INTO answers (questionId, text, correct) VALUES (6, "A child", 0);
INSERT INTO answers (questionId, text, correct) VALUES (6, "A ship", 0);

INSERT INTO answers (questionId, text, correct) VALUES (7, "A triceratops", 0);
INSERT INTO answers (questionId, text, correct) VALUES (7, "A wooly mammoth", 0);
INSERT INTO answers (questionId, text, correct) VALUES (7, "A T-rex", 1);
INSERT INTO answers (questionId, text, correct) VALUES (7, "A tiger", 0);

INSERT INTO answers (questionId, text, correct) VALUES (9, "The Angels", 0);
INSERT INTO answers (questionId, text, correct) VALUES (9, "The Raiders", 0);
INSERT INTO answers (questionId, text, correct) VALUES (9, "The Giants", 1);
INSERT INTO answers (questionId, text, correct) VALUES (9, "The Red Sox", 0);

-- ACHIEVEMENTS
INSERT INTO achievements (name, description, count) VALUES ("SF Visitor", "Answer 1 question about San Francisco", 1);
INSERT INTO achievements (name, description, count) VALUES ("SF Explorer", "Answer 5 questions about San Francisco", 5);

-- IMAGES
UPDATE landmarks SET url = "/images/locations/goldengate.jpg"
WHERE id = 1;
UPDATE landmarks SET url = "/images/locations/sfmoma.jpg"
WHERE id = 2;
UPDATE landmarks SET url = "/images/locations/dolores.jpeg"
WHERE id = 3;
UPDATE landmarks SET url = "/images/locations/ferrybuilding.jpg"
WHERE id = 4;
UPDATE landmarks SET url = "/images/locations/calacademy.jpg"
WHERE id = 5;
UPDATE landmarks SET url = "/images/locations/oraclepark.jpg"
WHERE id = 6;
UPDATE landmarks SET url = "/images/locations/shinjukugoen.jpg"
WHERE id = 7;
UPDATE landmarks SET url = "/images/locations/meiji.jpg"
WHERE id = 8;
UPDATE landmarks SET url = "/images/locations/skytree.jpg"
WHERE id = 9;
UPDATE landmarks SET url = "/images/locations/pantheon.jpeg"
WHERE id = 10;
UPDATE landmarks SET url = "/images/locations/colosseum.jpg"
WHERE id = 11;
UPDATE landmarks SET url = "/images/locations/basilica_maggiore.jpg"
WHERE id = 12;
UPDATE landmarks SET url = "/images/locations/ben_thanh.jpg"
WHERE id = 13;
UPDATE landmarks SET url = "/images/locations/hcmc_square.jpg"
WHERE id = 14;

-- QUESTION SCORES
UPDATE questions SET points = 5 WHERE id = 1;
UPDATE questions SET points = 4 WHERE id = 2;
UPDATE questions SET points = 3 WHERE id = 3;
UPDATE questions SET points = 2 WHERE id = 4;
UPDATE questions SET points = 1 WHERE id = 5;
UPDATE questions SET points = 5 WHERE id = 6;
UPDATE questions SET points = 4 WHERE id = 7;
UPDATE questions SET points = 3 WHERE id = 9;
UPDATE questions SET points = 2 WHERE id = 10;
UPDATE questions SET points = 1 WHERE id = 11;
UPDATE questions SET points = 5 WHERE id = 12;
UPDATE questions SET points = 4 WHERE id = 13;
UPDATE questions SET points = 3 WHERE id = 14;
UPDATE questions SET points = 2 WHERE id = 15;
UPDATE questions SET points = 1 WHERE id = 17;
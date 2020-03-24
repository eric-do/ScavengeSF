# Scavenger: Gamified Traveling
Scavenger is a mobile app for travelers who love learning more about their destinations.

Scavenger allows users to:
- Answer user curated trivia (scavenger hunts) about different locations
- Submit their own questions
- Upvote/downvote questions
- Win achievements as they become more acquainted with destinations by discovering more answers to questions

## Screenshots
### Login
![Login](screenshots/login.png)

### Home
![Home](screenshots/home.png)

### Landmarks
![Landmarks](screenshots/landmarks.png)

### Question list
![Questions](screenshots/questions.png)

### Question
![Questions](screenshots/question.png)

### Achievements
![Achievements](screenshots/achievements.png)

## Demo clip
Youtube link:
[![Video demo](https://img.youtube.com/vi/1zscktsyVi4/1.jpg)](https://youtu.be/1zscktsyVi4)

## Testing
### Backend
From /backend directory:
```sh
npm test
```

Current status:
```sh
------------------------------------|----------|----------|----------|----------|-------------------|
File                                |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------------------------|----------|----------|----------|----------|-------------------|
All files                           |    86.41 |      100 |    87.18 |    86.26 |                   |
 backend                            |       75 |      100 |        0 |       75 |                   |
  firebase.js                       |       75 |      100 |        0 |       75 |              9,10 |
 backend/db                         |       96 |      100 |        0 |       96 |                   |
  index.js                          |       96 |      100 |        0 |       96 |                13 |
 backend/server/controllers         |    62.71 |      100 |       75 |    62.71 |                   |
  index.js                          |    62.71 |      100 |       75 |    62.71 |... 76,77,78,79,81 |
 backend/server/models              |      100 |      100 |      100 |      100 |                   |
  index.js                          |      100 |      100 |      100 |      100 |                   |
 backend/server/models/achievements |      100 |      100 |      100 |      100 |                   |
  LocationAwarder.js                |      100 |      100 |      100 |      100 |                   |
  index.js                          |      100 |      100 |      100 |      100 |                   |
------------------------------------|----------|----------|----------|----------|-------------------|
```

## Installing and running the application
### Front End

From project directory
```sh
npm install
npm start
```

Install Expo:
1. Install Expo on mobile device
2. From mobile device, go to provided Expo URL

### Back end
Go to /backend

Install dependencies
```sh
npm install
```

Import schema to MySQL DB
```sh
mysql -u root -p < schema.sql
```

Start server 
```sh
npm start
```
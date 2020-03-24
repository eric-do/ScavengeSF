const express = require('express');
const path = require('path');
const parser = require('body-parser');
const { getLocations, getLandmarks, 
        getQuestions, getAnswers, 
        updateUserQuestions, getUserAchievements, getAchievements,
        addUserVote, getUserVote,
        getUpvotes, getDownvotes, validateUser, addQuestion } = require("./controllers");

const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));

// ROUTES
app.get('/locations', (req, res) => {
  getLocations(req, res);
});

app.get('/landmarks', (req, res) => {
  getLandmarks(req, res);
});

app.get('/questions', (req, res) => {
  getQuestions(req, res);
});

app.get('/answers', (req, res) => {
  getAnswers(req, res);
});

app.post('/questions', (req, res) => {
  updateUserQuestions(req, res);
});

app.get('/achievements', async (req, res) => {
  getAchievements(req, res);
});

app.post('/vote', (req, res) => {
  addUserVote(req, res);
})

app.get('/get_vote', (req, res) => {
  getUserVote(req, res);
});

app.get('/upvotes', (req, res) => {
  getUpvotes(req, res);
});

app.get('/downvotes', (req, res) => {
  getDownvotes(req, res);
});

app.post('/users/questions', (req, res) => {
  addQuestion(req, res);
})

app.get('/validate-user', (req, res) => {
  validateUser(req, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

// LISTENER
app.listen(port, () => {
  console.log(`Listning on port ${port}`);
});
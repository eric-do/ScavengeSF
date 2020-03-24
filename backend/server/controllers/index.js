const { admin, getUserId } = require('../../firebase.js');
const Models = require('../models');
const Achievements = require('../models/achievements');
const LocationAwarder = require('../models/achievements/LocationAwarder');

module.exports = {

  validateUser: async (req, res) => {
    const { token } = req.query;
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.send({ uid: decodedToken.uid });
  },

  getLocations: async (req, res) => {
    const locations = await Models.getLocations();
    res.send(locations);
  },

  getLandmarks: async (req, res) => {
    const locationId = req.query.id;
    try {
      const landmarks = await Models.getLandmarks(locationId);
      res.send(landmarks);
    } catch (e) {
      console.error(e);
      res.send([]);
    }
  },

  getQuestions: async (req, res) => {
    const landmarkId = req.query.id;
    try {
      const questions = await Models.getQuestions(landmarkId);
      res.send(questions);
    } catch (e) {
      console.error(e);
      res.send([]);
    }
  },

  addQuestion: async (req, res) => {
    try {
      const { text, answers, landmarkId } = req.body;
      const questionId = await Models.addQuestion(text, landmarkId);
      await Models.addAnswers(answers, questionId);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  },

  getAnswers: async (req, res) => {
    const questionId = req.query.id;
    try {
      const answers = await Models.getAnswers(questionId);
      res.send(answers);
    } catch (e) {
      console.error(e);
      res.send([]);
    }
  },

  updateUserQuestions: async (req, res) => {
    try {
      const userId = await getUserId(req.body.token);
      const { questionId } = req.body;
      await Models.updateUserQuestions(userId, questionId);
      const newAchievements = await LocationAwarder.getAnyNewAchievements(userId);
      res.send(newAchievements);
    } catch (e) {
      console.error(e);
    }
  },

  getAchievements: async (req, res) => {
    try {
      const userId = await getUserId(req.query.token);
      const achievements = await Achievements.getUserAchievements(userId);
      res.send(achievements);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  addUserVote: async (req, res) => {
    const { userId, questionId } = req.body;
    const direction = parseInt(req.body.direction);
    const newDirection = await Models.addUserVote(userId, questionId, direction);
    
    res.send({ direction: newDirection });
  },

  getUserVote: async (req, res) => {
    const { userId, questionId } = req.query;
    const userVote = await Models.getUserVote(userId, questionId);
    res.send(userVote);
  },

  getUpvotes: async (req, res) => {
    const { questionId } = req.query;
    const upvotes = await Models.getUpvotes(questionId);
    res.send(upvotes);
  },

  getDownvotes: async (req, res) => {
    const { questionId } = req.query;
    const downvotes = await Models.getDownvotes(questionId);
    res.send(downvotes);
  },
};

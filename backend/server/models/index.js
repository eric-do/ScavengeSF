const {
  User,
  Location,
  Landmark,
  Question,
  Answer,
  Achievement,
  UserQuestions,
  Vote,
  sequelize,
  Op
} = require("../../db");

module.exports = {
  /**
   * This function adds a mapping for userId and questionId to the DB
   * @param { String } userId 
   * @param { Number } questionId
   * @return nothing
   */
  updateUserQuestions: async (userId, questionId) => {
    const insertQuery = `INSERT INTO user_questions (userId, questionId)
                         VALUES (:userId, :questionId)`;
    await sequelize.query(insertQuery, {
      replacements: { userId, questionId }
    });
  },

  /**
   * Get an array of questions for a given user
   * @param { String } userId
   * @return { Array } 
   */
  getUserQuestions: async userId => {
    const query = `SELECT uq.userId, l.locationId, loc.name AS location, 
                          q.landmarkId, uq.questionId
                   FROM user_questions AS uq
                   INNER JOIN questions AS q
                   ON uq.questionId = q.id
                   INNER JOIN landmarks AS l
                   ON q.landmarkId = l.id
                   INNER JOIN locations AS loc
                   ON l.locationId = loc.id
                   WHERE uq.userId = :user`;

    const userQuestions = await sequelize.query(query, {
      replacements: { user: userId },
      type: sequelize.QueryTypes.SELECT
    });
    return userQuestions;
  },

  /** 
   * @return { Array } an array of locations
   */
  getLocations: async () => Location.findAll(),

  /**
   * This function gets an array of landmarks for a given location
   * @param { Number } locationId
   * @return { Array } of landmarks
   */
  getLandmarks: async locationId => {
    return await Landmark.findAll({
      include: {
        model: Location,
        where: { id: locationId }
      }
    });
  },

  /**
   * This function gets a list of questions for a given landmark
   * @param { Number } landmarkId
   * @return { Array } of questions
   */
  getQuestions: async landmarkId => {
    const query = `SELECT question.id, question.text, 
                          question.rating, question.landmarkId, 
                          landmark.name, landmark.url, 
                          landmark.locationId
                   FROM questions AS question INNER JOIN landmarks AS landmark 
                   ON question.landmarkId = landmark.id AND landmark.id = :landmarkId;`;
    return await sequelize.query(query, {
      replacements: { landmarkId },
      type: sequelize.QueryTypes.SELECT
    });
  },

  /**
   * This function gets all answers for a given question.
   * @param { Number } questionId
   * @return { Array } answers
   */
  getAnswers: async questionId => {
    return await Answer.findAll({ where: { questionId } });
  },

  /**
   * This function adds a new question to the DB.
   * @param { String } text - the question text
   * @param { Number } landmarkId
   * @return { Number } questionId
   */
  addQuestion: async (text, landmarkId) => {
    const insertQuestion = `INSERT INTO questions (text, landmarkId) 
                            VALUES (:text, :landmarkId)`;

    const [questionId, metadata] = await sequelize.query(insertQuestion, {
      replacements: { text, landmarkId },
      type: sequelize.QueryTypes.INSERT
    });
    
    return questionId;
  },

  /**
   * This function takes an array of answers and the questionId for the question
   * they belong to, and inserts all answers into the db.
   * @param { Array } answers - an array of answer objects
   * @param { Number } questionId
   * @return nothing
   */
  addAnswers: async (answers, questionId) => {
    const insertAnswers = `INSERT INTO answers (text, correct, questionId) 
                           VALUES (:text, :correct, :questionId)`;
    await Promise.all(
      answers.map(async answer =>
        sequelize.query(insertAnswers, {
          replacements: {
            text: answer.text,
            correct: answer.correct,
            questionId
          }
        })
      )
    );
  },

  /**
   * This function updates the user's vote for a given question.
   * If a previous vote exists and it's in the same direction as the new vote,
   * the vote is set to 0 (neither upvoted nor downvoted).
   * @param { String } userId
   * @param { Number } questionId
   * @param { Number } direction
   * @return { Number } direction - the updated direction of the user's vote
   */
  addUserVote: async (userId, questionId, direction) => {
    const findQuery = `SELECT * FROM user_votes
                       WHERE userId = :userId
                       AND questionId = :questionId`;

    const updateQuery = `UPDATE user_votes 
                         SET direction = :direction
                         WHERE userId = :userId
                         AND questionId = :questionId`;

    const insertQuery = `INSERT INTO user_votes
                         (userId, questionId, direction)
                         VALUES (:userId, :questionId, :direction)`;

    const existingData = await sequelize.query(findQuery, {
      replacements: { userId, questionId },
      type: sequelize.QueryTypes.SELECT
    });

    if (existingData.length > 0) {
      if (existingData[0].direction === direction) {
        direction = 0;
      }
      await sequelize.query(updateQuery, {
        replacements: { userId, direction, questionId }
      });
    } else {
      await sequelize.query(insertQuery, {
        replacements: { userId, questionId, direction }
      });
    }
    return direction;
  },

  getUserVote: async (userId, questionId) => {
    const query = `SELECT * FROM user_votes
                   WHERE userId = :userId
                   AND questionID = :questionId`;

    const userVotes = await sequelize.query(query, {
      replacements: { userId, questionId },
      type: sequelize.QueryTypes.SELECT
    });
    return userVotes[0] ? userVotes[0] : { direction: 0 };
  },

  /**
   * This function sums the total upvotes for a given question
   * @param { Number } questionId
   * @return { NUmber } sum of upvotes
   */
  getUpvotes: async questionId => {
    const query = `SELECT SUM(direction) AS upvotes
                   FROM user_votes
                   WHERE direction > 0
                   AND questionId = :questionId`;

    const sum = await sequelize.query(query, {
      replacements: { questionId }
    });
    return sum[0][0];
  },

  /**
   * This function sums the total downvotes for a given question
   * @param { Number } questionId
   * @return { NUmber } sum of downvotes
   */
  getDownvotes: async questionId => {
    const query = `SELECT SUM(direction) AS downvotes
                   FROM user_votes
                   WHERE direction < 0
                   AND questionId = :questionId`;

    const sum = await sequelize.query(query, {
      replacements: { questionId }
    });

    return { downvotes: Math.abs(sum[0][0].downvotes) };
  }
};

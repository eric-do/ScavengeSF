const { sequelize } = require("../../../db");
const {
  getUserAchievements,
  getNewAchievements,
  awardAchievements
} = require("./");

/**
 * Input: userId
 * Output: array of newly added achievements
 * Constraints: none
 * Edge cases: no qualifying achievements
 * @param {String} userId
 * @return {Array} an array of new achievements for the user
 */
const getAnyNewAchievements = async userId => {
  try {
    const sumsOfLocationQuestions = await getSumOfAnsweredQuestions(userId);
    const qualifyingAchievements = await getQualifyingAchievements(
      sumsOfLocationQuestions
    );
    const userAchievements = await getUserAchievements(userId);
    const newAchievements = await getNewAchievements(
      userAchievements,
      qualifyingAchievements
    );
    await awardAchievements(userId, newAchievements);
    return newAchievements;
  } catch (e) {
    return [];
  }
};

/**
 * Input: userId
 * Output: array of objects containing locations and sum of questions answered for location
 * Constraints: none
 * Edge cases: no results
 * @param {String} userId
 * @return {Array} the array of question sums for each location
 */
const getSumOfAnsweredQuestions = async userId => {
  const query = `SELECT a.locationId, a.code, count(a.locationId) as count FROM (
      SELECT uq.userId, uq.questionId, land.locationId, loc.code, count(land.locationId) as count
      FROM user_questions AS uq 
      INNER JOIN questions AS q 
      ON uq.questionId = q.id 
      INNER JOIN landmarks AS land 
      ON q.landmarkId = land.id 
      INNER JOIN locations as loc
      ON land.locationId = loc.id
      WHERE uq.userId = :userId
      GROUP BY land.locationID, uq.questionId
    ) AS a
    GROUP BY a.locationId;`;

  const sumAnsweredQuestions = await sequelize.query(query, {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT
  });
  return sumAnsweredQuestions;
};

/**
 * Input: location questions sums array
 * Output: an array of qualifying achievement codes for the user
 * Constraints: none
 * Edge cases: no qualifying achievements
 * @param {Array} sumsOfLocationQuestions
 * @return {Array} an array of qualifying achievements for the user
 */
const getQualifyingAchievements = sumsOfLocationQuestions => {
  const qualifyingAchievements = sumsOfLocationQuestions.reduce(
    (result, curr) => {
      if (curr.count >= 1) {
        result.push(`${curr.code}visitor`);
      }
      if (curr.count >= 5) {
        result.push(`${curr.code}explorer`);
      }
      if (curr.count >= 10) {
        result.push(`${curr.code}expert`);
      }
      return result;
    },
    []
  );
  return qualifyingAchievements;
};

module.exports.getAnyNewAchievements = getAnyNewAchievements;
module.exports.getQualifyingAchievements = getQualifyingAchievements;

const { sequelize } = require("../../../db");

/**
 * Input: userId
 * Output: array containing user achievements
 * Constraints: none
 * Edge cases: no achievements
 * @param {String} userId 
 * @return {Array} an array of all the user's achievements
 */
const getUserAchievements = async userId => {
  const query = `SELECT ua.userId, ua.achievementId, a.code, a.name, a.code, a.description
                 FROM user_achievements AS ua
                 INNER JOIN achievements AS a
                 ON ua.achievementId = a.id
                 WHERE ua.userId = '${userId}'`;

  const userAchievements = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
    
  });
  return userAchievements;
}

/**
 * Input: user achievement array, qualifying achievement array
 * Output: array containing only new achievements for the user
 * Constraints: none
 * Edge cases: empty arrays
 * @param {Array} userAchievements 
 * @param {Array} qualifyingAchievements 
 * @return {Array} an array of new achievements for the user
 */
const getNewAchievements = async (userAchievements, qualifyingAchievements) => {
  const newAchievementCodes = qualifyingAchievements.filter(achievement => (
    userAchievements.every(userAchievement => userAchievement.code !== achievement)
  ));
  const newAchievements = await getAchievementsFromCodes(newAchievementCodes);
  return newAchievements;
};

/**
 * Input: an array of achievement codes
 * Output: an arry of achievements
 * Constraints: none
 * Edge cases: no results
 * @param {Array} codes - an array of achievement codes
 * @return {Array} an array of achievements, given their achievement codes
 */
const getAchievementsFromCodes = async codes => {
  if (codes.length > 0) {
    const formattedCodes = codes.map(code => `'${code}'`);
    const achievementsQuery = `SELECT * FROM achievements 
                               WHERE code in (${formattedCodes})`;
    const achievements = await sequelize.query(achievementsQuery, { type: sequelize.QueryTypes.SELECT });
    return achievements;
  } else {
    return []
  }
}

/**
 * Input: user ID, and an achievement array with new achievements for the user
 * Output: none
 * Constraints: none
 * Edge cases: no achievement, invalid achievement code
 * @param {String} userId 
 * @param {Array} achievements 
 */
const awardAchievements = async (userId, achievements) => {
  if (achievements.length > 0) {
    await Promise.all(achievements.map(async achievement => {
      const query = `INSERT INTO user_achievements (userId, achievementId)
                     VALUES ('${userId}', '${achievement.id}')`;
      await sequelize.query(query);
    }));
  }
};

module.exports.getUserAchievements = getUserAchievements;
module.exports.getAchievementsFromCodes = getAchievementsFromCodes;
module.exports.getNewAchievements = getNewAchievements;
module.exports.awardAchievements = awardAchievements;
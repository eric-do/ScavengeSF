const chai = require("chai");
const assert = chai.assert;
const Achievements = require("../../server/models/achievements");
const { sequelize } = require("../../db");
const Models = require("../../server/models");
const LocationAwarder = require("../../server/models/achievements/LocationAwarder");

describe("Models: achievements", () => {
  describe("General achievement functionality", () => {
    describe("getNewAchievements", () => {
      it("should should return an array of new achievements", async () => {
        const qualifyingAchievements = ["sfvisitor", "sfexplorer", "sfexpert"];
        const userAchievements = [{ code: "sfvisitor" }];
        const newAchievements = await Achievements.getNewAchievements(
          userAchievements,
          qualifyingAchievements
        );
        assert.typeOf(newAchievements, "array");
        assert.equal(newAchievements.length, 2);
      });
    
      it("should should return an empty array if there are no new achievements", async () => {
        const qualifyingAchievements = ["sfvisitor", "sfexplorer", "sfexpert"];
        const userAchievements = [
          { code: "sfvisitor" },
          { code: "sfexplorer" },
          { code: "sfexpert" }
        ];
        const newAchievements = await Achievements.getNewAchievements(
          userAchievements,
          qualifyingAchievements
        );
        assert.equal(newAchievements.length, 0);
      });
    
      it("should should an empty array if there are more user achievements than qualifying achievements", async () => {
        const qualifyingAchievements = ["sfvisitor", "sfexplorer"];
        const userAchievements = [
          { code: "sfvisitor" },
          { code: "sfexplorer" },
          { code: "sfexpert" }
        ];
        const newAchievements = await Achievements.getNewAchievements(
          userAchievements,
          qualifyingAchievements
        );
        assert.equal(newAchievements.length, 0);
      });
    });
    
    describe("getAchievementsFromCodes", () => {
      it("should return an array of achievements specific to the provided codes", async () => {
        const codes = ["sfvisitor", "sfexpert" ];
        const achievements = await Achievements.getAchievementsFromCodes(codes);
    
        assert.equal(achievements.length, 2);
        assert.equal(achievements[0].name, "San Francisco Visitor");
        assert.equal(achievements[1].name, "San Francisco Expert");
      })
    })
  
    describe("User specific functionality", () => {
      const userId = "testUser";
      const achievements = [
        { id: 1 }, { id: 2 }, { id: 3 }
      ];
    
      beforeEach("Add test user achievement", async () => {
        await Achievements.awardAchievements(userId, achievements);
      });
    
      afterEach("Remove test user achievements", async () => {
        const query = `DELETE FROM user_achievements WHERE userId = "${userId}"`;
        await sequelize.query(query);
      })

      it("should not add any achievements if passed an empty achievement array", async () => {
        await Achievements.awardAchievements(userId, []);
        const achievements = await Achievements.getUserAchievements(userId);
        
        assert.equal(achievements.length, 3);
      });

      it("should return a non-empty array of achievements with valid properties", async () => {
        const achievements = await Achievements.getUserAchievements(userId);
    
        assert.isArray(achievements);
        assert.equal(achievements.length, 3);
        assert.property(achievements[0], "userId");
        assert.property(achievements[0], "achievementId");
        assert.property(achievements[0], "code");
        assert.property(achievements[0], "name");
        assert.property(achievements[0], "description");
      });
    
      it("should return an empty array if passed a non-existent user", async () => {
        const achievements = await Achievements.getUserAchievements("nulluser");
        
        assert.isArray(achievements);
        assert.equal(achievements.length, 0);
      });
    });
    
    describe("LocationAwarder", () => {
      const userId = "testuser";

      afterEach(async () => {
        await sequelize.query(`DELETE FROM user_questions WHERE userId = '${userId}'`);
        await sequelize.query(`DELETE FROM user_achievements WHERE userId = '${userId}'`);
      })

      it("should return new achievements for a user", async () => {
        const userId = "testuser";
        const questionId = 1;
        await Models.updateUserQuestions(userId, questionId);
        const achievements = await LocationAwarder.getAnyNewAchievements(userId);
        assert.isArray(achievements);
        assert.property(achievements[0], "id");
        assert.property(achievements[0], "name");
        assert.property(achievements[0], "description");
        assert.property(achievements[0], "code");
        assert.equal(achievements[0].code, "sfvisitor");
      });

      it("should return an empty array for invalid username", async () => {
        const userId = "'!(0)";
        const questionId = 1;
        await Models.updateUserQuestions(userId, questionId);
        const achievements = await LocationAwarder.getAnyNewAchievements(userId);
        assert.isArray(achievements);
        assert.equal(achievements.length, 0);
      });

      it("should reward users with appropriate location achievements", () => {
        const achievements = [{ count: 10, code: "test" }];
        const qualifyingAchievements = LocationAwarder.getQualifyingAchievements(achievements);
        assert.equal(qualifyingAchievements.length, 3);
      });

      it("should give no reward to users where sum requirements have not been met", () => {
        const achievements = [{ count: 0, code: "test" }];
        const qualifyingAchievements = LocationAwarder.getQualifyingAchievements(achievements);
        assert.equal(qualifyingAchievements.length, 0);
      });
    });
  });
});


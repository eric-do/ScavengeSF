const chai = require("chai");
const assert = chai.assert;
const Models = require("../../server/models");
const { sequelize } = require("../../db");

describe("Models: user_votes", () => {
  const userId1 = "testUser";
  const userId2 = "testUser2";

  after("Delete test user info", async () => {
    const query = `DELETE FROM user_votes 
                   WHERE userId = :user`;
    await sequelize.query(query,
      { replacements: { user: userId1 }});
    await sequelize.query(query,
      { replacements: { user: userId2 }});  
  });

  it("should return 0 for direction if no vote exists", async () => {
    const questionId = 1;
    const userVote = await Models.getUserVote(userId1, questionId);
    assert.equal(userVote.direction, 0);
    assert.isObject(userVote);
    assert.property(userVote, "direction");
  });

  it("should add vote then return the given direction if the user/vote doesn't exist", async () => {
    const questionId = 1;
    const direction = 1;

    const updateDirection = await Models.addUserVote(userId1, questionId, direction);
    const userVote = await Models.getUserVote(userId1, questionId);

    assert.equal(updateDirection, 1);
    assert.equal(userVote.direction, 1);
    assert.isObject(userVote);
    assert.property(userVote, "direction");
  });

  it("should update vote and return new direction for an existing vote", async () => {
    const questionId = 1;
    const firstDirection = 1;
    const secondDirection = -1;

    await Models.addUserVote(userId1, questionId, firstDirection);
    const updateDirection = await Models.addUserVote(userId1, questionId, secondDirection);
    const userVote = await Models.getUserVote(userId1, questionId);

    assert.equal(updateDirection, -1);
    assert.isObject(userVote);
    assert.equal(userVote.direction, -1);
    assert.property(userVote, "direction");
  });

  it("should update vote and return 0 for an existing vote in the same direction", async () => {
    const questionId = 1;
    const direction = 1;

    await Models.addUserVote(userId1, questionId, direction);
    const newDirection = await Models.addUserVote(userId1, questionId, direction);
    const userVote = await Models.getUserVote(userId1, questionId);

    assert.equal(newDirection, 0);
    assert.isObject(userVote);
    assert.equal(userVote.direction, 0);
    assert.property(userVote, "direction");
  });

  it("should not allow duplicate votes for each user/question", async () => {
    const questionId = 1;
    const direction = 1;
    const query = `SELECT COUNT(*) AS count FROM user_votes
                   WHERE userId = :userId
                   AND questionId = :questionId`;
    await Models.addUserVote(userId1, questionId, direction);
    await Models.addUserVote(userId1, questionId, direction);
    const total = await sequelize.query(query, {
      replacements: { userId: userId1, questionId }
    })
    assert.equal(total[0][0].count, 1);
  });

  it("should return the correct number of upvotes", async () => {
    const questionId = 2;
    const addQuery1 = `INSERT INTO user_votes (userId, questionId, direction) 
                       VALUES ('${userId1}', 2, 1);`
    const addQuery2 = `INSERT INTO user_votes (userId, questionId, direction) 
                       VALUES ('${userId2}', 2, 1);`
    
    const originalUpvotes = await Models.getUpvotes(questionId); 
    await sequelize.query(addQuery1);
    await sequelize.query(addQuery2);
    const newUpvotes = await Models.getUpvotes(questionId);
    assert.property(newUpvotes, "upvotes");
    assert.equal(parseInt(newUpvotes.upvotes), parseInt(originalUpvotes.upvotes) + 2);
  });

  it("should return the correct number of downvotes", async () => {
    const questionId = 2;
    const addQuery1 = `INSERT INTO user_votes (userId, questionId, direction) 
                       VALUES ('${userId1}', 2, -1);`
    const addQuery2 = `INSERT INTO user_votes (userId, questionId, direction) 
                       VALUES ('${userId2}', 2, -1);`

    await sequelize.query(addQuery1);
    await sequelize.query(addQuery2);
    const downvotes = await Models.getDownvotes(questionId);
    assert.property(downvotes, "downvotes");
    assert.equal(downvotes.downvotes, 2);
  });

});
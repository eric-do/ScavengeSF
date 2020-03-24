const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const Controllers = require('../../server/controllers');
const { sequelize } = require('../../db');

describe('Controllers', () => {
  describe('Firebase auth', () => {
    it('should return UID for a valid token', async () => {});
  });

  describe('getLocations', () => {
    it('should send locations back to the client', async () => {
      const res = { send: () => {} };
      const req = {};
      const spy = sinon.spy(res, 'send');

      await Controllers.getLocations(req, res);
      assert(spy.calledOnce, true);
    });
  });

  describe('getLandmarks', () => {
    it('should should send landmarks if passed valid location', async () => {
      const res = { send: () => {} };
      const req = { query: { id: 1 } };
      const spy = sinon.spy(res, 'send');

      await Controllers.getLandmarks(req, res);

      assert(spy.calledOnce, true);
    });
  });

  describe('getQuestions', () => {
    it('should should send questions if passed valid landmark', async () => {
      const res = { send: () => {} };
      const req = { query: { id: 1 } };
      const spy = sinon.spy(res, 'send');

      await Controllers.getQuestions(req, res);

      assert(spy.calledOnce, true);
    });
  });

  describe('addQuestion', () => {
    it('should send new questionId back to client if passed a valid question', async () => {
      const res = { sendStatus: () => {} };
      const req = {
        body: {
          text: 'This is a test question?',
          answers: [
            {
              text: 'Answer 1',
              correct: 0,
            },
            {
              text: 'Answer 2',
              correct: 1,
            },
            {
              text: 'Answer 3',
              correct: 0,
            },
            {
              text: 'Answer 4',
              correct: 0,
            },
          ],
          landmarkId: 1,
        },
      };

      const spy = sinon.spy(res, 'sendStatus');
      await Controllers.addQuestion(req, res);
      assert(spy.calledOnce, true);
    });
  });

  describe('getAnswers', () => {
    it('should should send answers if passed valid question', async () => {
      const res = { send: () => {} };
      const req = { query: { id: 1 } };
      const spy = sinon.spy(res, 'send');

      await Controllers.getAnswers(req, res);

      assert(spy.calledOnce, true);
    });
  });

  describe('addUserVote / getUserVote', async () => {
    const userId = 'testuser';
    const questionId = 1;
    const direction = 1;

    after('Delete test user info', async () => {
      const query = `DELETE from user_votes 
                     WHERE userId = "${userId}"`;
      await sequelize.query(query);
    });

    it('should send new direction back to client after updating user vote', async () => {
      const res = { send: () => {} };
      const req = {
        body: {
          userId,
          questionId,
          direction,
        },
      };
      const spy = sinon.spy(res, 'send');

      await Controllers.addUserVote(req, res);
      assert(spy.calledOnce, true);
      assert.equal(spy.args[0][0].direction, direction);
    });

    it("should return the user's vote for a given user and question", async () => {
      const res = { send: () => {} };
      const req = {
        query: {
          userId,
          questionId,
        },
      };
      const spy = sinon.spy(res, 'send');

      await Controllers.getUserVote(req, res);
      const userVote = spy.args[0][0];
      assert(spy.calledOnce, true);
      assert.equal(userVote.direction, direction);
    });

    it('should return upvotes for a given question', async () => {
      const res = { send: () => {} };
      const req = { query: { questionId } };
      const spy = sinon.spy(res, 'send');

      await Controllers.getUpvotes(req, res);
      assert(spy.calledOnce, true);
      assert.property(spy.args[0][0], 'upvotes');
    });

    it('should return downvotes for a given question', async () => {
      const res = { send: () => {} };
      const req = { query: { questionId } };
      const spy = sinon.spy(res, 'send');

      await Controllers.getDownvotes(req, res);
      assert(spy.calledOnce, true);
      assert.property(spy.args[0][0], 'downvotes');
    });
  });
});

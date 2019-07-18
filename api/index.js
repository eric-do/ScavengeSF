import { SERVER } from 'react-native-dotenv';

/* GETS */
export const getLocations = async cb => {
  try {
    const data = await fetch(`${SERVER}locations`);
    const locations = await data.json();
    cb({ locations });
  } catch (e) {
    console.error(`Coudln't get locations`, e);
  }
}

export const getLandmarks = async (id, cb) => {
  try {
    const data = await fetch(`${SERVER}landmarks?id=${id}`);
    const landmarks = await data.json();
    cb({ landmarks });
  } catch (e) {
    console.error(`Couldn't get landmarks`, e);
  }
}

export const getAnswerList = async (id, cb) => {
  try {
    const data = await fetch(`${SERVER}answers?id=${id}`);
    const answers = await data.json();
    cb({ answers });
  } catch (e) {
    console.error(`Couldn't get data`, e);
  }
}

export const getQuestionList = async (id, cb) => {
  try {
    const data = await fetch(`${SERVER}questions?id=${id}`);
    const questions = await data.json();
    cb({ questions });
  } catch (e) {
    console.error(`Couldn't get questions`, e);
  }
}

export const getAchievementList = async (id, cb) => {
  try {
    const data = await fetch(`${SERVER}achievements?id=${id}`);
    const achievements = await data.json();
    cb({ achievements });
  } catch (e) {
    console.error(`Error getting achievements`, e);
  }
}

export const getUserVote = async (userId, questionId, cb) => {
  try {
    const response = await fetch(`${SERVER}get_vote?userId=${userId}&questionId=${questionId}`);
    const data = await response.json();
    return data ? cb({ direction: data.direction }) : cb({ direction: 0 });
  } catch (e) {
    console.error('Could not get user votes', e);
  }
}

export const getUpvotes = async (questionId, cb) => {
  try {
    const data = await fetch(`${SERVER}upvotes?questionId=${questionId}`);
    const upvotes = await data.json();
    cb(upvotes);
  } catch (e) {
    console.error('Could not get upvotes', e);
  }
}

export const getDownvotes = async (questionId, cb) => {
  try {
    const data = await fetch(`${SERVER}downvotes?questionId=${questionId}`);
    downvotes = await data.json();
    cb(downvotes);
  } catch (e) {
    console.error('Could not get downvotes', e)
  }
}

/* POSTS */
export const updateQuestionsCompleted = (options, cb) => {
  fetch(`${SERVER}questions/`, options)
    .then(response => response.text())
    .then(data => { 
      const achievement = data ? JSON.parse(data) : null;
      const modalVisible = achievement ? true : false;
      cb({ achievement, modalVisible });
    })
    .catch(e => console.error('request failed', e));
}

export const updateUserVote = (vote, cb) => {
  const { userId, questionId, direction } = vote;
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `userId=${userId}&questionId=${questionId}&direction=${direction}`
  };

  fetch(`${SERVER}vote/`, options)
    .then(response => response.json())
    .then(data => {
      cb(data);
    })
    .catch(e => console.error('Error sending vote', e));
}
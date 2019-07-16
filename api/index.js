import { SERVER } from 'react-native-dotenv';

/* GETS */
export const getAnswerList = (id, cb) => {
  fetch(`${SERVER}answers?id=${id}`)
    .then(results => results.json())
    .then(answers => cb({ answers }))
    .catch(e => console.error(`Couldn't get data`, e));
}

export const getQuestionList = (id, cb) => {
  fetch(`${SERVER}questions?id=${id}`)
    .then(response => response.json())
    .then(questions => cb({ questions }))
    .catch(e => console.error('Could not get data', e));
}

export const getAchievementList = (id, cb) => {
  fetch(`${SERVER}achievements?id=${id}`)
    .then(response => response.json())
    .then(achievements => cb({ achievements }))
    .catch(error => console.error('Error getting achievements', error));
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
  console.log(userId, questionId, direction);
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
      console.log(data);
      cb(data);
    })
    .catch(e => console.error('Error sending vote', e));
}
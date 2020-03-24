const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sequelize = new Sequelize("mvp", "root", "student", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

sequelize
  .authenticate()
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uid: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

const Location = sequelize.define(
  "location",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

const Landmark = sequelize.define(
  "landmark",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

const Question = sequelize.define(
  "question",
  {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rating: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    }
  },
  { timestamps: false }
);

const Answer = sequelize.define(
  "answer",
  {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
    correct: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: false }
);

const Achievement = sequelize.define(
  "achievement",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    locationId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    landmarkId: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  { timestamps: false }
);

const UserVotes = sequelize.define("user_votes",
{
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  direction: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{ timestamps: false }
);

const UserQuestions = sequelize.define("user_questions",
  {
    userId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    questionId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { timestamps: false }
);

const UserAchievements = sequelize.define("user_achievements",
  {
    userId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    achievementId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { timestamps: false }
);

Location.hasMany(Landmark);
Landmark.belongsTo(Location);
Landmark.hasMany(Question);
Question.belongsTo(Landmark);
Question.hasMany(Answer);
Answer.belongsTo(Question);
UserQuestions.hasMany(Question);
UserAchievements.hasMany(Achievement);
UserVotes.hasMany(Question);

sequelize.sync({ force: false });

module.exports = {
  User,
  Location,
  Landmark,
  Question,
  Answer,
  Achievement,
  UserQuestions,
  UserAchievements,
  UserVotes,
  sequelize,
  Op
};

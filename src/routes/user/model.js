const Sequelize = require('sequelize');
const connection = require('../../utils/database');

const User = connection.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  photo: {
    type: Sequelize.TEXT('tiny'),
    validate: {
      isUrl: true,
    },
  },
  password: {
    type: Sequelize.TEXT('tiny'),
  },
});

// force: true will drop the table if it already exists
User.sync({ force: process.env.NODE_ENV === 'development' }).then(() => {
  console.log('Table synced');

  return;
});

module.exports = User;

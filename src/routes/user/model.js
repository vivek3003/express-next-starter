const Sequelize = require('sequelize');
const connection = require('../../utils/database');
const bcrypt = require('bcrypt');

const User = connection.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
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
  status: {
    type: Sequelize.ENUM,
    defaultValue: 'created',
    values: ['created', 'verified', 'deleted', 'blacklisted'],
  },
  socialAccount: {
    type: Sequelize.ENUM,
    defaultValue: 'none',
    values: ['none', 'facebook', 'google', 'twitter'],
  },
  socialAccountId: {
    type: Sequelize.TEXT('tiny'),
  },
});

User.prototype.getPublicProfile = function() {
  const { id, name, email, photo, status } = this;

  return {
    id,
    name,
    email,
    photo,
    status,
  };
}

User.generatePassword = function(password) {
  return bcrypt.hashSync(password, 10);
}

User.prototype.verifyPassword = function(passwordToVerify) {
  return bcrypt.compareSync(passwordToVerify, this.password);
}

// force: true will drop the table if it already exists
User.sync({ force: process.env.NODE_ENV === 'development' }).then(() => {
  if (process.env.NODE_ENV === 'development') {
    User.create({
      name: 'Developer',
      email: 'dev@gmail.com',
      password: User.generatePassword('dev123'),
    });
  }

  return;
});

module.exports = User;

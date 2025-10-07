const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Track = sequelize.define('Track', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  album: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.INTEGER, // in seconds
  },
  audioUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverArt: {
    type: DataTypes.STRING,
  },
  plays: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  timestamps: true,
  tableName: 'tracks',
});

// Associations
User.hasMany(Track, { foreignKey: 'userId' });
Track.belongsTo(User, { foreignKey: 'userId' });

module.exports = Track;

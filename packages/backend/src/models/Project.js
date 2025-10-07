const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Project = sequelize.define('Project', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  template: {
    type: DataTypes.STRING,
  },
  bpm: {
    type: DataTypes.INTEGER,
    defaultValue: 120,
  },
  key: {
    type: DataTypes.STRING,
    defaultValue: 'C',
  },
  timeSignature: {
    type: DataTypes.STRING,
    defaultValue: '4/4',
  },
  tracks: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  lastModified: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'projects',
});

// Associations
User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

module.exports = Project;

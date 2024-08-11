module.exports = (sequelize, DataTypes) => {
  const UserProgress = sequelize.define('UserProgress', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    currentPartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    playerResponses: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deathCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return UserProgress;
};
  
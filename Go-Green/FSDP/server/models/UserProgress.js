module.exports = (sequelize, DataTypes) => {
    const UserProgress = sequelize.define('UserProgress', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deathsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      lastSafePartId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    return UserProgress;
  };
  
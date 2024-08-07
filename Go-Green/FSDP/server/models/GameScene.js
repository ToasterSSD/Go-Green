module.exports = (sequelize, DataTypes) => {
    const Scene = sequelize.define('Scene', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    return Scene;
  };
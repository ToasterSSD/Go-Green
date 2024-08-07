module.exports = (sequelize, DataTypes) => {
    const Choice = sequelize.define('Choice', {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nextSceneId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    Choice.associate = (models) => {
      Choice.belongsTo(models.Scene, {
        foreignKey: 'sceneId',
        onDelete: 'CASCADE'
      });
    };
    return Choice;
  };
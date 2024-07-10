module.exports = (sequelize, DataTypes) => {
  const ChatArea = sequelize.define(
    "ChatArea",
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageFile: {
        type: DataTypes.STRING(20),
      },
    },
    {
      tableName: "chatarea",
    }
  );

  ChatArea.associate = (models) => {
    ChatArea.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return ChatArea;
};

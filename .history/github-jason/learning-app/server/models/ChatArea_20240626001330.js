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
      linkURL: {
        type: DataTypes.STRING(200),
      },
      linkText: {
        type: DataTypes.STRING(200),
      },
    },
    {
      tableName: "announcement",
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

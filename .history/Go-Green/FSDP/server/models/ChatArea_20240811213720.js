module.exports = (sequelize, DataTypes) => {
  const ChatArea = sequelize.define(
    "ChatArea",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      imageFile: {
        type: DataTypes.STRING(20),
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      likedBy: {
        type: DataTypes.JSON, // Use JSON to store array-like data
        allowNull: false,
        defaultValue: [],
      },
      dislikedBy: {
        type: DataTypes.JSON, // Use JSON to store array-like data
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: "chatarea",
      timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
  );

  ChatArea.associate = (models) => {
    ChatArea.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "cascade",
    });
  ChatArea.hasMany(models.Comment, {
    foreignKey: "postId",
    as: "comments",
    onDelete: "cascade",
  });
  };

  return ChatArea;
};

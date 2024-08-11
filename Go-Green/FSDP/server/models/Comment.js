// models/Comment.js

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
      timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Comment.belongsTo(models.ChatArea, {
      foreignKey: "postId",
      as: "post",
      onDelete: "cascade",
    });
  };

  return Comment;
};

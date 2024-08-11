module.exports = (sequelize, DataTypes) => {
  const LikesDislikes = sequelize.define("LikesDislikes", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("like", "dislike"),
      allowNull: false,
    },
  });

  LikesDislikes.associate = (models) => {
    LikesDislikes.belongsTo(models.User, { foreignKey: "userId" });
    LikesDislikes.belongsTo(models.ChatArea, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
  };

  return LikesDislikes;
};

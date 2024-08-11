module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "RESOLVED", "DELETED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
  });

  Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: "userId" });
    Report.belongsTo(models.ChatArea, { foreignKey: "postId" });
  };

  return Report;
};

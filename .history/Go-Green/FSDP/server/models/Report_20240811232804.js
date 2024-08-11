module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "RESOLVED", "DELETED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
  });

  Report.associate = (models) => {
    Report.belongsTo(models.ChatArea, { foreignKey: "postId" });
  };

  return Report;
};

module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define(
    "Registration",
    {
      announcementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salutation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emergencyContactName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emergencyContactNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "registrations",
    }
  );

  Registration.associate = (models) => {
    Registration.belongsTo(models.Announcement, {
      foreignKey: "announcementId",
      as: "announcement",
    });
  };

  return Registration;
};

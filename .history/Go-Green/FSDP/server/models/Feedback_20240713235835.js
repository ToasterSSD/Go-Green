// module.exports = (sequelize, DataTypes) => {
//     const Feedback = sequelize.define(
//       "Feedback",
//       {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//           },
//         name: {
//           type: DataTypes.STRING(50),
//           allowNull: false,
//         },
//         email: {
//           type: DataTypes.TEXT,
//           allowNull: false,
//         },
//         actualfeedback: {
//           type: DataTypes.TEXT,
//           allowNull: false
//         },
//       },
//       {
//         tableName: "feedback",
//       }
//     );
  
//     return Feedback;
//   };

module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    "Announcement",
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
      tableName: "feedback",
    }
  );

  Announcement.associate = (models) => {
    Announcement.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Announcement;
};

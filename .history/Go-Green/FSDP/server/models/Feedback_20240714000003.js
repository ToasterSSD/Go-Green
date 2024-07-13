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
  const Feedback = sequelize.define(
    "Feedback",
    {
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
    {
      tableName: "feedback",
    }
  );

  Feedback.associate = (models) => {
    Feedback.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Feedback;
};

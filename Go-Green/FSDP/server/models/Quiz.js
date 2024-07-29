module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define('Quiz', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'quizzes'
    });

    return Quiz;
};

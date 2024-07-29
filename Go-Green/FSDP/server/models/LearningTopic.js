module.exports = (sequelize, DataTypes) => {
    const LearningTopic = sequelize.define(
        "LearningTopic",
        {
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            videos: {
                type: DataTypes.JSON, // Storing video URLs or IDs as an array of strings
                allowNull: true,
            }
        },
        {
            tableName: 'learning_topics'
        }
    );

    return LearningTopic;
}

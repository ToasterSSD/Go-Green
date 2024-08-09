// models/bookmark.js
module.exports = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define(
        "Bookmark",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            articleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            tableName: 'bookmarks',
            timestamps: false,
        }
    );

    Bookmark.associate = (models) => {
        Bookmark.belongsTo(models.User, { foreignKey: 'userId' });
        Bookmark.belongsTo(models.Article, { foreignKey: 'articleId' });
    };

    return Bookmark;
}

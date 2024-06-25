module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define(
        "Article", 
        {
        newsName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        newsCat: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        tableName: 'articles'
    });



    return Article;
}
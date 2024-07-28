module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define(
        "Article", 
        {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        author: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        imageFile: {
            type: DataTypes.STRING(255)
        }
        
    }, {
        tableName: 'articles'
    });



    return Article;
}
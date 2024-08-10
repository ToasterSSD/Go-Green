module.exports = (sequelize, DataTypes) => {
    const GamePart = sequelize.define('GamePart', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        nextPartId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isSafePoint: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
    return GamePart;
};



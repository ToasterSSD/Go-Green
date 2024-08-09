module.exports = (sequelize, DataTypes) => {
    const ExtraUserInfo = sequelize.define("ExtraUserInfo", {
        displayName: {
            type: DataTypes.STRING(63),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        socialMedia: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },bio: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        tableName: 'extra_user_info'
    });

    ExtraUserInfo.associate = (models) => {
        ExtraUserInfo.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "cascade"
        });
    };

    return ExtraUserInfo;
};

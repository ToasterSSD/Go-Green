module.exports = (sequelize, DataTypes) => {
    const ExtraUserInfo = sequelize.define("ExtraUserInfo", {
        displayName: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        homeAddress: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        paymentInformation: {
            type: DataTypes.STRING(255),
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
            allowNull: true,
        },
        profilePicture: {
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
}

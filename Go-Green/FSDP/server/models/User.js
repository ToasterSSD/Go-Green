module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        roles: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        tableName: 'users'
    });

    User.associate = (models) => {
        // Association with Tutorial model
        User.hasMany(models.Tutorial, {
            foreignKey: "userId",
            onDelete: "cascade"
        });

        // Association with ExtraUserInfo model
        User.hasMany(models.ExtraUserInfo, {
            foreignKey: "userId",
            onDelete: "cascade"
        });

        // Association with Payment model
        User.hasMany(models.Payment, {
            foreignKey: "userId",
            onDelete: "cascade"
        });

        // Association with HomeAddress model
        User.hasMany(models.HomeAddress, {
            foreignKey: "userId",
            onDelete: "cascade"
        });
    };

    return User;
}

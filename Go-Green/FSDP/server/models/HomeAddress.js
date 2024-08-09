module.exports = (sequelize, DataTypes) => {
    const HomeAddress = sequelize.define("HomeAddress", {
        homeaddress: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },postalcode: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        tableName: 'home_addresses'
    });

    HomeAddress.associate = (models) => {
        HomeAddress.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "cascade"
        });
    };

    return HomeAddress;
};

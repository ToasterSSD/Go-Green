module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        cardnumber: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },ccv: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }, {
        tableName: 'payments'
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "cascade"
        });
    };

    return Payment;
};

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        cardnumber: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        ccv: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2), // Use DECIMAL for financial amounts
            allowNull: false,
        },
        frequency: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }, 
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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

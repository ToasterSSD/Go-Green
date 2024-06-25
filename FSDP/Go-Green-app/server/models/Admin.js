module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true // Assuming admin emails should be unique
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        // Additional fields specific to admins can be added here
        role: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'admins' // Changed to 'admins' to reflect the table for admin entities
    });

    // Assuming admins might have different associations than users
    // For example, admins might manage categories instead of tutorials
    Admin.associate = (models) => {
        // Example association, adjust according to your application's needs
        Admin.hasMany(models.Category, {
            foreignKey: "adminId",
            onDelete: "cascade"
        });
    };

    return Admin;
}
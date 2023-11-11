module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };
    let config = {
        tableName: "Users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}

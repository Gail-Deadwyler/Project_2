module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define(`User`, {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = function(models) {
        User.hasMany(models.Activity, {
            onDelete: `cascade`
        });
    };

    return User

}
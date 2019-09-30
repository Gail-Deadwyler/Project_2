module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define(`Activity`, {
        title: DataTypes.STRING,
        type: DataTypes.STRING,
        units: DataTypes.INTEGER,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        }
    });

   Activity.associate = function(models) {
       Activity.belongsTo(models.User, {
           foreignKey: {
               allowNull: false
           }
       });
    
    };

    return Activity

}
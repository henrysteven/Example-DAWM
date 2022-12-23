module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuario', {
        user_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        status: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.CHAR
        },
        role: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.CHAR
        },
        email: {
            allowNull: true,
            defaultValue: 'admin@asa.com',
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        tableName: 'usuario',
        classMethods: {}
    });
    Usuario.associate = function (models) {
        Usuario.hasMany(models.product, {
            foreignkey: 'user_id'
        });
    };
    return Usuario;
};

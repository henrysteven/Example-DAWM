module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            defaultValue: '',
            type: DataTypes.STRING
        },
        value: {
            allowNull: true,
            defaultValue: 0,
            type: DataTypes.FLOAT
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'product',
        classMethods: {}
    });
    Product.associate = function (models) {
        // associations can be defined here
        Usuario.belongsTo(models.product, {
            foreignkey : 'user_id'
        });
    };
    return Product;
};

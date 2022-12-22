module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuario', {
    id: {
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
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'usuario',
    classMethods: {}
  });
  Usuario.associate = function (models) {
    // associations can be defined here
  };
  return Usuario;
};
/* Sequelize.sync().then(() => {
  console.log('Book table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
}); */
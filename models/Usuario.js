const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM("ADMINISTRADOR", "TECNICO", "PADRAO"),
        allowNull: false

    }
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: false
})

module.exports = Usuario
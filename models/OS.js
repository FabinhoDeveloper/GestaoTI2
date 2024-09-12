const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");

const OS = sequelize.define('OS', {
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status_os: {
        type: DataTypes.ENUM('PENDENTE', 'CONCLUÍDA', 'CANCELADA'),
        allowNull: false
      },
      data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Define a data de criação como o momento atual
      },
      data_fechamento: {
        type: DataTypes.DATE,
        allowNull: true, // Pode ser nulo se a OS não foi fechada
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
}, {
    sequelize,
    modelName: 'OS',
    tableName: 'os',
    timestamps: false
})


module.exports = OS
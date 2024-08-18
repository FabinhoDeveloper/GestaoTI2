const sequelize = require('./database');

const Usuario = require("../models/Usuario")
const OS = require("../models/OS")

let mudarBanco = false;

Usuario.hasMany(OS, {
    foreignKey: 'usuarioId',
    as: 'os_registradas'
  });
  
  OS.belongsTo(Usuario, {
    foreignKey: {
      name: 'usuarioId',
      allowNull: false
    },
    as: 'usuario'
  });
  
  Usuario.hasMany(OS, {
    foreignKey: 'tecnicoId',
    as: 'os_atribuidas'
  });
  
  OS.belongsTo(Usuario, {
    foreignKey: {
      name: 'tecnicoId',
      allowNull: true
    },
    as: 'tecnico'
  });
const sync = async () => {
    try {
        await sequelize.sync({force: mudarBanco})
    } catch (error) {
        console.error("Erro ao sincronizar base de dados: ", error);
    }
}

module.exports = sync

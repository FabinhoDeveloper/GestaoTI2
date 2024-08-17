const sequelize = require('./database');

const Usuario = require("../models/Usuario")
const OS = require("../models/OS")

const sync = async () => {
    try {
        await sequelize.sync({force: false})
    } catch (error) {
        console.error("Erro ao sincronizar base de dados: ", error);
    }
}

module.exports = sync

const OS = require("../models/OS");
const Usuario = require("../models/Usuario");

module.exports = {
    async cadastrarOS(dados) {
        
    },

    async listarOs() {
        const listaOs = await OS.findAll()

        if (listaOs.length === 0) {
            throw new Error("Nenhuma OS encontrada!")
        }

        return listaOs
    },

    async obterOsPorUsuario(dados) {
        const {id} = dados

        const os = await OS.findAll({
            where: {id}
        })

        if (os.length === 0) {
            throw new Error("Nenhuma OS atribuída a esse usuário!")
        }

        return os
    },

    async obterOsPorAtribuicao(dados) {
        const {idUsuario} = dados

        const os = await OS.findAll({
            where: {usuarioId: idUsuario}
        })

        
    },

    async atribuirOs(dados) {
        const {idOs, idUsuario} = dados

        const os = await OS.findByPk(idOs)
        const usuario = await Usuario.findByPk(idUsuario)

        if (!os) {
            throw new Error("Nenhuma OS encontrada com este ID!")
        }
        
        if (!usuario) {
            throw new Error("Nenhum usuário encontrado com este ID!")
        }

        if (usuario.tipo === "PADRAO") {
            throw new Error("Um usuário padrão não pode ter uma OS atribuída!")
        }

        os.tecnicoId = usuario.idUsuario
        await os.save()

        return os
    },

    async concluirOs(dados) {
        const {idOs} = dados

        const os = await OS.findByPk(idOs)

        if (!os) {
            throw new Error("Nenhuma OS encontrada com este ID!")
        }

        if (os.status === "CONCLUÍDA" || os.status === "CANCELADA") {
            throw new Error("Essa OS não está pendente! Não pôde ser concluída!")
        }

        os.status = "CONCLUÍDA"

        await os.save()

        return os
    }
}
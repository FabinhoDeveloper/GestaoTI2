const OS = require("../models/OS");
const Usuario = require("../models/Usuario");

module.exports = {
    async cadastrarOS(dados) {
        try {
            const {descricao, id} = dados

            const osCriada = await OS.create({
                descricao: descricao,
                status_os: "PENDENTE",
                data_criacao: new Date(),
                usuarioId: id
            })

            return osCriada

        } catch (error) {
            console.error("Erro ao cadastrar OS:", error.message);
            throw error;
        }
    },

    async listarOs() {
        try {
            const listaOs = await OS.findAll();

            if (listaOs.length === 0) {
                throw new Error("Nenhuma OS encontrada!");
            }

            return listaOs;
        } catch (error) {
            console.error("Erro ao listar OS:", error.message);
            throw error;
        }
    },

    async obterOsPorUsuario(dados) {
        try {
            const { id } = dados;
    
            const listaOs = await OS.findAll({
                where: { usuarioId: id }
            });
    
            return listaOs; // Retorna a lista, mesmo que esteja vazia
        } catch (error) {
            console.error("Erro ao obter OS por usuário:", error.message);
            throw error;
        }
    },
    

    async obterOsPorAtribuicao(dados) {
        try {
            const { idUsuario } = dados;

            const os = await OS.findAll({
                where: { usuarioId: idUsuario }
            });

            if (os.length === 0) {
                throw new Error("Nenhuma OS atribuída a este usuário");
            }

            return os;
        } catch (error) {
            console.error("Erro ao obter OS por atribuição:", error.message);
            throw error;
        }
    },

    async atribuirOs(dados) {
        try {
            const { idOs, idUsuario } = dados;

            const os = await OS.findByPk(idOs);
            const usuario = await Usuario.findByPk(idUsuario);

            if (!os) {
                throw new Error("Nenhuma OS encontrada com este ID!");
            }

            if (!usuario) {
                throw new Error("Nenhum usuário encontrado com este ID!");
            }

            if (usuario.tipo === "PADRAO") {
                throw new Error("Um usuário padrão não pode ter uma OS atribuída!");
            }

            os.tecnicoId = usuario.idUsuario;
            await os.save();

            return os;
        } catch (error) {
            console.error("Erro ao atribuir OS:", error.message);
            throw error;
        }
    },

    async concluirOs(dados) {
        try {
            const { idOs } = dados;

            const os = await OS.findByPk(idOs);

            if (!os) {
                throw new Error("Nenhuma OS encontrada com este ID!");
            }

            if (os.status === "CONCLUÍDA" || os.status === "CANCELADA") {
                throw new Error("Essa OS não está pendente! Não pôde ser concluída!");
            }

            os.status = "CONCLUÍDA";
            await os.save();

            return os;
        } catch (error) {
            console.error("Erro ao concluir OS:", error.message);
            throw error;
        }
    }
};

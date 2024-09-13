const OS = require("../models/OS");
const Usuario = require("../models/Usuario");

module.exports = {
    async cadastrarOS(dados) {
        try {
            const {descricao, id, local_os, tecnicoId} = dados

            const osCriada = await OS.create({
                descricao: descricao,
                status_os: "PENDENTE",
                data_criacao: new Date(),
                usuarioId: id,
                tecnicoId,
                local_os
            })

            return osCriada

        } catch (error) {
            console.error("Erro ao cadastrar OS:", error.message);
            throw error;
        }
    },

    async listarOs() {
        try {
            const listaOs = await OS.findAll({
                include: [
                    {
                        model: Usuario,
                        as: 'usuario', // Alias para o requerente
                        attributes: ['nome']
                    },
                    {
                        model: Usuario,
                        as: 'tecnico', // Alias para o técnico
                        attributes: ['nome']
                    },
                ],

            });
    
            return listaOs.length > 0 ? listaOs : [];
    
        } catch (error) {
            console.error("Erro ao listar OS:", error.message);
            throw error;
        }
    },

    async obterOsPorUsuario(dados) {
        try {
            const { id } = dados;
    
            const listaOs = await OS.findAll({
                where: { usuarioId: id },
                include: [
                    {
                        model: Usuario,
                        as: 'usuario', // Alias para o requerente
                        attributes: ['nome']
                    },
                    {
                        model: Usuario,
                        as: 'tecnico', // Alias para o técnico
                        attributes: ['nome']
                    }
                ]
            });
    
            return listaOs; // Retorna a lista, mesmo que esteja vazia
        } catch (error) {
            console.error("Erro ao obter OS por usuário:", error.message);
            throw error;
        }
    },
    

    async obterOsPorAtribuicao(dados) {
        try {
            const { id } = dados;

            console.log("Dados recebidos:", dados); // Adicione este log

            const listaOs = await OS.findAll({
                where: { tecnicoId: id },
                include: [
                    {
                        model: Usuario,
                        as: 'usuario', // Alias para o requerente
                        attributes: ['nome', 'local_de_trabalho']
                    },
                    {
                        model: Usuario,
                        as: 'tecnico', // Alias para o técnico
                        attributes: ['nome']
                    }
                ]
            });

            return listaOs;

        } catch (error) {
            console.error("Erro ao obter OS por atribuição:", error.message);
            throw error;
        }
    },

    async obterOsPorId(dados) {
        try {
            const {id} = dados

            const os = await OS.findByPk(id)

            if (!os) {
                throw new Error("Nenhuma OS encontrada com este ID!");
            }

            return os
        } catch (error) {
            console.error("Erro ao buscar OS por Id:", error.message);
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

            os.tecnicoId = usuario.id;
            await os.save();

            return os;
        } catch (error) {
            console.error("Erro ao atribuir OS:", error.message);
            throw error;
        }
    },

    async concluirOs(dados) {
        try {
            const { id, observacao } = dados;

            const os = await OS.findByPk(id);

            if (!os) {
                throw new Error("Nenhuma OS encontrada com este ID!");
            }

            if (os.status_os === "CONCLUÍDA" || os.status_os === "CANCELADA") {
                throw new Error("Essa OS não está pendente! Não pôde ser concluída!");
            }
            
            os.status_os = "CONCLUÍDA"
            os.observacao = observacao
            os.data_fechamento = new Date()
            
            await os.save();

            return os;
        } catch (error) {
            console.error("Erro ao concluir OS:", error.message);
            throw error;
        }
    },

    async cancelarOs(dados) {
        try {
            const { id } = dados;

            const os = await OS.findByPk(id);

            if (!os) {
                throw new Error("Nenhuma OS encontrada com este ID!");
            }

            if (os.status_os === "CONCLUÍDA" || os.status_os === "CANCELADA") {
                throw new Error("Essa OS não está pendente! Não pôde ser cancelada!");
            }
            
            os.status_os = "CANCELADA"
            os.data_fechamento = new Date()
            
            await os.save();

            return os;
        } catch (error) {
            console.error("Erro ao cancelar OS:", error.message);
            throw error;
        }
    }
};

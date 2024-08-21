const Usuario = require("../models/Usuario")

module.exports = {
    async cadastrarUsuario(dados) {
        const { nome, email, senha, tipo, local_de_trabalho } = dados
        
        try {
            const usuarioCriado = await Usuario.create({
                nome, 
                email, 
                senha, 
                tipo,
                local_de_trabalho                
            })
            return usuarioCriado
        } catch (error) {
            console.error("Erro ao cadastrar usuário!", error)
            throw error
        }

    },

    async listarUsuarios() {
        const usuarios = await Usuario.findAll();
        
        if (!usuarios) {
            throw new Error("Nenhum usuário encontrado!")
        }
        
        return usuarios;
    },

    async listarUsuarioPorId(id) {
        try {
            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                throw new Error("Usuário não encontrado!")
            }

            return usuario
        } catch (error) {
            console.error("Erro ao buscar usuário por ID", error)
            throw error
        }
    },

    async listarUsuarioPorEmail(email) {
        try {
            const usuario = await Usuario.findOne({
                where: {email}
            });

            if (!usuario) {
                throw new Error("Usuário não encontrado!")
            }

            return usuario
        } catch (error) {
            console.error("Erro ao buscar usuário por E-mail", error)
            throw error
        }
    },

    async listarUsuariosPorTipo(tipo) {
        try {
            const tiposValidos = ["ADMINISTRADOR", "TECNICO", "PADRAO"]

            if (!tiposValidos.includes(tipo)) {
                throw new Error("Tipo de usuário inválido!")
            }

            const usuarios = await Usuario.findAll(
                {where: {tipo}}
            )

            if (usuarios.length === 0) {
                throw new Error("Nenhum usuário encontrado do tipo especificado!")
            }

            return usuarios

        } catch (error) {
            console.error("Erro ao listar usuários por tipo!", error)
            throw error
        }
    },

    async deletarUsuario(id) {
        try {
            const usuarioDeletado = await Usuario.destroy({
                where: {id}
            })

            if (usuarioDeletado === 0) {
                throw new Error("Nenhum usuário deletado!")
            }

            return usuarioDeletado

        } catch (error) {
            console.error("Erro ao deletar usuário!", error)
            throw error
        }
    }
}
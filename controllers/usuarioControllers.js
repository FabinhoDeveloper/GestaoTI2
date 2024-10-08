const Usuario = require("../models/Usuario");
const usuarioServices = require("../services/usuarioService")

module.exports = {
    async cadastrarUsuario(req, res) {
        const {nome, email, senha, tipo, local_de_trabalho} = req.body
        
        try {
            if (!nome || !email || !senha || !tipo || !local_de_trabalho) {
                return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
            }

            const usuarioCriado = await usuarioServices.cadastrarUsuario({nome, email, senha, tipo, local_de_trabalho})

            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!", 
                cadastrado: usuarioCriado
            })

        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async deletarUsuario(req, res) {
        const {id} = req.params

        try {
            const usuarioDeletado = await usuarioServices.deletarUsuario({id})
            res.json({
                mensagem: `Usuário deletado com sucesso!`, 
                deletado: usuarioDeletado
            })
        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async editarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha, tipo, local_de_trabalho } = req.body;
    
        try {
            // Chama a função do serviço
            const resultado = await usuarioServices.editarUsuario({
                id,
                nome,
                email,
                senha,
                tipo,
                local_de_trabalho
            });
    
            // Retorna a resposta com o status 200
            res.status(200).json(resultado);
    
        } catch (error) {
            // Tratamento específico para o erro de usuário não encontrado
            if (error.message === "Usuário não encontrado.") {
                return res.status(404).json({ mensagem: error.message });
            }
    
            // Tratamento para outros erros
            console.error("Erro ao editar usuário:", error);
            res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    },
    
    async listarUsuarios(req, res) {
        try {
            const usuarios = await usuarioServices.listarUsuarios()

             if (usuarios.length === 0) {
                return res.status(404).json({ mensagem: "Nenhum usuário encontrado." });
            }

            res.json(usuarios)
        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },
    
    async listarUsuarioPorId(req, res) {
        try {
            const {id} = req.params

            const usuario = await usuarioServices.listarUsuarioPorId(id)
            res.json(usuario)

        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async listarUsuarioPorEmail(req, res) {
        try {
            const {email} = req.params

            const usuario = await usuarioServices.listarUsuarioPorEmail(email)
            res.json(usuario)

        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async listarUsuariosPorTipo(req, res) {
        try {
            const {tipo} = req.body

            const usuario = await usuarioServices.listarUsuariosPorTipo(tipo)
            res.json(usuario)

        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    }
}
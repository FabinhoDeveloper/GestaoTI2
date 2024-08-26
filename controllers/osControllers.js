const osService = require("../services/osService")


module.exports = {
    async cadastrarOs (req, res) {
        const {descricao, id, tecnicoId} = req.body
        
        try {
            if (!descricao) {
                return res.status(400).json({ mensagem: "A descrição é obrigatória!" });
            }
    
            // Verificar se o idUsuario está presente na sessão
            if (!id) {
                return res.status(400).json({ mensagem: "Usuário não autenticado!" });
            }

            const osCriada = await osService.cadastrarOS({
                descricao, 
                id,
                tecnicoId
            })
            
            res.status(201).json({
                mensagem: "OS cadastrada com sucesso!",
                OS: osCriada
            })

        } catch (error) {
            console.error("Erro ao cadastrar OS: ", error.message)
            res.status(500).json({mensagem: error.message})            
        }
    },

    async listarOs(req, res) {
        try {
            const listaOs = await osService.listarOs()

            if (listaOs.length === 0) {
                return res.status(404).json({ mensagem: "Nenhuma OS encontrada." });
            }

            res.json(listaOs)

        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async listarOsPorUsuario(req, res) {
        const {id} = req.params
        
        try {            
            const listaOs = await osService.obterOsPorUsuario({id})

            if (listaOs.length === 0) {
                return res.status(404).json({mensagem: "Nenhuma OS cadastrada por este usuário."})
            }

            res.json(listaOs)

        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async listarOsPorAtribuicao(req, res) {
        const {id} = req.params

        try {
            const listaOs = await osService.obterOsPorAtribuicao({id})

            if (listaOs.length === 0) {
                return res.status(404).json({mensagem: "Nenhuma OS atribuída por este usuário."})
            }
            
            res.json(listaOs)

        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async concluirOs(req, res) {
        const {id} = req.body

        try {
            const osConcluida = await osService.concluirOs(id)

            if (!osConcluida) {
                return res.status(404).json({mensagem: "Nenhuma OS encontrada com esse ID!"})
            }

            res.json({
                mensagem: "OS concluída com sucesso!",
                os: osConcluida
            })
        } catch (error) {
            
        }
    }
}
 
const osService = require("../services/osService")


module.exports = {
    async cadastrarOs (req, res) {
        const {descricao, id} = req.body
        
        console.log([descricao, id])

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
                id
            })
            
            res.status(201).json({
                mensagem: "OS cadastrada com sucesso!",
                OS: osCriada
            })

        } catch (error) {
            console.error("Erro ao cadastrar OS: ", error.message)
            res.status(500).json({mensagem: error.message})            
        }
    }
}
 
 
 /**
                descricao: vem do formulario
                status: PENDENTE
                data_de_criacao: DATA DE HOJE
                data_fechamento: NULL
                usuario_id: SESSION
                tecnico_id: NULL
             */


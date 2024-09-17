const osService = require("../services/osService")


module.exports = {
    async cadastrarOs (req, res) {
        const {descricao, local_os, id, tecnicoId, prioridade} = req.body
        
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
                tecnicoId,
                local_os,
                prioridade
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
            const listaOs = await osService.listarOs();
    
            if (listaOs.length === 0) {
                return res.status(404).json({ mensagem: "Nenhuma OS encontrada." });
            }
    
            res.json(listaOs);
    
        } catch (error) {
            console.error("Erro ao listar OS:", error.message);
            res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    },
    
    async listarOsPorId(req, res) {
        const {id} = req.params

        try {
            const os = await osService.obterOsPorId({id})

            if (!os) {
                return res.status(404).json({mensagem: "Nenhuma OS encontrada com esse ID!"})
            }

            res.json(os)
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
        const {id} = req.params
        const {observacao} = req.body

        try {
            const osConcluida = await osService.concluirOs({id, observacao})

            if (!osConcluida) {
                return res.status(404).json({mensagem: "Nenhuma OS encontrada com esse ID!"})
            }

            res.json({
                mensagem: "OS concluída com sucesso!",
                os: osConcluida
            })
        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async reabrirOs(req, res) {
        const {id} = req.params

        try {
            const osReaberta = await osService.reabrirOs({id})

            if (!osReaberta) {
                return res.status(404).json({mensagem: "Nenhuma OS encontrada com esse ID!"})
            }

            res.json({
                mensagem: "OS re-aberta com sucesso!",
                os: osReaberta
            })
        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async editarOs(req, res) {
        const { id } = req.params;
        const {descricao, tecnicoId, prioridade, local_os} = req.body

        try {
            if (!id) {
                return res.status(404).json({mensagem: "Nenhuma OS encontrada com esse ID!"})
            }
            // Chama a função do serviço
            const resultado = await osService.editarOs({
                id,
                descricao,
                tecnicoId,
                prioridade,
                local_os
            });
    
            // Retorna a resposta com o status 200
            res.status(200).json(resultado);
    
        } catch (error) {
            // Tratamento específico para o erro de usuário não encontrado
            if (error.message === "OS não encontrada.") {
                return res.status(404).json({ mensagem: error.message });
            }
    
            // Tratamento para outros erros
            console.error("Erro ao editar OS:", error);
            res.status(500).json({ mensagem: "Erro interno do servidor." });
        }
    },

    async cancelarOs(req, res) {
        const {id} = req.params

        try {
            const osCancelada = await osService.cancelarOs({id})

            if (!osCancelada) {
                return res.status(404).json({mensagem: "Nenhuma OS encontrada com esse ID!"})
            }

            res.json({
                mensagem: "OS cancelada com sucesso!",
                os: osCancelada
            })
        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    },

    async atribuirOs(req, res) {
        const {idOs} = req.params
        const {idUsuario} = req.body

        try {
            if (!idOs || !idUsuario) {
                return res.status(404).json({mensagem: "O Id da OS e do usuário são OBRIGATÓRIOS!"})
            }

            const os = osService.atribuirOs({idOs, idUsuario})

            res.json({
                mensagem: "OS atribuída com sucesso!",
            })
        } catch (error) {
            res.status(500).json({mensagem: error.message})
        }
    }
}
 
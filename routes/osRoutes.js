const express = require("express")
const router = express.Router()
const osControllers = require("../controllers/osControllers")

router.get("/listar", osControllers.listarOs)

router.get("/listar-por-usuario/:id", osControllers.listarOsPorUsuario)

router.get("/listar/:id", osControllers.listarOsPorId)

router.get("/atribuicao/:id", osControllers.listarOsPorAtribuicao)

router.post("/cadastrar", osControllers.cadastrarOs)

router.post("/concluir/:id", osControllers.concluirOs)

router.post("/cancelar/:id", osControllers.cancelarOs)

router.post("/atribuir/:idOs", osControllers.atribuirOs)

router.put("/editar/:id", osControllers.editarOs)

module.exports = router
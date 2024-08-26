const express = require("express")
const router = express.Router()
const osControllers = require("../controllers/osControllers")

router.get("/listar", osControllers.listarOs)

router.get("/listar/:id", osControllers.listarOsPorUsuario)

router.get("/atribuicao/:id", osControllers.listarOsPorAtribuicao)

router.post("/cadastrar", osControllers.cadastrarOs)

router.delete("/concluir", osControllers.concluirOs)

module.exports = router
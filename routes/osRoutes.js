const express = require("express")
const router = express.Router()
const osControllers = require("../controllers/osControllers")

router.get("/listar", osControllers.listarOs)

router.get("/listar/:id", osControllers.listarOsPorId)

router.post("/cadastrar", osControllers.cadastrarOs)

module.exports = router
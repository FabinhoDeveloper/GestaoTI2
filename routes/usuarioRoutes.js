const express = require("express")
const router = express.Router()
const usuarioControllers = require("../controllers/usuarioControllers")

router.get("/listar", usuarioControllers.listarUsuarios)

router.get("/listar/:id", usuarioControllers.listarUsuarioPorId)

router.post("/listar-tipo", usuarioControllers.listarUsuariosPorTipo)

router.post("/cadastrar/", usuarioControllers.cadastrarUsuario)

router.delete("/deletar/:id", usuarioControllers.deletarUsuario)

module.exports = router
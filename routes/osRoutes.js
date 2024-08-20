const express = require("express")
const router = express.Router()
const osControllers = require("../controllers/osControllers")

router.post("/cadastrar", osControllers.cadastrarOs)

module.exports = router
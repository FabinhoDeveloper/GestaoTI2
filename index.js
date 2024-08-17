require('dotenv').config();
const sync = require("./config/db_sync")

const express = require("express");
const app = express();
sync();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({message: "Bem vindo ao sistema Gestão TI!"})
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
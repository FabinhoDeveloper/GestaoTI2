require('dotenv').config();
const sync = require("./config/db_sync")

const express = require("express");
const app = express();

const usuarioRoutes = require("./routes/usuarioRoutes")
const osRoutes = require("./routes/osRoutes")


const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Bem vindo ao sistema Gestão TI!"})
})

app.use("/usuario", usuarioRoutes)


sync().then(() => {
    app.listen(PORT, () => {
      console.log("Servidor rodando na porta", PORT);
    });
})
require('dotenv').config();
const sync = require("./config/db_sync")
const session = require('express-session');
const cors = require('cors');

const express = require("express");
const app = express();

const usuarioRoutes = require("./routes/usuarioRoutes")
const osRoutes = require("./routes/osRoutes")

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

app.get("/", (req, res) => {
    res.json({message: "Bem vindo ao sistema Gestão TI!"})
})

app.use("/usuario", usuarioRoutes)
app.use("/os", osRoutes)

sync().then(() => {
    app.listen(PORT, () => {
      console.log("Servidor rodando na porta", PORT);
    });
})
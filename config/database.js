const {Sequelize} = require("sequelize")

const db_name = process.env.DB_NAME || "gestaoti";
const db_user = process.env.DB_USER || "root";
const db_password = process.env.DB_PASS || "Cjte2023";
const host = process.env.DB_HOST || "localhost";


const sequelize = new Sequelize(db_name, db_user, db_password, {
    host: host,
    dialect: "mysql"
})

module.exports = sequelize;
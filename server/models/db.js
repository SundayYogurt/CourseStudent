const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.DBPORT,
        dialect: dbConfig.DIALECT,
        logging: false,
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection Successfully")
    } catch {
        console.log("Unable to connect to the database:", error)
    }
};

testConnection();

module.exports = sequelize
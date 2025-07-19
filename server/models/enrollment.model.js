const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Enrollment = sequelize.define("enrollment",{
    enrollmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    enrollmentDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    grade:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

Enrollment.sync({force: true}).then(()=>{
    console.log("Table created or already exists")
}).catch((error)=>{
    console.log("Error creating table", error)
})

module.exports = Enrollment
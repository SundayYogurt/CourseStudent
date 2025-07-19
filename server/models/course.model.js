const {DataTypes} = require("sequelize");
const sequelize = require("./db");

const Course = sequelize.define("course",{
    courseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    credits:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    semester:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

Course.sync({force: true}).then(()=>{
    console.log("Table created or already exists")
}).catch((error)=>{
    console.log("Error creating table", error)
})

module.exports = Course
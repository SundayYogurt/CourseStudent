const {DataTypes} = require("sequelize")
const sequelize = require("./db")
const Student = sequelize.define("student",{
    studentID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate:{
        type: DataTypes.DATE,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    nationality:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    yearOfStudy:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})

Student.sync({force: false}).then(()=>{
    console.log("Table created or already exists")
}).catch((error)=>{
    console.log("Error creating table", error)
})

module.exports = Student
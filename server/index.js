const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
dotenv.config()
const PORT = process.env.PORT || 3000
const studentRouter = require("./routers/student.router")
app.use(cors({
    origin:["http://localhost:5173","127.0.0.1:5173"],
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/v1/student' ,studentRouter)
app.get('/', (req,res)=>{
    res.send('RESTFUL API')
})

app.listen(PORT,()=> {
    console.log("Listening to http://localhost:" + PORT)
})

const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
const helmet = require("helmet")

dotenv.config()
const PORT = process.env.PORT || 3000
const studentRouter = require("./routers/student.router")
const courseRouter = require("./routers/course.router")

app.use(cors({
    origin:["http://localhost:5173","127.0.0.1:5173"],
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted.cdn.com"],
      styleSrc: ["'self'", "https://trusted.cdn.com"],
      imgSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"]
    }
  }
}));
app.use('/api/v1/student' ,studentRouter)
app.use('/api/v1/course',courseRouter)

app.get('/', (req,res)=>{
    res.send('RESTFUL API')
})


app.listen(PORT,()=> {
    console.log("Listening to http://localhost:" + PORT)
})

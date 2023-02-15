const express=require("express")
const connection=require("./db")
const {userRouter} =require("./Routes/User.routes")
const {authenticate} =require("./Middleware/authenticate.middleware")
const { NoteRouter } = require("./Routes/Note.route")

require("dotenv").config()


const app=express()

app.use(express.json())

app.use("/user",userRouter)

app.use("/notes",authenticate,NoteRouter)


app.get("/",(res,req)=>{
    res.send("Home Page")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Server is runing at port 8090")
})